'use strict'

const slackClient = require("../server/slackClient");
const service = require("../server/service");
const http = require("http");
const server = http.createServer(service);

const witToken = 'DBR6VXBKJUQOYDPIR34YEQRLRXIBQ5MN'
const witClient = require('../server/witClient')(witToken);

const slackToken = 'xoxb-112448154594-nlr21tZCB9kd8efA13LWo9nH';
const slackLogLevel = 'verbose';

const rtm = slackClient.init(slackToken, slackLogLevel, witClient);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(4000));

server.on('listening', function() {
    console.log(`Mediabot is listening on ${server.address().port} in ${service.get('env')} mode. `);
});

/*
https://slack-project.slack.com/messages/@mediabot/
https://wit.ai/bhaveshgangani/mediabot/settings
https://api.slack.com/apps/A39NPLDDF
*/