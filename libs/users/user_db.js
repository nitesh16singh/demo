import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

// define the schema for our user model
const userSchema = mongoose.Schema({
    createdAt: { type:Date, default: Date.now() },
    emails: [{
        address: {type:String, unique : true, required : true},
        verified: { type: Boolean, default: false },
    }],
    password: {type:String, required: true},
    services : {
        facebook:{},
    },   
    secure: {
        smsCode: { type: String, default: "" },
        numberVerify: { type: String, default: "" },
        passwordResetToken: { type: String, default: "" },
        activationToken: { type: String, }
    },
    metadata: {
        smsVerified: { type: String, default: "" },
        isActivated: { type: Boolean ,dafault:true}
    },
    connections: {
        connected: { type: Array, default: [] },
        blocked: { type: Array, default: [] },
        following: { type: Array, default: [] }
    },
    workspaces: { type: Array, default: [] },
    notifications: { type: Array, default: [] },
    pinned: { type: Array, default: [] },
    settings: {
        phonePublic: { type: Boolean, default: true },
        emailPublic: { type: Boolean, default: true },
        addressPublic: { type: Boolean, default: true },
        profilePrivate: { type: Boolean, default: false },
        deactivated: { type: Boolean, default: false }
    },
    profile: {
        firstName: { type:String ,required:true},
        lastName: { type:String,required:true } ,
        fullName: { type:String , required:true},
        company: { type: String, default: "" },
        searchEmail: String,
        title: { type: String, default: "" },
        phoneNumber: { type: Number },
        streetAddress: { type: String, default: "" },
        city: { type: String, default: "" },
        state: { type: String, default: "" },
        zip: { type: Number },
        webAddress: { type: String, default: "" },
        profileImage: { type: String, default: "https://smf.imgix.net/profilePhotos/defaultUser.png" },
        linkedInProfileUrl: { type: String, default: "" },
        facebookProfileUrl: { type: String, default: "" },
        twitterProfileUrl: { type: String, default: "" },
        subscription: { type: String, default: null },
        handle:String,
        dob :Number,
        relationship:String,
        gender:String,
        intro : String,
        zipCode:Number,
        hiddenPosts : {type: Array}
    },
    status: {
        online: { type: Boolean, default: true },
        lastLogin: {
            date: { type: Date, dafault: Date.now() },
            ipAddr: Number,
            userAgent: String
        },
        idle: { type: Boolean, default: false }
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app

const UpdateUserProfile = {
        firstName: 'firstName',
        lastName: 'lastName' ,
        fullName: 'fullName',
        company: 'company',
        searchEmail: 'searchEmail',
        title: 'title',
        phoneNumber: 'phoneNumber',
        streetAddress: 'streetAddress',
        city: 'city',
        state: 'state',
        zip: 'zip',
        webAddress: 'webAddress',
        profileImage: 'profileImage',
        linkedInProfileUrl: 'linkedInProfileUrl',
        facebookProfileUrl: 'facebookProfileUrl',
        twitterProfileUrl: 'twitterProfileUrl',
        subscription: 'subscription',
        handle:'handle',
        dob :'dob',
        relationship:'relationship',
        gender:'gender',
        intro : 'intro',
        zipCode:'zipCode',
        hiddenPosts : 'hiddenPosts'
    };
export { UpdateUserProfile} ;
export default mongoose.model('User', userSchema);
