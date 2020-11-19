var subscriber = require('../models/subscriber');
var FCM = require('fcm-node');
var serverKey = process.env.FCM_SERVER_KEY;
var fcm = new FCM(serverKey);

async function getTokens() {
    var tokens = [];
    const subscribers = await subscriber.find().select('fcmToken');
    for (i = 0; i < subscribers.length; i++) {
        var token = subscribers[i].get('fcmToken');
        tokens.push(token);
    }
    return tokens;
}

function buildNotificationData(Tokens, jsonData) {
    var message = { //to the message type (single recipient, multicast, topic, etc)
        registration_ids: Tokens,
        data: jsonData
    };
    return message;
}

 async function publishNotification(msg) {
    var status;
    fcm.send(msg, function (err, response) {
        if (err) {
            status = 'Something has gone wrong! ' + err;
        } else {
            status = 'Successfully sent with response: ' + response;

        }
       console.log(status);
    });
    return await status;
}

module.exports = { getTokens, buildNotificationData, publishNotification };


