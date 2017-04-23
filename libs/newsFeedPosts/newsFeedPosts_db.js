import mongoose from 'mongoose';

const newsFeedPost =  mongoose.Schema({
	content : {type:String,required: true},
	permissions : { type:String, defalut:'public'},
    location: {
            type: {
                type: String,
                enum: 'Point',
                default: 'Point'
            },
            coordinates: {
                type: [Number],
                default: [0, 0]
            }
    },
	title : String,
	author : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	createdAt :{ type:Date, default:Date.now()} ,
	likedBy : {type: Array},
	dislikedBy : {type: Array},
	removed : { type: Boolean,default:false},
	hidden :  { type :Boolean,default:false},
	peaceBy : {type: Array},
	updatedAt : {type : Date},
	imageUrl : {type: String}
	
})

export default mongoose.model('newsFeedPost', newsFeedPost);