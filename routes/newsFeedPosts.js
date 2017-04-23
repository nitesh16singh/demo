import express from 'express';
import newsFeedPosts from '../libs/newsFeedPosts/newsFeedPosts_api';
import users_api from '../libs/users/users_api'
const router = express.Router();
/**
 * @api {post} /newPost Create New Post 
 * @apiName newpost
 * @apiGroup posts
 * @apiExample {json} Input Example: 
 	   { content:'Hello world' : coordinates:[28,77] }

 * @apiParam {String} content    Mandatory .
 * @apiParam {Array}  coordinates  [0, 0]  Mandatory 

 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *  {
	    "__v": 0,
	    "content": "creating new Post",
	    "author": "5858dc09f11b07405396d58b",
	    "updatedAt": "2016-12-20T08:27:31.000Z",
	    "_id": "5858eb73e0a86c4b07ba220a",
	    "peaceBy": [],
	    "hidden": false,
	    "dislikedBy": [],
	    "likedBy": [],
	    "createdAt": "2016-12-20T08:27:11.583Z",
	    "location": {
	        "coordinates": [
	            28,
	            77
	        ],
	        "type": "Point"
	    }
	}
 * @apiErrorExample Error-Response  Content Missing 
 	
 	HTTP/1.1 400 Not Found
 		{	
 		"message": 
 		"Need Some important field to creating new Post"
 		}
 *
 * @apiErrorExample Error-Response:  If User Not logedIn 
 	HTTP/1.1 401 Not Found
 	{"message": "User Not logedIn"}
 *

 */
router.post('/newPost',(req,res,next)=> {
	if(req.user) {
		if(req.body && req.body.content) {
			req.body.author = req.user.id;
			newsFeedPosts.createNewNews(req.body,(error,post)=>{
				if(error){
					res.status(400).send(error);
				} else {
					res.status(201).send(post)
				}
			})
		} else {
			res.status(400).send({"message": "Need Some important field to creating new Post"});
		}
	} else {
		res.status(401).send({"message": "User Not logedIn"});
	}
})


/**
 * @api {put} /updatePost Update Post 
 * @apiName updatePost
 * @apiGroup posts
 ** @apiExample {json} Input Example: 
 	   { postId:'586338d40b7cf63146991405' , action:'like' , content: "Hello updating content " }
 
 * @apiParam {String} postId  Mandatory.
   @apiparam {String} action  Optional (like,dislike,peace) 
 * @apiparam {String} content Optional 
 
 * @apiDescription User can Like,Dislike and peace of Post.
 	User Can update the text or content of the post.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
     "_id": "586338d40b7cf63146991405",
     "content": "Hello world",
     "author": "5858dc09f11b07405396d58b",
     "updatedAt": "2016-12-28T04:21:13.000Z",
     "__v": 0,
     "peaceBy": [
         "5858dc09f11b07405396d58b"
     ],
     "hidden": false,
     "removed": false,
     "dislikedBy": [
         "5858dc09f11b07405396d58b"
     ],
     "likedBy": [
         "5858dc09f11b07405396d58b"
     ],
     "createdAt": "2016-12-28T04:00:18.555Z",
     "location": {
         "coordinates": [
             28,
             77
         ],
         "type": "Point"
     }
 }


 *
 * @apiErrorExample Error-Response  Content Missing 
 	
 	HTTP/1.1 400 Not Found
 	{"message": "Need Some important field to creating new Post"}.
 *
  * @apiErrorExample Error-Response:  If User Not logedIn 
 	HTTP/1.1 401 Not Found
 	{"message": "User Not logedIn"}
 *
 */

router.put('/updatePost',(req,res,next)=> {
	if(req.user) {
		if(req.body && req.body.postId) {
			newsFeedPosts.updatePost(req.user,req.user.id,req.body,(error,post) =>{
			if(error) {
					res.status(404).send(error);
				} else {
					res.status(200).send(post)
				}	
			})
		} else {
			res.status(400).send({"message":"Need Some important field to update new Post"});
		}
	} else {
		res.status(404).send({"message": "User Not logedIn"});
	}
})

/**
 * @api {put} /hidePost Hide Post 
 * @apiName hidePost
 * @apiGroup posts
 * @apiExample {json} Input Example: 
 	  { postId:'586338d40b7cf63146991405'}
 * @apiParam {String} postId  Mandatory.

 * @apiDescription User can Hide Other Members posts.
 	If Post is hidden then it will not on User screen or Wall. 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
      "company": "Daffodil software limited",
      "title": "",
      "streetAddress": "",
      "city": "",
      "state": "Harayana",
      "webAddress": "",
      "profileImage": "https://smf.imgix.net/profilePhotos/defaultUser.png",
      "linkedInProfileUrl": "",
      "facebookProfileUrl": "",
      "twitterProfileUrl": "",
      "subscription": null,
      "hiddenPosts": [
          "5858eb73e0a86c4b07ba220a",
          "5858eb73e0a86c4b07ba220a"
      ],

	"fullName": "Nitesh Singh",
	"lastName": "Singh",
	"firstName": "Nitesh",
	"zip": 123441
	}

 *
 * @apiErrorExample Error-Response  Content Missing 
 	
 	HTTP/1.1 400 Not Found
 	{"message":"Need PostId to Hide Post"}.
 *
  * @apiErrorExample Error-Response:  If User Not logedIn 
 	HTTP/1.1 401 Not Found
 	{"message": "User Not logedIn"}
 *
 */
router.put('/hidePost',(req,res,next) => {
	if(req.user) { 
		if(req.body && req.body.postId) {
			users_api.AddHidePost(req.user.id,req.body.postId,(error,userProfile) => {
				if(error) {
					res.status(404).send(error);
				} else {
					res.status(200).send(userProfile)
				}
			})
		} else {
			res.status(400).send({"message":"Need PostId to Hide Post"});	
		}
	} else {
		res.status(404).send({"message": "User Not logedIn"});
	}
})


/**
* @api {get} /allPosts Get All Post 
* @apiName allPost
* @apiGroup posts
* @apiExample {json} Input Example :
*		/allPosts?skip=0&limit=3&position=[28,73]
*
* @apiSuccessExample {json} Success-Response:
*    [
  {
    "_id": "586338d40b7cf63146991405",
    "content": "Hello world",
    "author": "5858dc09f11b07405396d58b",
    "updatedAt": "2016-12-28T04:21:13.000Z",
    "__v": 0,
    "peaceBy": [
        "5858dc09f11b07405396d58b"
    ],
    "hidden": false,
    "removed": false,
    "dislikedBy": [
        "5858dc09f11b07405396d58b"
    ],
    "likedBy": [
        "5858dc09f11b07405396d58b"
    ],
    "createdAt": "2016-12-28T04:00:18.555Z",
    "location": {
        "coordinates": [
            28,
            77
        ],
        "type": "Point"
    }
}

*
* @apiErrorExample {json} Error-Response:
*     HTTP/1.1 400 Not Found
*     {
*       message :'User Not LoggedIn'
*     }
*/ 

router.get('/allPosts',(req,res) => {
	if(req.user && req.isAuthenticated()){
		let user = req.user;
        let query = {removed: false};
        let filters = req.query;
        if(user && user.profile.hiddenPosts && user.profile.hiddenPosts.length) {
            query['_id'] = {$nin: user.profile.hiddenPosts};
        }
        //let deactivatedUsers = []
        users_api.deactivatedUsersList({'settings.deactivated': true}, {'_id': 1} ,{}, (error,deactivatedUsers) => {
        	deactivatedUsers = deactivatedUsers.map(function(user) {
            	return user._id;
        	});

	        if(user && user.connections && user.connections.blocked && user.connections.blocked.length) {
	            deactivatedUsers = deactivatedUsers.concat(user.connections.blocked);
	        }
	        if(deactivatedUsers && deactivatedUsers.length) {
	            query['author'] = {$nin: deactivatedUsers}
        	}
        	let filter = {};
        	filter['sort'] = { createdAt: -1 };
        	if(filters.limit && filters.skip) { 
        		filter['limit'] =  parseInt(filters.limit);
        		filter ['skip'] = parseInt(filters.skip);
        	}
    
        	if(filters && Object.keys(filters).length && filters.position) {
		        filter.location = {
		            '$near': {
		                '$geometry': {
		                    type: "Point",
		                    coordinates: JSON.parse(filters.position)
		                },
		                '$minDistance': 1609.34 ,
		                '$maxDistance': 1609.34 
		            }
		        };
    		}
    		console.log(">>>>>>>>>>>>",filter);
       	 	newsFeedPosts.getAllPost(query,{},filter,(error,post) => {
       	 		if(error) {
					res.status(400).send(error);
				} else {
					res.status(200).send(post)
				}
       	 	});
       	});
	} else {
		res.status(404).send({"message": "User Not logedIn"});
	}
})


export default router;

// W7LZe44aMdwEJrs46