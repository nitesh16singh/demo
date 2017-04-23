import settings from '../config/oauth';
import s3 from 's3';
import fs from 'fs';
import path from 'path';
import mime from 'mime';
//default mime default type
mime.default_type = 'image/unknown';


const uploader =  {
    /*
     * @desc
     * @params  options  object key(fileName:name of file,localFilePath:"path/of/file/to/be/uploaded
        prefix:add before file name like tenant_user_name /vendor_user_name,
        dirName: name of the directory where to store ")
     * @params callback function
     * return callback (err,{uploaded:true,filePath:"path to be store in db"})
     */
    uploadFile: function(options, imageDetails, callback) {
        try {
            if (settings.s3bucket && settings.aws && settings.aws.accessKeyId && settings.aws.secretAccessKey) {
                    var client = s3.createClient({
                        maxAsyncS3: 14, // this is the default
                        s3RetryCount: 3, // this is the default
                        s3RetryDelay: 1000, // this is the default
                        s3Options: {
                            accessKeyId: settings.aws.accessKeyId,
                            secretAccessKey: settings.aws.secretAccessKey
                                // any other options are passed to new AWS.S3()
                                // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
                        }
                    });
                } else {
                    console.log("error while making connetion with S3 Bucket");
                }

            // allow null prefix
            if (!options && !options.fileName && !options.path && !options.destination) {
                callback({
                    message: "some keys are missing for file upload options object"
                }, null);
            } else {
                let fileNameWithFullPath = "";
                let mimeType = mime.lookup(options.mimetype);
                let fileName = options.originalname;
                let extension = fileName.slice((Math.max(0, fileName.lastIndexOf(".")) || Infinity) + 1);
                /*decide file type is image of document*/
                if (mimeType.indexOf('image') == 0) {
                    fileNameWithFullPath += "images/";
                }
                //  else {
                //     fileNameWithFullPath += "document/";
                // }
                fileNameWithFullPath += imageDetails.type + '/' + imageDetails.userId + '/' + imageDetails.type + options.filename ;

                let localFilePath = options.path;

                /*configure params for s3*/
                let params = {
                    localFile: localFilePath,
                    s3Params: {
                        Bucket: settings.s3bucket.name, // neee to fix with real name
                        Key: fileNameWithFullPath,
                        ACL: 'public-read',
                        CacheControl: 'max-age=null',
                        ContentType: mime.lookup(fileNameWithFullPath)
                    }
                };
                /*start uploading*/

                let uploader = client.uploadFile(params);
                /*bind error event*/
                uploader.on('error', function(err) {
                    console.error("unable to upload " + err.stack);
                    // callback(null,{"uploaded":true,"filePath":fileNameWithFullPath})
                    callback(err, null);
                });

                uploader.on('end', function() {
                    // console.log("done uploading ");
                    callback(null, {
                        "uploaded": true,
                        "filePath": fileNameWithFullPath
                    })
                });
            }
        } catch (e) {
            console.log(e);
            callback(e, null);
        }

    },
    /*
     * @desc
     * @params  options  object key(filePath: path of file to be deleted)
     * @params callback function
     * return callback (err,{deleted:true,"filePath":"deleted file path"})
     */
    removeFile: function(options, callback) {
        try {
            if (settings.s3bucket && settings.aws && settings.aws.accessKeyId && settings.aws.secretAccessKey) {
                var client = s3.createClient({
                    maxAsyncS3: 14, // this is the default
                    s3RetryCount: 3, // this is the default
                    s3RetryDelay: 1000, // this is the default
                    s3Options: {
                        accessKeyId: settings.aws.accessKeyId,
                        secretAccessKey: settings.aws.secretAccessKey
                            // any other options are passed to new AWS.S3()
                            // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
                    }
                });
            } else {
                console.log("error while making connetion with S3 Bucket");
            }

            var filePath = "";
            if (options.filePath === undefined) {
                callback({
                    message: "must give filePath for delete File"
                }, null);
            } else {
                if (settings.s3bucket && settings.s3bucket.name) {
                    // remove form s3
                    var arr = [];
                    var obj ;
                    if (typeof options.filePath == "string") {
                        obj = { Key: options.filePath };
                        arr.push(obj);
                    } else {
                        options.filePath.forEach(function(data) {
                            obj = { Key: data };
                            arr.push(obj);
                        });
                    }
                    var params = {
                        Bucket: settings.s3bucket.name,
                        Delete: { // required
                            Objects: arr
                        }
                    };
                    var deleter = client.deleteObjects(params);
                    deleter.on('error', function(err) {
                        callback(err, null);
                    });
                    deleter.on('end', function() {
                        callback(null, {
                            "deleted": true,
                            "filePath": options.filePath
                        });
                    });
                }
            }
        } catch (e) {
            console.log(e);
            callback(e, null);
        }
    },

}

export default uploader;