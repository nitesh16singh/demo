import express from 'express';
import newsFeedPostsComment from '../libs/newsFeedPostComments/newsFeedPostComment_api';

const router = express.Router();
/**
 * @api {post}  /addComment Add New Comment 
 * @apiName addComment
 * @apiGroup Comments

 * @apiExample {json} Input Example :
 *   {content: 'This is nice post',postId:'5858eb73e0a86c4b07ba220a'}       
 *
 * @apiParam {String} content   Mandatory .
 * @apiParam {String} postId     Mandatory .  
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
	    "__v": 0,
	    "content": "This is nice post",
	    "author": "5858dc09f11b07405396d58b",
	    "updatedAt": "2016-12-20T12:03:59.000Z",
	    "newsFeedPost": "5858eb73e0a86c4b07ba220a",
	    "_id": "58591e2f44ba7b1dd27501c4",
	    "peaceBy": [],
	    "dislikedBy": [],
	    "likedBy": [],
	    "createdAt": "2016-12-20T12:03:54.506Z"
	}
 *
 * @apiErrorExample Error-Response  Content , postId Missing 
 	
 	HTTP/1.1 400 Not Found
 	{"message": "Need Some important field to creating new Post"}.
 *
  * @apiErrorExample Error-Response:  If User Not logedIn 
 	HTTP/1.1 401 Not Found
 	{"message": "User Not logedIn"}
 *
 */

router.post('/addComment', (req, res, next) => {
    if (req.user) {
        if (req.body && req.body.postId && req.body.content) {
            req.body.author = req.user.id;
            req.body.updatedAt = Date();
            req.body.newsFeedPost = req.body.postId;
            newsFeedPostsComment.createNewNewsComment(req.body, (error, post) => {
                if (error) {
                    res.status(404).send(error);
                } else {
                    res.status(200).send(post);
                }
            })
        } else {
            res.status(404).send({ "message": "Important field Missing." });
        }
    } else {
        res.status(400).send({ "message": "User Lot login" });
    }
})

/**
 * @api {put}  /updateComment update New Comment 
 * @apiName updateComment
 * @apiGroup Comments
 * @apiExample {json} Input Example: 
       { commentId:'586351401d8f104be4e69930' , action:'like' , content: "o wow message is working" }
 * @apiParam {String} commentId   Mandatory . 
 * @apiparam {String} action  Optioanl (like,dislike,peace) 
 * @apiParam {String} content   Optional . 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
	    "_id": "58591e2f44ba7b1dd27501c4",
	    "content": "o wow message is working",
	    "author": "5858dc09f11b07405396d58b",
	    "updatedAt": "2016-12-20T12:19:32.000Z",
	    "newsFeedPost": "5858eb73e0a86c4b07ba220a",
	    "__v": 0,
	    "peaceBy": [],
	    "dislikedBy": [
	        "5858dc09f11b07405396d58b"
	    ],
	    "likedBy": [
	        "5858dc09f11b07405396d58b"
	    ],
	    "createdAt": "2016-12-20T12:03:54.506Z"
	}

 *
 * @apiErrorExample Error-Response commentId Missing 
 	
 	HTTP/1.1 400 Not Found
 	{"message": "Need Some important field to creating new Post"}.
 *
  * @apiErrorExample Error-Response:  If User Not logedIn 
 	HTTP/1.1 401 Not Found
 	{"message": "User Not logedIn"}
 *
 */
router.put('/updateComment', (req, res, next) => {
    if (req.user) {
        if (req.body && req.body.commentId) {
            newsFeedPostsComment.updatePostComment(req.user.id, req.body, (error, post) => {
                if (error) {
                    res.status(404).send(error);
                } else {
                    res.status(200).send(post)
                }
            })
        } else {
            res.status(404).send({ "message": "Important field Missing." });
        }
    } else {
        res.status(404).send({ "message": "User Lot Logedin" });
    }
})

/**
 * @api {delete}  /comment Delete Comment 
 * @apiName deleteComment
 * @apiGroup Comments
 * @apiExample {json} Input Example: 
       { commentId:'586351401d8f104be4e69930' }
 * @apiParam {String} commentId   Mandatory . 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  
    {
    "ok": 1,
    "n": 1
    }
 *
 * @apiErrorExample Error-Response commentId Missing 
    
    HTTP/1.1 400 Not Found
    { "message": "Comment ID Missing" }.
 *
  * @apiErrorExample Error-Response:  If User Not logedIn 
    HTTP/1.1 401 Not Found
    {"message": "User Not logedIn"}
 *
 */

router.delete('/comment',(req,res) => {
    if(req.user) {
        let options = {};
        options['author'] = req.user.id;  
        if(req.body.commentId) {
            options['_id'] =  req.body.commentId;
            newsFeedPostsComment.delete(options,(error,data)=> {
              if (error) {
                    res.status(404).send(error);
                } else {
                    res.status(200).send(data)
                }  
            })
        } else {
           res.status(404).send({ "message": "Comment ID Missing" });
        }
    } else {
        res.status(404).send({ "message": "User Lot Logedin" });
    }
})


/**
* @api {get} /comments Get comments related to post  
* @apiName comments
* @apiGroup Comments
* @apiExample {json} Input Example :
*       /comments?postId=586338d40b7cf63146991405
*
* @apiSuccessExample {json} Success-Response:
*
{
    "_id": "586358b7925daf5f9a0dffc4",
    "content": "Add comment in post",
    "author": "5858dc09f11b07405396d58b",
    "updatedAt": "2016-12-28T06:16:23.000Z",
    "newsFeedPost": "586338d40b7cf63146991405",
    "__v": 0,
    "peaceBy": [],
    "dislikedBy": [],
    "likedBy": [],
    "createdAt": "2016-12-28T06:13:14.880Z"
}, {
    "_id": "586358be925daf5f9a0dffc5",
    "content": "Add comment in post 1",
    "author": "5858dc09f11b07405396d58b",
    "updatedAt": "2016-12-28T06:16:30.000Z",
    "newsFeedPost": "586338d40b7cf63146991405",
    "__v": 0,
    "peaceBy": [],
    "dislikedBy": [],
    "likedBy": [],
    "createdAt": "2016-12-28T06:13:14.880Z"
}, {
    "_id": "586358c4925daf5f9a0dffc6",
    "content": "Add comment in post 2",
    "author": "5858dc09f11b07405396d58b",
    "updatedAt": "2016-12-28T06:16:36.000Z",
    "newsFeedPost": "586338d40b7cf63146991405",
    "__v": 0,
    "peaceBy": [],
    "dislikedBy": [],
    "likedBy": [],
    "createdAt": "2016-12-28T06:13:14.880Z"
}
* @apiErrorExample {json} Error-Response:
*     HTTP/1.1 400 Not Found
*     { 
        "message": "post Id  is Missing" 
      }
*
*
* @apiErrorExample {json} Error-Response:
*     HTTP/1.1 404 Not Found
*     {
*       message :'User Not LoggedIn'
*     }
*/ 

router.get('/comments',(req,res)=> {
    if(req.user) {
        let options = {};
        if(req.query.postId) {
            options['newsFeedPost'] =  req.query.postId;
            newsFeedPostsComment.findcomments(options, {} ,{sort: { createdAt:-1 } },(error,data)=> {
              if (error) {
                    res.status(404).send(error);
                } else {
                    res.status(200).send(data)
                }  
            })
        } else {
           res.status(404).send({ "message": "post Id  is Missing" });
        }
    } else {
        res.status(404).send({ "message": "User Lot Logedin" });
    }

})
export default router;

// W7LZe44aMdwEJrs46
