import User from './user_db';
import { UpdateUserProfile } from './user_db';
import _ from 'underscore';
const User_api = {
    createNewUser: (user, done) => {
        try {
            let newUser = new User(user);
            newUser.password = newUser.generateHash(user.password);
            newUser.save(newUser, (err, result) => {
                if (err) {
                    return done(err, null);
                } else {
                    return done(null, result);
                }
            })
        } catch (e) {
            console.log("error in create User");
        }
    },
    findUser: (filter, fields, options, done) => {
        try {
            filter = filter || {};
            fields = fields || {};
            options = options || {};
            User.findOne(filter, fields, options, (err, result) => {
                if (err) {
                    return done(err, null);
                } else {
                    return done(null, result);
                }

            })
        } catch (e) {
            console.log("error in find User", e);
        }
    },
    deactivatedUsersList: (filter, fields, options, done) => {
        filter = filter || {};
        fields = fields || {};
        options = options || {};
        User.find(filter, fields, options, (error, data) => {
            console.log("checking data", data);
            if (error) {
                done(error, null)
            } else {
                done(null, data);
            }

        })
    },
    updateUser: (filter, fields, options, done) => {
        filter = filter || {};
        fields = fields || {};
        options = options || {};
        options['new'] =  true;
        User.findOneAndUpdate(filter,fields,options, (err, result) => {
            if (err) return done(err, null);
            return done(null, result);
        })

    },
    findOrCreate: (query, newFields, done) => {
        try {
            User.findOne(query, (err, user) => {
                if (err) {
                    return done(err);
                }
                //No user was found... so create a new user with values from Facebook (all the profile. stuff)
                if (!user) {
                    const newUser = {};
                    for (const item in newFields) {
                        newUser[item] = newFields[item];
                    }
                    user = new User(newUser);
                    console.log(user);
                    user.save(err => {
                        if (err) console.log("error", err);
                        return done(err, user);
                    });
                } else {
                    //found user. Return
                    return done(err, user);
                }
            });
        } catch (err) {
            throw new Error("Error in findOrCreate function.", e);
        }
    },
    findById: (id, done) => {
        try {
            User.findOne({ '_id': id }, (err, result) => {
                if (err) {
                    return done(err, null);
                } else {
                    return done(null, result);
                }

            })
        } catch (e) {
            console.log("error in findById ", e);
        }
    },
    updateProfile: (id, data, cb) => {
        try {
            User.findOne({ '_id': id }, (err, userDetail) => {
                for (var key in UpdateUserProfile) {
                    if (data[key]) {
                        userDetail.profile[key] = data[key];
                    }
                }
                User.findOneAndUpdate({ '_id': id }, { $set: { profile: userDetail.profile } }, { new: true }, (err, result) => {
                    if (err) return cb(err, null);
                    return cb(null, result.profile);
                })
            })
        } catch (e) {
            console.log("error is id ", e);
        }
    },
    AddHidePost: (id, postId, cb) => {
        try {
            User.findOneAndUpdate({ '_id': id }, { $addToSet: { "profile.hiddenPosts": postId } }, { new: true }, (err, result) => {
                if (err) return cb(err, null);
                return cb(null, result.profile);
            });
        } catch (e) {
            console.log("error is id ", e);
        }
    },
    // type  = like , unlike 
    // targetUserIds  post owner for messing 
    //  actionItemId postId Or Comment Id 
    // userDetail current user details 
    newNotification: (type, targetUserIds, actionItemId, userDetail, handle, reminderTime) => {
        let userNotificationIds = '';
        if (type === 'newsFeedReminder') {
            userNotificationIds = targetUserIds;
        } else {
            userNotificationIds = targetUserIds
                //_.without(targetUserIds, userDetail.id);
        }
        let date = Date.now();
        //Get name of actionItem.
        let actionItemName;
        if (type === 'connectionRequest' || type === 'connectionConfirm' || type === 'favoriteUser') {
            actionItemName = User.findOne({ _id: actionItemId }).profile.fullName
        } else if (type === 'workspacePost') {
            actionItemName = Workspaces.findOne({ _id: actionItemId }).name
        } else {
            actionItemName = userDetail.profile.fullName;
        }
        console.log("testing ", userNotificationIds)
        let notificationTypes = {
                connectionRequest: {
                    type: type,
                    direct: true,
                    icon: '',
                    actionItemId: userDetail._id,
                    text: actionItemName + ' would like to connect.',
                    link: '/' + handle,
                    read: false,
                    sourceUser: userDetail._id,
                    createdAt: date,
                },
                connectionConfirm: {
                    type: type,
                    direct: true,
                    icon: '',
                    actionItemId: userDetail._id,
                    text: actionItemName + ' accepted your request to connect.',
                    link: '/' + handle,
                    read: false,
                    sourceUser: userDetail._id,
                    createdAt: date,
                },
                favoriteUser: {
                    type: type,
                    direct: true,
                    icon: '',
                    actionItemId: userDetail._id,
                    text: actionItemName + ' followed you.',
                    link: '/' + handle,
                    read: false,
                    sourceUser: userDetail._id,
                    createdAt: date,
                },
                workspacePost: {
                    type: type,
                    direct: false,
                    icon: 'ion-ios-albums-outline',
                    actionItemId: actionItemId,
                    text: 'New posts in ' + actionItemName + '.',
                    link: '/workspace/' + actionItemId,
                    read: false,
                    sourceUser: '',
                    createdAt: date,
                },
                newsMention: {
                    type: type,
                    direct: true,
                    icon: '',
                    actionItemId: actionItemId,
                    text: userDetail.profile.fullName + ' mentioned you in a post.',
                    link: '/post/' + actionItemId,
                    read: false,
                    sourceUser: userDetail._id,
                    createdAt: date
                },
                workspaceMention: {
                    type: type,
                    direct: true,
                    icon: '',
                    actionItemId: actionItemId,
                    text: '',
                    link: '/workspace/' + actionItemId,
                    read: false,
                    sourceUser: userDetail._id,
                    createdAt: date
                },
                newsFeedReminder: {
                    type: type,
                    direct: false,
                    icon: 'ion-ios-clock-outline',
                    actionItemId: actionItemId,
                    text: 'News feed post reminder',
                    link: '/post/' + actionItemId,
                    read: false,
                    sourceUser: userDetail._id,
                    createdAt: date + reminderTime
                },
                newsFeedComment: {
                    type: type,
                    direct: false,
                    icon: 'ion-ios-chatbubble-outline',
                    actionItemId: actionItemId,
                    text: userDetail.profile.fullName + ' commented on your post.',
                    link: '/post/' + actionItemId,
                    read: false,
                    sourceUser: userDetail._id,
                    createdAt: date
                },
                like: {
                    type: type,
                    direct: false,
                    icon: 'ion-thumbsup',
                    actionItemId: userDetail._id,
                    text: userDetail.profile.fullName + ' liked your post.',
                    link: '/post/' + actionItemId,
                    read: false,
                    sourceUser: userDetail._id,
                    createdAt: date
                },
                likeComment: {
                    type: type,
                    // direct: false,
                    icon: 'ion-thumbsup',
                    actionItemId: actionItemId,
                    text: userDetail.profile.fullName + ' liked your Comment.',
                    link: '/post/' + actionItemId,
                    read: false,
                    sourceUser: userDetail._id,
                    createdAt: date
                },
                sentReferral: {
                    type: type,
                    direct: false,
                    icon: 'ion-ios-pulse',
                    actionItemId: actionItemId,
                    text: userDetail.profile.fullName + ' sent lead to you.',
                    link: '/referrals',
                    read: false,
                    sourceUser: userDetail._id,
                    createdAt: date
                },
                newMessage: {
                    type: type,
                    direct: false,
                    icon: 'ion-chatbubbles',
                    actionItemId: actionItemId,
                    text: userDetail.profile.fullName + ' sent you a message.',
                    link: '/message/' + actionItemId,
                    read: false,
                    sourceUser: userDetail._id,
                    createdAt: date
                },
                messageComment: {
                    type: type,
                    direct: false,
                    icon: 'ion-ios-chatbubble-outline',
                    actionItemId: actionItemId,
                    text: userDetail.profile.fullName + ' replied on your message.',
                    link: '/message/' + actionItemId,
                    read: false,
                    sourceUser: userDetail._id,
                    createdAt: date
                },
                dislikePost: {
                    type: type,
                    // direct: false,
                    icon: 'ion-thumbsdown',
                    actionItemId: actionItemId,
                    text: userDetail.profile.fullName + ' disliked your post.',
                    link: '/post/' + actionItemId,
                    read: false,
                    sourceUser: userDetail._id,
                    createdAt: date
                },
                dislikeComment: {
                    type: type,
                    // direct: false,
                    icon: 'on-thumbsdown',
                    actionItemId: actionItemId,
                    text: userDetail.profile.fullName + ' disliked your comment.',
                    link: '/post/' + actionItemId,
                    read: false,
                    sourceUser: userDetail._id,
                    createdAt: date
                },
                peacePost: {
                    type: type,
                    // direct: false,
                    icon: false,
                    actionItemId: actionItemId,
                    text: userDetail.profile.fullName + ' reacted to your post.',
                    link: '/post/' + actionItemId,
                    read: false,
                    sourceUser: userDetail._id,
                    createdAt: date
                },
                peaceComment: {
                    type: type,
                    // direct: false,
                    icon: false,
                    actionItemId: actionItemId,
                    text: userDetail.profile.fullName + ' reacted to your comment.',
                    link: '/post/' + actionItemId,
                    read: false,
                    sourceUser: userDetail._id,
                    createdAt: date
                }
            }
            // Notification types
            // If notification exists update notification

        console.log(userNotificationIds, notificationTypes[type])
        User.update({ '_id': { $in: userNotificationIds }, 'notifications': { $elemMatch: { 'actionItemId': actionItemId } } }, { $set: { 'notifications.$.createdAt': date, 'notifications.$.read': false } }, { multi: true }).exec();
        User.update({ '_id': { $in: userNotificationIds } }, { $addToSet: { 'notifications': notificationTypes[type] } }, { multi: true }).exec();
        // Add Notification to target users document

        // PUSH THAT NOTIFICATION
        userNotificationIds.forEach((userId, index, array) => {
            var user = User.findOne({ '_id': userId });
            var unreadNotifications = _.where(user.notifications, { read: false });
            var badge = unreadNotifications.length;
            console.log(badge);
            //   Push.send({
            //     from: 'push',
            //     title: notificationTypes[type].text,
            //     text: notificationTypes[type].text,
            //     badge: badge,
            //     sound: 'airhorn.caf',
            //     payload: {
            //       title: notificationTypes[type].text
            //     },
            //     query: {
            //       userId: userId //this will send to a specific Meteor.user()._id
            //     }
            //   });
        });

    },
    clearNotifications: (userId, done) => {
        User.update({ _id: userId }, { $set: { 'notifications': [] } }, (error, data) => {
            if (error) {
                done(error, null);
            } else {
                done(null, data);
            }
        });
    },
    markNotificationsRead: (userId, done) => {
        try {
            console.log("userId", userId);
            User.findOne({ '_id': userId }, (err, result) => {
                if (err) {
                    return done(err, null);
                } else {
                    for (let i = 0; i < result.notifications.length; i++) {
                        result.notifications[i].read = true;
                    }
                    User.update({ _id: userId }, { $set: { 'notifications': result.notifications } }, (error, data) => {
                        if (error) {
                            done(error, null);
                        } else {
                            done(null, data);
                        }
                    });
                }

            })
        } catch (e) {
            console.log("error in findById ", e);
        }
    }

}

export default User_api;
