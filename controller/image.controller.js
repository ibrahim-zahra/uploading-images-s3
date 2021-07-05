const {getFileStream, resizeAndUpload} = require('../s3/s3.utils')
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const {getImageByUserId} = require('../db/image-repo')

/**
 * Resize images for specified resolution before upload
 * insert image paths in rds table and assign it to the right user
 * so we can get them back
 * @param req
 * @param res
 */
const imageUploader = async (req, res) => {
    let user_id = req.user.id
    const file = req.file
    if (typeof file === 'undefined' || file === null) {
        res.sendStatus(400)
        return
    }

    let [small_image_path, medium_image_path, large_image_path] = await Promise.all(
        [
            resizeAndUpload(file, 2048, 2048, user_id),
            resizeAndUpload(file, 1024, 1024, user_id),
            resizeAndUpload(file, 300, 300, user_id)
        ]);

    //remove oroginal image
    await unlinkFile(file.path)
    res.send([
        {"small_image_path": small_image_path.Key},
        {"medium_image_path": medium_image_path.Key},
        {"large_image_path": large_image_path.Key}])
}
/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const imageDownloader = async (req, res) => {
    let user_id = req.user.id;
    const key = req.params.key
    await getImageByUserId(user_id, key, async function (result) {
        if (result.length == 0) {
            res.status(401).send("this user is not authorized to get this image")
            return;
        }
    })

    const readStream = getFileStream(key)
    readStream.pipe(res)
}

module.exports = {
    imageUploader, imageDownloader
};