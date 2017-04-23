import mongoose from 'mongoose';

const userGroup =  mongoose.Schema ( {
	name : {type: String , required:true},
	desc : {type: String },
	privateGroup : {type: Boolean , default : false},
	imageUrl : String,
	members : [
		{
			"id" : String,
			"status" : { type: String , default : 'pending'}
		},
	],
	ownerId : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	createdAt : {type: Date , default : Date.now()},
	updatedAt : {type: Date , default : Date.now()}



})