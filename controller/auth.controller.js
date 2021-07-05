const jwt = require('jsonwebtoken')
const {getUser, insertUser} = require("../db/user-repo");
const bcrypt = require('bcrypt')


/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const authenticate = async (req, res) => {
    const {password, email} = req.body
    if (!password || !email) {
        res.sendStatus(400)
        return
    }
    //Get user from DB
    getUser(req.body.email, async function (result) {

        if (result.length == 0) {
            res.status(403).send("this user does not exist")
            return;
        }
        // // Compare the password with the password in the database
        const valid = await bcrypt.compare(req.body.password, result[0].password)
        if (!valid) {
            res.status(403).send("Invalid email or password")
            return;        }
        //
        const token = jwt.sign({
            id: result[0].id,
            user: result[0].email,
        }, process.env.JWT_PRIVATE_SECRET, {expiresIn: "15m"});

        res.send({
            ok: true,
            token: token
        });
    })
}
/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const register = async (req, res) => {
    const user = {email: req.body.email, password: await passwordEncoder(req.body.password)}
    await insertUser(user, function (results) {
        res.status(200).send(results)
    });
}

/**
 *
 * @param password
 * @returns {Promise<*>}
 */
async function passwordEncoder(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

module.exports = {
    authenticate, register
};