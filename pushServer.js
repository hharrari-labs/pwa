const webPush = require('web-push');

// afin de générer un créer un fichier de keys private et public en format json 
// npm install web-push -g 
// web-push generate-vapid-keys --json > pushServerKeys.json 
const pushServerKeys = require('./pushServerKeys.json');

const pushClientSubscription = require('./pushClientSubscription.json');

webPush.setVapidDetails('mailto:contact@web-site.fr', pushServerKeys.publicKey, pushServerKeys.privateKey);

const subscription = {
    endpoint: pushClientSubscription.endpoint,
    keys: {
        auth: pushClientSubscription.keys.auth,
        p256dh: pushClientSubscription.keys.p256dh
    }
};


// TODO retrieve all users subscriptions and send the push notification to every user

// see https://github.com/web-push-libs/web-push for sendNotification API reference sendNotification(pushSubscription, payload, options)
webPush.sendNotification(subscription, 'Notification envoyée depuis le serveur push node :)')
    .then(res => console.log('ma push notif a bien été poussée :)', res))
    .catch(err => console.error);
