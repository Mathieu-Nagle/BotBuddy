const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');

const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackBotToken = process.env.SLACK_BOT_TOKEN;
const port = process.env.SLACK_PORT || 3000;

const slackEvents = createEventAdapter(slackSigningSecret);
const slackClient = new WebClient(slackBotToken);

slackEvents.on('app_mention', (event) => {
    console.log(`Got message from user ${event.user}:${event.text}`);
    (async () => {
    try {
        await slackClient.chat.postMessage({channel:event.channel, text:`Hello <@${event.user}>!:tada:`})
    } catch (error){
        console.log(error.data);
    }
    })();
});

slackEvents.on('error', console.error);

slackEvents.start(port).then(() => {
    console.log(`Serever started on port ${port}`)
});

// const { App } = require('@slack/bolt');

// const app = new App({
//   token: process.env.SLACK_BOT_TOKEN,
//   signingSecret: process.env.SLACK_SIGNING_SECRET
// });

// (async () => {
//   await app.start(process.env.PORT || 3000);
// })();

// app.event('app_home_opened', ({ event, say }) => {  
//     say(`Hello world, <@${event.user}>!`);
// });
