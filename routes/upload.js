import express from 'express';
import s3uploader from '../utils/s3'
import uploader from '../utils/uploader'
import multer from 'multer';
const router  = express.Router();

var storage = multer.diskStorage({
   destination: function(req, file, cb) {
       cb(null, './uploads/');
   },
   filename: function(req, file, cb) {
       cb(null, file.originalname)
   }
})

var upload = multer({ storage: storage });

/**
* @api {post} /uploadImage Upload Images on S3 
* @apiName imageUploading
* @apiGroup Images on S3
*
* @apiExample {json} Input Example:
*     { file:fileObject, type:'profilePhotos' }

* @apiParam {String} file   Mandatory file.
* @apiParam {String} type  Mandatory (profilePhotos,newsFeedImages,newsFeedVideos,groupsImages)
*
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*    
*  {
*  "filePath": "images/profilePhotos/5858dc09f11b07405396d58b/profilePhotosScreenshot from 2016-12-26 11:27:02.png"
*  }

* @apiErrorExample {json} Image Type is Missing:
*     HTTP/1.1 400 Not Found
*     {
*       'message': 'please Enter type Of image '
*     }
*
* @apiErrorExample {json}  Email is Not Register:
*     HTTP/1.1 400 Not Found
*     {
*        'message':"User not LogedIn"
*     }
* @apiErrorExample {json}  Password Not Matched :
*     HTTP/1.1 400 Not Found
*     {
*        "message": "Password Not Matched."
*     }
*/

router.post('/uploadImage',multer({ storage: storage }).single('file'),(req,res,next) => {
    if(req.user) { 
    	let options = {};
    	if(req.body.type && req.body.type == 'profilePhotos' || req.body.type == 'newsFeedImages' ||  req.body.type == 'newsFeedVideos' || req.body.type == 'groupsImages') {
    		options['type'] = req.body.type ;
    		options['userId'] = req.user.id;
		    s3uploader.upload(req.file,options,(error,data)=> {
		    	if(error){
		    		res.status(400).send(error)
		    	} else {
		    		res.status(200).send(data);
		    	}	
		    })
    	} else {
    	  	res.status(400).send({'message': 'please Enter type Of image '})
    	}
    } else {
    	res.status(400).send({'message':"User not LogedIn"});
    }

})


/**
* @api {delete} /deleteImage delete Images on S3 
* @apiName deleteImages
* @apiGroup Images on S3
*
* @apiExample {json} Input Example:
*     {
      "filePath": "images/profilePhotos/5858dc09f11b07405396d58b/profilePhotosScreenshot from 2016-11-25 17:13:42.png"
    }

* @apiParam {String} filePath   Mandatory filePath.
*
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
* {
  "deleted": true,
  "filePath": ""images/profilePhotos/5858dc09f11b07405396d58b/profilePhotosScreenshot from 2016-11-25 17:13:42.png""
 }
* @apiErrorExample {json} Image Type is Missing:
*     HTTP/1.1 400 Not Found
*     {
      "message": "Missing Field filePath"
      }
*
* @apiErrorExample {json}  Email is Not Register:
*     HTTP/1.1 400 Not Found
*     {
*        'message':"User not LogedIn"
*     }
*/
router.delete('/deleteImage',(req,res) => {
   if(req.user) {
       if(req.body.filePath) {
          uploader.removeFile(req.body,(error,data) => { 
            if(error) {
                res.status(400).send(error)
            } else { 
                res.status(200).send(data);
            }
          })
       } else {
         res.status(400).send({"message":"Missing Field filePath"})
       }
   } else {
        res.status(400).send({"message":"User Not LogedIn"})
   }
})
export default router;