/**
 * routes for image actions
 * Multer for multi part files
 * roles are implemented but for now no need for them
 * @type {e | (() => Express)}
 */

const express = require('express');

const imageController = require('../controller/image.controller.js');
const router = express.Router();

/**
 * upload image to s3 in three different resolutions (300,1024,2048)
 */
router.post('/images',imageController.imageUploader);
/**
 * Get image emdpont
 * Key is the image path or user can get it directly , but of we want to secure our images
 * user can call this endpoint
 */
router.get('/images/:key',imageController.imageDownloader);

module.exports = router