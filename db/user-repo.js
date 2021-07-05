const connection=require('./connection')
const userTable = "users";

/**
 *
 * @param email
 * @param callback
 */
function getUser(email, callback) {
    console.log(email)
    connection.query(`SELECT * FROM ${userTable} where email=?`, [email], function (err, result) {
        if (err) throw err;
        callback(result);
    });
}

/**
 *
 * @param user
 * @param callback
 * @returns {Promise<void>}
 */
async function insertUser(user, callback) {
    getUser(user.email, function (result) {
        if (result.length > 0) {
            console.log("This user already exist")
            callback(false)
        } else {
            connection.query(`INSERT INTO ${userTable} (email, password) VALUES(?,?)`, [user.email, user.password], function (err) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        }
    })
}


module.exports = {getUser, insertUser};