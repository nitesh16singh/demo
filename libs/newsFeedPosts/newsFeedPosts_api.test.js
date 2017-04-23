 import newsFeed from './newsFeedPosts_db';
 import utils from '../utils';
 const newsfeed_api = {
     createNewNews: (news, done) => {
         try {
             news.updatedAt = Date();
             let newNeewsFeed = new newsFeed(news);
             newNeewsFeed.save(news, (err, result) => {
                 if (err) {
                     return done(err, null);
                 } else {
                     return done(null, result);
                 }
             })
         } catch (e) {
             console.log("error in news Creation", e);
             return done(e, null)
         }
     },
     updatePost: (userId, oprations, done) => {
         try {
             let action = oprations.action;
             let postId = oprations.postId;
             newsFeed.findOne({ '_id': postId }, (error, post) => {
                 if (error) {
                     return done(error, null);
                 } else if (post) {
                     let fieldToUpdate = '';
                     let oprationsArray;
                     // action is like then 
                     let update = {};
                    if (action == 'like') {
                        fieldToUpdate = 'likedBy'
                        let index = post.likedBy && post.likedBy.indexOf(userId);
                         if (index > -1) {
                             post.likedBy.splice(index, 1)
                             oprationsArray = post.likedBy;
                         } else {
                             post.likedBy.push(userId)
                             oprationsArray = post.likedBy;
                             utils.addNotification("like",);
                         }
                         
                     } else if (action == 'dislike') {
                         fieldToUpdate = 'dislikedBy';
                         let index = post.dislikedBy && post.dislikedBy.indexOf(userId);
                         if (index > -1) {
                             post.dislikedBy.splice(index, 1)
                             oprationsArray = post.dislikedBy;
                         } else {
                             post.dislikedBy.push(userId)
                             oprationsArray = post.dislikedBy;
                             utils.addNotification(post,{"like":true});
                         }
                         
                    } else if (action == 'peace') {
                         fieldToUpdate = 'peaceBy';
                         let index = post.peaceBy.indexOf(userId);
                         if (index > -1) {
                             post.peaceBy.splice(index, 1);
                             oprationsArray = post.peaceBy;

                         } else {
                             post.peaceBy.push(userId);
                             oprationsArray = post.peaceBy;
                             utils.addNotification("like");
                         }   
                    } else if (action == 'removed') {
                         fieldToUpdate = 'removed';
                         oprationsArray = post.removed ? false : true;
                    } else if (action == 'hidden') {
                         fieldToUpdate = 'hidden';
                         oprationsArray = post.hidden ? false : true;          
                    }
                     if(oprations.content) {
                     	update["content"] = oprations.content;
                     }
                     update[fieldToUpdate] = oprationsArray;
                     newsFeed.findOneAndUpdate({ '_id': postId }, { $set: update, "updatedAt": Date() }, { new: true }, (err, result) => {
                         if (err) {
                             return done(err, null);
                         } else {
                             return done(null, result);
                         }
                     });
                 } else {
                     done({ "message": "Post not found" }, null)
                 }
             });
         } catch (e) {
             console.log("error in news Creation", e);
         }
     },
 }

 export default newsfeed_api;
