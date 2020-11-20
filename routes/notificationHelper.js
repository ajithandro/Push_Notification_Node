var subscriber = require('../models/subscriber');

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

module.exports = { getTokens, buildNotificationData};


