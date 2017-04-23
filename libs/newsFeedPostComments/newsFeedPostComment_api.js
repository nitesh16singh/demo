 import newsFeedComment from './newsFeedPostComment_db'

const newsfeed_api = {
 	createNewNewsComment: (comment, done) => {
        try {
            let newNeewsFeed = new newsFeedComment(comment);
            newNeewsFeed.save(comment, (err,result) => {
                if (err) {
                	return done(err, null);
                } else {
                	return done(null, result);
                }
            })
        } catch(e) {
            console.log("error in news Creation",e);
            return done(e, null)
        }
    },
    updatePostComment:(userId,oprations, done) => {
        try {
		 	let action = oprations.action;
		 	let commentId =  oprations.commentId;
		 	newsFeedComment.findOne({'_id': commentId},(error,post) => {
		 		if(error) {
		 			return done(error,null);
		 		} else if(post) {
		 			let fieldToUpdate = '';
		 			let oprationsArray;
		 			// action is like then 
		 			let update = {};
		 			if(action == 'like') {
		 				fieldToUpdate = 'likedBy'
		 				if(post.likedBy && post.likedBy.length) {
		 					let index = post.likedBy && post.likedBy.indexOf(userId);
			 				if(index > -1) {
			 					post.likedBy.splice(index, 1)
			 					oprationsArray = post.likedBy;
			 				} else {
		 						post.likedBy.push(userId)
		 						oprationsArray = post.likedBy;
		 					}
			 			} else {
		 					post.likedBy.push(userId)
		 					oprationsArray = post.likedBy;
		 				}
		 			} else if(action == 'dislike') {
		 				 fieldToUpdate = 'dislikedBy';
		 				 if(post.dislikedBy && post.dislikedBy.length) {
			 				let index = post.dislikedBy && post.dislikedBy.indexOf(userId);
			 				if(index > -1) {
			 					post.dislikedBy.splice(index, 1)
			 					oprationsArray = post.dislikedBy;
			 				} else {
			 					post.dislikedBy.push(userId)
			 					oprationsArray = post.dislikedBy;
			 				}
			 			} else {
			 					post.dislikedBy.push(userId)
			 					oprationsArray = post.dislikedBy;
			 			}
		 			} else if(action == 'peace') {
		 				fieldToUpdate = 'peaceBy'; 
		 				if(post.peaceBy.length) {
			 				let index = post.peaceBy.indexOf(userId);
			 				if(index > -1) {
			 					 post.peaceBy.splice(index, 1);
			 					 oprationsArray = post.peaceBy;
			 				} else {
			 					post.peaceBy.push(userId);
			 					oprationsArray = post.peaceBy;
			 				}
			 			} else {
			 				post.peaceBy.push(userId);
			 				oprationsArray = post.peaceBy;
			 			}
		 			} 
		 			if(oprations.content) {
                     	update["content"] = oprations.content;
                     }
				  	update[fieldToUpdate] = oprationsArray
				  	newsFeedComment.findOneAndUpdate({'_id': commentId},{$set:update,"updatedAt" : Date()},{new:true}, (err,result) => {
		                if (err) {
		                	return done(err, null);
		                } else {
		                	return done(null, result);
		                }
				    });        
		 		} else {
		 			done({"message":"Post not found"},null)
		 		}
		 	});
     	} catch(e) {
			console.log("error in news Creation",e);
		}
       
    },
    delete : (options,done) => {
    	newsFeedComment.remove(options,(error,data) => {
    		 if (error) {
                	return done(error, null);
                } else {
                	return done(null, data);
                }
    	})
    },
    findcomments:(options, fields, filter,done) => {
    	options = options || {};
    	fields =  fields || {};
    	filter =  filter || {};
    	newsFeedComment.find(options,fields,filter,(error,data) => {
    		 if (error) {
                	return done(error, null);
                } else {
                	return done(null, data);
                }
    	});
    }
}

 export default newsfeed_api;