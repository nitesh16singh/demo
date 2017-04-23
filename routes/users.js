/* GET users listing. */
import express from 'express';
const router = express.Router();
import passport from 'passport';
import users_api from '../libs/users/users_api'
require("../auth");
/**
 * @api {post} /register  Register User
 * @apiName RegisterUser
 * @apiGroup User
 * @apiExample {json} Input Example:
 *     { email:'abc@gmail.com', password:1234,firstName :'abc', lastName:'xyz', fullName:'abc xyz'}

 * @apiParam {String} email     Mandatory Email.
 * @apiParam {String} password    Mandatory Password.
 * @apiParam {String} firstName  Mandatory firstName of the User.
 * @apiParam {String} lastName  Mandatory  lastName of the User.
 * @apiParam {String} fullName  Mandatory fullName.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {
     "__v": 0,
     "password": "$2a$08$JQUgETIQ..rkc7tY7lW0h.tIiCFA6b6ptwledbz5JKKjzBZgN2.0i",
     "_id": "585787a96bda3734701c9b9a",
     "status": {
         "idle": false,
         "online": true
     },
     "profile": {
         "firstName": "Nitesh",
         "lastName": "Singh",
         "fullName": "Nitesh Kumar Singh",
         "hiddenPosts": [],
         "subscription": null,
         "twitterProfileUrl": "",
         "facebookProfileUrl": "",
         "linkedInProfileUrl": "",
         "profileImage": "https://smf.imgix.net/profilePhotos/defaultUser.png",
         "webAddress": "",
         "state": "",
         "city": "",
         "streetAddress": "",
         "title": "",
         "company": ""
     },
     "settings": {
         "deactivated": false,
         "profilePrivate": false,
         "addressPublic": true,
         "emailPublic": true,
         "phonePublic": true
     },
     "pinned": [],
     "notifications": [],
     "workspaces": [],
     "connections": {
         "following": [],
         "blocked": [],
         "connected": [],
     },
     "metadata": {
         "smsVerified": ""
     },
     "secure": {
         "passwordResetToken": "",
         "numberVerify": "",
         "smsCode": ""
     },
     "emails": [{
         "address": "nitesh16.singh@gmail.com",
         "_id": "585787a96bda3734701c9b9b",
         "verified": false
     }],
     "createdAt": "2016-12-19T07:06:49.798Z"
 }
 * 
 *
 * @apiErrorExample {json} Email already exist :
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Email already exist"
 *     }
 * @apiErrorExample {json} Field Missing.
 *  HTTP/1.1 404 Not Found
 * {
     * "success": false,
     *  "message": {
     *   "errors": {
     *    "profile.firstName": "Path `profile.firstName` is required.",
     *      "profile.lastName": "Path `profile.lastName` is required.",
     *      "profile.fullName": "Path `profile.fullName` is required."
     *    }
     * }
 * }
 */

router.post('/register',(req, res, next) => {
     if(req.body.email && req.body.password ) { 
        passport.authenticate('local-signup',(error,data) => {
            if(error) {
                return res.status(400).send(error);
            } else {
                return res.status(200).send(data);
            }
        })(req, res, next);
    } else {
        return res.status(400).send({ "message": "Email or password is Missing ." });
    }
});

/**
* @api {post} /login Login User
* @apiName LoginUser
* @apiGroup User
*
* @apiExample {json} Input Example:
*     { email:'abc@gmail.com', password:1234}
* @apiParam {String} email   Mandatory email.
* @apiParam {String} password  Mandatory Password.
*
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*    
*{
*    "_id": "58511840f0e1e04052d2aa30",
*    "password": "$2a$08$3qo7oZRjb6.bYWQYnxOA.OWmjNiv7bhI4R4K2zzEepuqeu3fQFmRq",
*    "__v": 0,
*    "status": {
*        "idle": false,
*        "online": true
*    },
*    "profile": {
*        "firstName": "Nitesh",
*        "lastName": "Singh",
*        "fullName": "Nitesh Singh",
*        "subscription": null,
*        "twitterProfileUrl": "",
*        "facebookProfileUrl": "",
*        "linkedInProfileUrl": "",
*        "profileImage": "https://smf.imgix.net/profilePhotos/defaultUser.png",
*        "webAddress": "",
*        "state": "",
*        "city": "",
*        "streetAddress": "",
*        "title": "",
*        "company": ""
*    },
*    "settings": {
*        "deactivated": false,
*        "profilePrivate": false,
*        "addressPublic": true,
*        "emailPublic": true,
*        "phonePublic": true
*    },
*    "pinned": [],
*    "notifications": [],
*    "workspaces": [],
*    "connections": {
*        "following": [],
*        "blocked": [],
*        "connected": [],
*    },
*    "metadata": {
*        "smsVerified": ""
*    },
*    "secure": {
*        "passwordResetToken": "",
*        "numberVerify": "",
*        "smsCode": ""
*    },
*    "createdAt": "1481709602619",
*    "emails": [{
*        "address": "nitesh@test.com",
*        "_id": "58511840f0e1e04052d2aa31",
*        "verified": false
*    }],
*}
*
* @apiErrorExample {json} Email or Password is Missing:
*     HTTP/1.1 400 Not Found
*     {
*        "message": "Email or Password is Missing "
*     }
*
* @apiErrorExample {json}  Email is Not Register:
*     HTTP/1.1 400 Not Found
*     {
*        "message": "Email is not Registered."
*     }
* @apiErrorExample {json}  Password Not Matched :
*     HTTP/1.1 400 Not Found
*     {
*        "message": "Password Not Matched."
*     }
*
*/

router.post('/login', (req, res, next) => {
    if(req.body.email && req.body.password){
        passport.authenticate('local-login',(error,user) => {
            if(error) {
                return res.status(400).send(error);
            } else {
                req.logIn(user, function(err) {
                    if (err) { return next(err); }
                        return;
                });
                return res.status(200).send(user);
            }
        })(req, res, next);
    } else {
        return res.status(400).send({"message": "Email or Password is Missing  "});
    }
});


/**
* @api {get} /logout Logout Current user
* @apiName LogoutUser
* @apiGroup User
*
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*    
*    {
*       message :'User logout successfully'
*    }
*
* @apiErrorExample {json} Error-Response:
*     HTTP/1.1 400 Not Found
*     {
*       message :'User not login'
*     }
*
*/

router.get('/logout', (req, res, next) => {
    if(req.user){
        req.logout();
        return res.status(200).send({message :'User logout successfully'})  
     } else {
        return res.status(400).send({message :'User not login'});   
    }
});



/**
* @api {get} /whoAmI Get Logged in User Details
* @apiName loggedInUserDetails
* @apiGroup User
*
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*    
*   {
    "_id" : "bfyd3ozzMkBMaYi2j",
    "createdAt" : ISODate("2016-12-13T08:51:54.865Z"),
    "services" : {
        "password" : {
            "bcrypt" : "$2a$10$goCwJEBWWz.WGtXwq2pJcOZA0a.Bj0zpV3QzlYmT2annfHRln1KS."
        },
        "resume" : {
            "loginTokens" : [
                {
                    "when" : ISODate("2016-12-13T08:51:55.071Z"),
                    "hashedToken" : "qa7ypOUFHkH8iB5qzbwuLb+S5tQEqsc79VP/bqv/2jU="
                }
            ]
        }
    },
    "emails" : [
        {
            "address" : "nitesh16.singh@gmail.com",
            "verified" : false
        }
    ],
    "secure" : {
        "smsCode" : "",
        "numberVerify" : "",
        "passwordResetToken" : "",
        "activationToken" : "057b4802e89d21e54712"
    },
    "metadata" : {
        "smsVerified" : "",
        "isActivated" : true
    },
    "connections" : {
        "connected" : [ ],
        "blocked" : [ ],
        "following" : [ ]
    },
    "workspaces" : [ ],
    "notifications" : [ ],
    "pinned" : [ ],
    "settings" : {
        "phonePublic" : true,
        "emailPublic" : true,
        "addressPublic" : true,
        "profilePrivate" : false,
        "deactivated" : false
    },
    "profile" : {
        "firstName" : "Nitesh",
        "lastName" : "Singh",
        "fullName" : "Nitesh Singh",
        "company" : "",
        "searchEmail" : "nitesh16.singhemailAtgmail.com",
        "title" : "",
        "phoneNumber" : "",
        "streetAddress" : "",
        "city" : "",
        "state" : "",
        "zip" : "",
        "webAddress" : "",
        "profileImage" : "https://smf.imgix.net/profilePhotos/defaultUser.png",
        "linkedInProfileUrl" : "",
        "facebookProfileUrl" : "",
        "twitterProfileUrl" : "",
        "subscription" : null
    },
    "status" : {
        "online" : true,
        "lastLogin" : {
            "date" : ISODate("2016-12-13T08:51:56.741Z"),
            "ipAddr" : "127.0.0.1",
            "userAgent" : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.100 Safari/537.36"
        },
        "idle" : false
    }
*  }
*
* @apiErrorExample {json} Error-Response:
*     HTTP/1.1 400 Not Found
*     {
*       message :'User Not LoggedIn'
*     }
*/ 

router.get('/whoAmI', (req, res, next) => {
    if (req.user) {
        res.status(200).send(req.user);
    } else {
        res.status(400).send({"message": "User Not LogedIn"});
    }
});

/**
* @api {put} /updateProfile Update User Profile
* @apiName updateProfile
* @apiGroup User
* @apiExample {json} Input Example:
*    { phoneNumber: 12345,searchEmail: 'tets@1',firstName :'abc', lastName:'xyz', fullName:'abc xyz' , handle: 'akesh'}
* 
* @apiParam {String} firstName      Optional FirstName  of User
* @apiParam {String} lastName       Optional LastName of User
* @apiParam {String} fullName       Optional FullName of User
* @apiParam {String} company        Optional Company of User    
* @apiParam {String} searchEmail    Optional   
* @apiParam {String} title          Optional           
* @apiParam {Number} phoneNumber    Optional  Phone Number of User   
* @apiParam {String} streetAddress  Optional Street Address of User
* @apiParam {String} city           Optional City of User
* @apiParam {String} state          Optional State of User
* @apiParam {Number} zip            Optional Zip of User's Residential State
* @apiParam {String} webAddress     Optional WebAddress of User
* @apiParam {String} profileImage   Optional profile Image of User
* @apiParam {String} linkedInProfileUrl      Optional Link of User's LinkedIn Profile    
* @apiParam {String} facebookProfileUrl      Optional Link of User's Facebook Profile
* @apiParam {String} twitterProfileUrl       Optional Link of User's Twitter Profile

* @apiParam {String} subscription            Optional
* @apiParam {String} handle                  Optional Handle Name of the User
* @apiParam {Number} dob                     Optional Date of Birth of the User
* @apiParam {String} relationship            Optional Relationship of the User
* @apiParam {String} gender                  Optional Gender of the User
* @apiParam {String} intro                   Optional Introduction of the User
* @apiParam {Number} zipCode                 Optional Zip Code of User's State
* @apiParam {Array} hiddenPosts              Optional Posts Marked as Hidden by the User

* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*    
*   {
    "company": "",
    "title": "testing",
    "streetAddress": "",
    "city": "Hisar",
    "state": "Harayana",
    "webAddress": "testing",
    "profileImage": "https://smf.imgix.net/profilePhotos/defaultUser.png",
    "linkedInProfileUrl": "",
    "facebookProfileUrl": "",
    "twitterProfileUrl": "",
    "subscription": null,
    "hiddenPosts": [],
    "fullName": "Nitesh Kumar Singh",
    "lastName": "Singh",
    "firstName": "Nitesh",
    "searchEmail": "nitesh123@gmail.com",
    "phoneNumber": 8295507788,
    "zip": 125001
}
*
* @apiErrorExample {json} if user is not Error-Response:
*     HTTP/1.1 400 Not Found
*     {
        "message": "User not login"
      }
*
*/
router.put('/updateProfile', (req, res, next) => {
    if (req.user) {
        users_api.updateProfile(req.user.id,req.body,(error,updatedUser) => {
            if(error){
                res.status(400).send(error);
            } else {
                res.status(200).send(updatedUser)
            }
        })
    } else {
        res.send({"message": "User Not login"});
    }
});


/**
* @api {put} /clearNotifications Delete All Notifications
* @apiName clearNotifications
* @apiGroup User
* @apiDescription Whenever User click on Button (Clear Notifications) then delete all Notifications.   
*/
router.put('/clearNotifications', (req, res, next) => {
    if (req.isAuthenticated() && req.user) {
        users_api.clearNotifications(req.user.id,(error,data) => {
          if(error){
                res.status(400).send(error);
            } else {
                res.status(200).send(data);
            }  
        })
    } else {
         res.send({"message": "User Not login"});
    }
});

/**
* @api {put} /markNotificationsRead Mark All Notifications  to Read.
* @apiName markNotificationsRead
* @apiGroup User
* @apiDescription Whenever User click on Notifications icon Then mark all Notifications  as Read.   
*/
router.put('/markNotificationsRead', (req, res, next) => {
    if (req.isAuthenticated() && req.user) {
        users_api.markNotificationsRead(req.user.id,(error,data) => {
          if(error){
                res.status(400).send(error);
            } else {
                res.status(200).send(data);
            }  
        })
    } else {
         res.send({"message": "User Not login"});
    }
});

/**
* @api {put} /blockUser Block User
* @apiName BlockUser
* @apiGroup User
* * @apiExample {json} Input Example:
*     { blockUserId:'585b9f7ea003512e3b732716'}

*  @apiParam {String} blockUserId     Mandatory blockUserId
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*    
*   {
        "blockedUser": [
          "585b9f7ea003512e3b732716"
        ],
    }
* @apiErrorExample {json} User Not LogedIn:
*     HTTP/1.1 400 Not Found
*     {
*       message :'User not LogedIn'
*     }
* @apiErrorExample {json}  Id Is Missing :
*     HTTP/1.1 400 Not Found
*    { 
        "message": " Id Is Missing." 
    }


*
*/


router.put('/blockUser',(req,res) =>{
    if (req.isAuthenticated() && req.user) {
        if(req.body && req.body.blockUserId) {
            users_api.updateUser({ '_id': req.user.id },{ $addToSet: { 'connections.blocked': req.body.blockUserId } },(error,data) => {
              if(error){
                    res.status(400).send(error);
                } else {
                    res.status(200).send({'blockedUser' :  data.connections.blocked});
                }  
            })
        } else {
            return res.status(404).send({ "message": " Id Is Missing."});
        }
    } else {
         res.send({"message": "User Not login"});
    }
})

// /* GET home page. */
// router.get('/', (req, res, next) => {
//     if (req.isAuthenticated()) {
//         res.redirect('/app');
//     } else {
//         res.render('login', { user: req.user });
//     }
// });
export default router;
