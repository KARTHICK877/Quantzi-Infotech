const express = require('express');
const { addOrUpdatePersonalDetails, getAllUsersWithPersonalDetails ,getPersonalDetailsByUserId} = require('../controllers/personalDetailsController');
const router = express.Router();

router.post('/', addOrUpdatePersonalDetails);
router.get('/all', getAllUsersWithPersonalDetails);
router.get('/:userId', getPersonalDetailsByUserId);


module.exports = router;
