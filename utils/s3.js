import  settings from  '../config/oauth';
import uploader from './uploader';
import  _ from 'underscore';
import   fs  from 'fs';
const  uploadImage = {
    upload:(options,userDetails,callback) => {
        try {
            let totalImages = [];
            totalImages.push(options);
            let rmdir = (totalImages) => {
                try {
                    // var files = fs.readdirSync(dirPath);
                    if (totalImages && totalImages.length) {
                        for (let i = 0; i < totalImages.length; i++) {
                            let filePath = totalImages[i].path;
                            if (fs.statSync(filePath).isFile()) {
                                fs.unlinkSync(filePath);
                            }
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
            } 
            uploader.uploadFile(options,userDetails,(err, udata) => {
                if (err) {
                    rmdir(totalImages);
                    callback(err, null);
                } else {
                    rmdir(totalImages);
                    let result = {
                        "filePath": udata.filePath
                    };
                    callback(null, result);
                }
            });
        } catch (e) {
            console.log(e);
            console.log(e.stack);
            res.status(400).send(e.stack);
        }
    }
};
export default uploadImage;
