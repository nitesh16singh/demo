import mongoose from 'mongoose';
const newsFeedPostComment =  mongoose.Schema({
	content : {type:String,required: true},
	author : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	newsFeedPost :{type: mongoose.Schema.Types.ObjectId, ref: 'newsFeedPosts'},
	createdAt :{ type:Date, default:Date.now()} ,
	likedBy : {type: Array},
	dislikedBy : {type: Array},
	peaceBy : {type: Array},
	updatedAt : {type:Date}
})

export default mongoose.model('newsFeedPostComment', newsFeedPostComment);