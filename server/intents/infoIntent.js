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
    // encodeURI
    // decodeURI
    // what is the incpetion movie?
    // http://www.omdbapi.com/?t=inception&y=&plot=short&r=json
    var urlGet = "http://www.omdbapi.com/?t="+ encodeURI(movieName) +"&y=&plot=short&r=json";
      request.get(urlGet, (err, res) => {
          console.log(res.statusCode);
        if(err || res.statusCode != 200) {
            //console.log(err);
            //console.log(res.body);
           //return cb(false, `Sorry, It seems there is some problem in the network connection.`);
        }
        console.log("Response" + res.body.Response);
        if(res.body.Response == "True") {
            var movi = res.body;
            var info = `${movi.Title} is ${movi.Year}, ${movi.Genre} movie which was relased in ${movi.Released}. It is written by ${movi.Writer} and directed by ${movi.Director}. Following actors are in the movie; ${movi.Actors}. It was relased in ${movi.Language}. The plot of the movie is : ${movi.Plot}`;

            return cb(false, info);
        } else {
            return cb(false, `Sorry, I can not find information about what you asked.`);
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