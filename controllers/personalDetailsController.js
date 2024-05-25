const PersonalDetails = require('../models/personalDetails');
const User = require('../models/user');

// Add or update personal details
exports.addOrUpdatePersonalDetails = async (req, res) => {
  const { fatherName, motherName, street, area, city, state, country, pincode, educationDetails, userId } = req.body;

  try {
    let personalDetails = await PersonalDetails.findOne({ userId });
    if (personalDetails) {
      // Update existing personal details
      personalDetails.fatherName = fatherName;
      personalDetails.motherName = motherName;
      personalDetails.street = street;
      personalDetails.area = area;
      personalDetails.city = city;
      personalDetails.state = state;
      personalDetails.country = country;
      personalDetails.pincode = pincode;
      personalDetails.educationDetails = educationDetails;
    } else {
      // Create new personal details
      personalDetails = new PersonalDetails({
        fatherName, motherName, street, area, city, state, country, pincode, educationDetails, userId
      });
    }

    await personalDetails.save();
    res.status(201).json(personalDetails);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all users with personal details
exports.getAllUsersWithPersonalDetails = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
         from: 'personaldetails',
          localField: 'user_id',
          foreignField: 'user_id',
          as: 'personalDetail'
        }
      },
      { $unwind: '$personalDetail' } 
    ]);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Add or update personal details
exports.addOrUpdatePersonalDetails = async (req, res) => {
  try {
    const personalDetails = new PersonalDetails(req.body);
    await personalDetails.save();
    res.status(201).json(personalDetails);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



exports.updatePersonalDetails = async (req, res) => {
  try {
     const personinfo = await PersonalDetails.findOneAndUpdate(
      { userId: req.params.userId }, req.body,
      { new: true, runValidators: true }

    );
 if(!personinfo){
  return res.status(404).json({ message: 'update failed' });

 }
 
      return res.status(200).json(personinfo);


  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.deletePersonalDetails = async (req, res) => {
  try {
    const userId = req.params.userId;

    const deletedPersonalDetail = await PersonalDetails.findOneAndDelete({ userId: userId });

    if (!deletedPersonalDetail) {
      return res.status(404).json({ message: 'Personal details not found for this user' });
    }

    res.status(200).json({ message: 'Personal details deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get personal details for a user
exports.getuserDetailsbyId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userInfo = await User.aggregate([
      { $match: { userId: userId } },
      {
        $lookup: {
          from: 'personaldetails',
          localField: 'userId', // Corrected to match the User field
          foreignField: 'userId', // Corrected to match the PersonalDetails field
          as: 'personalDetail'
        }
      },
      { $unwind: '$personalDetail' } // Unwind the array to get object
    ]);

    if (userInfo.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(userInfo[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user info', error: error.message });
  }
};
