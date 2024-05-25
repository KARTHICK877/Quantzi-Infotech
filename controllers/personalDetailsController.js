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
          localField: 'userId',
          foreignField: 'userId',
          as: 'personalDetails'
        }
      },
      { $unwind: '$personalDetails' },
      {
        $project: {
          name: 1,
          emailId: 1,
          phoneNumber: 1,
          type: 1,
          role: 1,
          userId: 1,
          personalDetails: {
            fatherName: 1,
            motherName: 1,
            street: 1,
            area: 1,
            city: 1,
            state: 1,
            country: 1,
            pincode: 1,
            educationDetails: 1
          }
        }
      }
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

// Get personal details for a user
exports.getPersonalDetailsByUserId = async (req, res) => {
  try {
    const personalDetails = await PersonalDetails.findOne({ userId: req.params.userId });
    if (!personalDetails) {
      return res.status(404).json({ message: 'Personal details not found for the user' });
    }
    res.json(personalDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
