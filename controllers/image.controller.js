/**
 * Resize images for specified respolution before upload
 * insert image pathes in rds table and assign it to the right user
 * so we can get them back
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const imageUploader = async (req, res) => {

}
/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const imageDownloader = async (req, res, next) => {
}

module.exports = {
    imageUploader, imageDownloader
};