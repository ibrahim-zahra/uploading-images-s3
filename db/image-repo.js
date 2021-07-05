const imagePathTable = "user_images";
const connection=require('./connection')
/**
 * Insert Image path into DB table image_path assigned with user id
 * @param user_id
 * @param image_path
 * @returns {Promise<void>}
 */
async function insertUserImage(user_id, image_path) {
    connection.query(`INSERT INTO  ${imagePathTable}(user_id, image_path) VALUES(?,?)`, [user_id, image_path], function (err, result) {
        if (err) throw err;
        console.log("1 image path was inserted");

    })
}
async function getImageByUserId(user_id, image_path) {
    connection.query(`Select * from  ${imagePathTable} where user_id=? and image_path=?`, [user_id, image_path], function (err, result) {
        if (err) throw err;
        console.log("1 image path was inserted");

    })
}
module.exports={insertUserImage,getImageByUserId}