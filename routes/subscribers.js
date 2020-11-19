require('dotenv').config();
const express = require('express');
const router = express.Router();
const { get } = require('mongoose');
const Subscriber = require('../models/subscriber');
var notification = require('./notificationHelper')


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
    var fcmTokens = [];
    var loadedData;
    var jsonRes;
    var notify = notification.getTokens();
    notify.then(function (result) {
        fcmTokens = result;
        loadedData = notification.buildNotificationData(fcmTokens, req.body);
        return loadedData;
        // jsonRes = notification.publishNotification(loadedData);
        // console.log(jsonRes);
        // res.status(200).json(jsonRes);
    }).then(data => {
        jsonRes = notification.publishNotification(data);

        return jsonRes;

    }).then(status => {
         res.status(200).json(status);

    })
});



module.exports = router;