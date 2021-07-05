/**
 * This is if we want to support authorities
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */

function admin(req, res, next) {
    console.log("Admin")
    if (!req.user.roles.includes("admin")) return res.status(403).send({
        ok: false,
        error: "Access denied."
    });
    console.log("Finish")
    next();
}

function editor(req, res, next) {
    if (!req.user.roles.includes("editor")) return res.status(403).send({
        ok: false,
        error: "Access denied."
    });

    next();
}

function viewer(req, res, next) {
    if (!req.user.roles.includes("viewer")) return res.status(403).send({
        ok: false,
        error: "Access denied."
    });

    next();
}

module.exports = { admin, editor, viewer };