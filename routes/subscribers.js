require('dotenv').config();
const express = require('express');
const router = express.Router();
const { get } = require('mongoose');
const Subscriber = require('../models/subscriber');
var notification = require('./notificationHelper')
var FCM = require('fcm-node');
var serverKey = process.env.FCM_SERVER_KEY;
var fcm = new FCM(serverKey);

//getting one user
// router.get('/', async (req, res) => {
//     const subscribers = await Subscriber.find();
//     res.json(subscribers);

// });

//creating new one
router.post('/', async (req, res) => {
    var data = req.body.nameValuePairs;
    console.log(data)
    const subscriber = new Subscriber({
        userName: data.userName,
        Password: data.Password,
        deviceID: data.deviceID,
        fcmToken: data.fcmToken
    });

    try {
        const newsubcriber = await subscriber.save();
        res.status(200).json(req.body);
    } catch (error) {
        res.json(req.body);
    }
});



router.post('/notify', async (req, res) => {
    var notify = notification.getTokens();
    notify.then(function (result) {
        return notification.buildNotificationData(result, req.body);
    }).then(data => {
        fcm.send(data, function (err, response) {
            if (err) {
                status = 'Something has gone wrong! ' + err;
            } else {
                status = 'Successfully sent with response: ' + response;
    
            }
          res.status(200).json(status);
        });

    })
});



module.exports = router;