const mongoose = require('mongoose');
const User = require('../models/user');
const { createOrder } = require('./order');
const { checkIdToken } = require('./checkIdToken');
// test
const { OAuth2Client } = require('google-auth-library');
const { default: axios } = require('axios');
// end test
const reMail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
rePhone = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$/;
module.exports = {
  getAllUsers: (req, res) => {
    User.find()
      .then((user) => {
        res.status(200).json({ user });
      })
      .catch((err) =>
        res.status(500).json({
          error,
        })
      );
  },
  getUser: (req, res) => {
    const userID = req.params.userID;
    User.findById(userID)
      .then((user) => {
        return res.status(200).json({ user });
      })
      .catch((err) => {
        return res.status(500).json({ message: err });
      });
  },
  createUser: async (req, res) => {
    const { userName, phone, mail } = req.body;
    if (userName != '' && rePhone.test(phone) && reMail.test(mail)) {
      // need todo - check valid mail
      const userInDB = await User.findOne({ mail: mail }).catch((err) => {
        return res.status(500).json({ err });
      });
      if (!userInDB) {
        const userDetails = new User({
          _id: mongoose.Types.ObjectId(),
          userName,
          phone,
          mail,
        });
        await userDetails.save();
        return res
          .status(201)
          .json({ message: 'user created!', user: userDetails });
      } else {
        return res.status(200).json({ message: 'userInDB!', user: userInDB });
      }
    } else {
      return res.status(400).json({
        message: 'details false',
      });
    }
  },

  getToken: async (req, res) => {
    const idToken = req.headers.authorization.split(' ')[1];
    console.log(idToken);

    axios
      .get(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`)
      .then(async (resultData) => {
        console.log(resultData.data);
        let userName = resultData.data.name;
        let phone = 000;
        let mail = resultData.data.email;
        if (userName != '' && rePhone.test(phone) && reMail.test(mail)) {
          // need todo - check valid mail
          const userInDB = await User.findOne({ mail: mail }).catch((err) => {
            return res.status(500).json({ err });
          });
          if (!userInDB) {
            const userDetails = new User({
              _id: mongoose.Types.ObjectId(),
              userName,
              phone,
              mail,
            });
            await userDetails.save();
            return res
              .status(201)
              .json({ message: 'user created!', user: userDetails });
          } else {
            return res
              .status(200)
              .json({ message: 'userInDB!', user: userInDB });
          }
        } else {
          return res.status(400).json({
            message: 'details false',
          });
        }
      })
      .catch((err) => console.log(err));
  },
};
