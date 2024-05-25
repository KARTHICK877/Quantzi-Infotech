const express = require('express');
const { addOrUpdatePersonalDetails, getAllUsersWithPersonalDetails ,getuserDetailsbyId, deletePersonalDetails, updatePersonalDetails} = require('../controllers/personalDetailsController');
const router = express.Router();

router.post('/', addOrUpdatePersonalDetails);
router.get('/all', getAllUsersWithPersonalDetails);
router.get('/:userId', getuserDetailsbyId);
router.put('/:userId', updatePersonalDetails);
router.delete('/:userId', deletePersonalDetails);


module.exports = router;
