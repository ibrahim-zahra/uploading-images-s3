/**
 *Auth endpoints
 * requests will be redirected from app.js
 *
 * @type {e | (() => Express)}
 */
const express = require("express");
const authController = require('../controller/auth.controller');
const router = express.Router();

/**
 * Authinticate and get JWT token
 */
router.post('/user/sign-in',authController.authenticate);

/**
 * Register to the system
 */
router.post('/user/sign-up',authController.register);

module.exports = router

