const express = require('express');
const { generatePrompt } = require('../controllers/openaiController');
const { generateImage } = require('../controllers/openaiController');
const router = express.Router();

router.post('/generateprompt', generatePrompt);
router.post('/generateimage', generateImage);

module.exports = router;
