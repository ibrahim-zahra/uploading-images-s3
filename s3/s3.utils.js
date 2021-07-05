require('dotenv').config()
const S3 = require('aws-sdk/clients/s3')
const Sharp = require("sharp");
const {insertUserImage} = require('../db/image-repo')


const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

/**
 * uploads a file to s3
 * @param buffer contains image
 * @param fileName
 * @returns {Promise<ManagedUpload.SendData>}
 */

async function uploadFile(buffer, fileName) {
    console.log("Uploading file: " + fileName)

    const uploadParams = {
        Bucket: bucketName,
        Body: buffer,
        Key: fileName
    }

    const result =  s3.upload(uploadParams).promise()
     console.log("Finished uploade file: "+(await result).Key)
    return result;
}

exports.uploadFile = uploadFile

/**
 * downloads a file from s3
 * @param fileKey
 * @returns {stream.Readable}
 */
function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream()
}

exports.getFileStream = getFileStream

/**
 * Resizing image using Sharp
 * After resizing it will upload it to s3
 * remove original image
 * @param filepath
 * @param width
 * @param height
 * @param callback
 */
async function resizeAndUpload(file, width, height, user_id) {
    let res = null;
    await Sharp(file.path)
        .resize(width, height)
        .toBuffer()
        .then(buffer => {
            return res = uploadFile(buffer, file.filename + "_" + width + "_" + height);

        }).then(res => {
            insertUserImage(user_id, res.Key)

        })
        .catch(e => reject(e));

    return res;
}

exports.resizeAndUpload = resizeAndUpload
