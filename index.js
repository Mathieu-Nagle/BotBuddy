const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');
const { App } = require('@slack/bolt');

// import firebase from 'firebase/app';
var firebase = require ('firebase/app');
require("firebase/firestore");


const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackBotToken = process.env.SLACK_BOT_TOKEN;
const port = process.env.SLACK_PORT || 3000;

const slackEvents = createEventAdapter(slackSigningSecret);
const slackClient = new WebClient(slackBotToken);

const app = new App({
    token: slackBotToken,
    signingSecret: slackSigningSecret
})

var firebaseConfig = {
    apiKey: "AIzaSyAXNxH7TAoGhm0EeB17cZhrPT4CSEYDTYM",
    authDomain: "botbuddy-d0728.firebaseapp.com",
    projectId: "botbuddy-d0728",
    storageBucket: "botbuddy-d0728.appspot.com",
    messagingSenderId: "172293752081",
    appId: "1:172293752081:web:6f7c8c1f5143c3a143f8b0",
    measurementId: "G-FNG0EFHN6R"
};
firebase.initializeApp(firebaseConfig);

app.command('/test', async ({ command, ack, say }) => {
    // Acknowledge command request
    await ack();
  
    const result = await say(`${command.text}`);
    console.log(result);
});

app.command('/helloworld', async ({ ack, payload, context }) => {
    // Acknowledge the command request
    ack();
  
    try {
        const result = await app.client.views.open({
            token: context.botToken,
            // Pass a valid trigger_id within 3 seconds of receiving it
            trigger_id: payload.trigger_id,
            // View payload
            view: {
              type: 'modal',
              // View identifier
              callback_id: 'view_1',
              title: {
                type: 'plain_text',
                text: 'Modal title'
              },
              blocks: [
                {
                  type: 'section',
                  text: {
                    type: 'mrkdwn',
                    text: 'Welcome to a modal with _blocks_'
                  },
                  accessory: {
                    type: 'button',
                    text: {
                      type: 'plain_text',
                      text: 'Click me!'
                    },
                    action_id: 'button_abc'
                  }
                },
                {
                  type: 'input',
                  block_id: 'test_input',
                  label: {
                    type: 'plain_text',
                    text: 'What are your hopes and dreams?'
                  },
                  element: {
                    type: 'plain_text_input',
                    action_id: 'dreamy_input',
                    multiline: true
                  }
                }
              ],
              submit: {
                type: 'plain_text',
                text: 'Submit'
              }
            }
          });
          console.log(result);
    }
    catch (error) {
      console.error(error);
    }
});

app.command('/createquestion', async ({ ack, payload, context }) => {
    ack();
    try {
        const result = await app.client.views.open({
            token: context.botToken,
            trigger_id: payload.trigger_id,
            view: {
                "title": {
                    "type": "plain_text",
                    "text": "Create a Question"
                },
                "submit": {
                    "type": "plain_text",
                    "text": "Submit"
                },
                "blocks": [
                    {
                        "type": "input",
                        "block_id": "title_input",
                        "element": {
                            "type": "plain_text_input",
                            "action_id": "title",
                            "placeholder": {
                                "type": "plain_text",
                                "text": "type title here..."
                            }
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Title"
                        }
                    },
                    {
                        "type": "input",
                        "element": {
                            "type": "multi_channels_select",
                            "action_id": "channels",
                            "placeholder": {
                                "type": "plain_text",
                                "text": "type question here..."
                            }
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Question"
                        }
                    },
                    {
                        "type": "input",
                        "element": {
                            "type": "plain_text_input",
                            "action_id": "option_1",
                            "placeholder": {
                                "type": "plain_text",
                                "text": "type option 1 here..."
                            }
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Option 1"
                        }
                    },
                    {
                        "type": "input",
                        "element": {
                            "type": "plain_text_input",
                            "action_id": "option_2",
                            "placeholder": {
                                "type": "plain_text",
                                "text": "type option 2 here..."
                            }
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Option 2"
                        }
                    },
                    {
                        "type": "input",
                        "element": {
                            "type": "plain_text_input",
                            "action_id": "option_3",
                            "placeholder": {
                                "type": "plain_text",
                                "text": "type option 3 here..."
                            }
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Option 3"
                        }
                    },
                    {
                        "type": "input",
                        "element": {
                            "type": "plain_text_input",
                            "action_id": "option_4",
                            "placeholder": {
                                "type": "plain_text",
                                "text": "type option 4 here..."
                            }
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Option 4"
                        }
                    },
                    {
                        "type": "input",
                        "element": {
                            "type": "static_select",
                            "placeholder": {
                                "type": "plain_text",
                                "text": "select the correct option...",
                                "emoji": true
                            },
                            "options": [
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Option 1",
                                        "emoji": true
                                    },
                                    "value": "value-1"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Option 2",
                                        "emoji": true
                                    },
                                    "value": "value-2"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Option 3",
                                        "emoji": true
                                    },
                                    "value": "value-3"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Option 4",
                                        "emoji": true
                                    },
                                    "value": "value-4"
                                }
                            ],
                            "action_id": "static_select-action"
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Correct Option",
                            "emoji": true
                        }
                    }
                ],
                "type": "modal",
                "callback_id": "submit_question"
            }

        })
        console.log(result);
    } 
    catch(error) {
        console.error(error);
    }
});

app.view('submit_question', ({ ack, body, view, context}) => {
    ack();
    const title = view['state']['values']['title_input']['title'];
    console.log("Title: ", title);
    var db = firebase.firestore();
    db.collection("questions").add({
        title: view['state']['values']['title_input']['title'].value
    })
});

app.message(':wave:', async ({ message, say }) => {
    ack();
    console.log(await say(`Hey there, <@${message.user}>`));
});

app.event('app_home_opened', async ({ event, client, context}) => {
    try {
        const result = await client.views.publish({
            user_id: event.user,
            view: {
                type: 'home',
                callback_id: 'home_view',
                blocks: [
                    {
                        "type": "section",
                        "text": {
                          "type": "mrkdwn",
                          "text": "*Welcome to your _App's Home_* :tada:"
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "section",
                        "text": {
                          "type": "mrkdwn",
                          "text": "This button won't do much for now but you can set up a listener for it using the `actions()` method and passing its unique `action_id`. See an example in the `examples` folder within your Bolt app."
                        }
                    },
                    {
                        "type": "actions",
                        "elements": [
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "text": "Click me!"
                                }
                            }
                        ]   
                    }
                ]
            }
        });
        console.log(result);
    }
    catch (error) {
        console.error(error);
    }
});


(async () => {
    await app.start(process.env.PORT || 3000);
    console.log(`Server started on port ${port}`);
})();
