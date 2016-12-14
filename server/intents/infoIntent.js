'use strict';

const request = require('superagent');

module.exports.process = function process(intentData, cb) {
    if(intentData.intent[0].value != 'info') {
        return cb(new Error(`Expected suggest intent, got ${intentData.intent[0].value}`));
    }
/*
    if(!intentData.location) {
        return cb(new Error(`Missing location in time intent`));
    }
*/
    var movieName = intentData.movie[0].value;
    // http://www.omdbapi.com/?t=inception&y=&plot=short&r=json
    var urlGet = "http://www.omdbapi.com/?t="+ movieName +"&y=&plot=short&r=json";
      request.get(``, (err, res) => {
        if(err || res.statusCode != 200 || !res.body.result) {
            //console.log(err);
            //console.log(res.body);
           return cb(false, `Problem getting information for ${movieName}`);
        }
        console.log(res.body.Title);
        if(res.body.Response == "True") {
            return cb(false, movieName);
        } else {
            return cb(false, `Can't find information for ${movieName}`);
        }
    });
  
    //console.log("genre");
    //return cb(false,"Sure, your genre is " + genre);
    /*
    const location = intentData.location[0].value;

    request.get(`http://localhost:4010/service/${location}`, (err, res) => {
        if(err || res.statusCode != 200 || !res.body.result) {
            console.log(err);
            console.log(res.body);

            return cb(false, `I had a problem find out the time in ${location}`);
        }

        return cb(false, `In ${location}, it is now ${res.body.result}`);
    });
*/
}

/*
https://slack-project.slack.com/messages/@mediabot/team/mediabot/
*/