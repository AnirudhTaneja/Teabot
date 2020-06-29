const Twit = require('twit');
var config = require('./config');

const T = new Twit({
  consumer_key: config.consumer_key, 
  consumer_secret: config.consumer_secret,
  access_token: config.access_token, 
  access_token_secret:  config.access_token_secret 
});

const stream = T.stream('statuses/filter', {track: 'technology', track: 'tech', language: 'en'});
//var streamUser = T.stream ('user'); 
var streamUser = T.stream('statuses/filter', { track: '@Human_Gospel' });
//var streamFollow = T.stream('statuses/filter', {follow: '@Human_Gospel'});
//stream.on('follow', followed);
 streamUser.on('tweet', tweetEvent);
 //streamFollow.on('follow', followed);

 stream.on('tweet', tweet => {
    // retweet
   T.post('statuses/retweet/:id', {id: tweet.id_str}, responseCallback);
   // like
   T.post('favorites/create', {id: tweet.id_str}, responseCallback);
 });


function responseCallback (err, data, response) {
    console.log(err);
   }

 function followed(event){
       var name = event.source.name;
       var screenName = event.source.screen_name;
       console.log('I was folloed by : ' + name +  ' ' + screenName);
      // T.post('thanks for the follow ' + screenName)
       tweetStatus('@' + screenName + ' Thanks for the follow! ' + name); 
   }
   


function tweetStatus(message){
       var tweet= {
           status: message
       }
   
    T.post('statuses/update', tweet, tweeted);

    function tweeted(err,data,response){
        if (err) {
            console.log("Something went wrong!");
            console.log(err);
            console.log();
        } else {
            console.log("Success!, post has been tweeted!")
        };
    }
}

 function tweetEvent(eventMsg) {

        // var fs = require('fs');
        // var json = JSON.stringify(eventMsg);
        // fs.writeFile('writeMe.json', json, function(err, result) {
        //     if(err) console.log('error', err);
        // });

        var replyTo = eventMsg.in_reply_to_screen_name;
        var text = eventMsg.text;
        var from = eventMsg.user.screen_name;

        console.log(replyTo + ' ' + from);
        console.log(text);
        console.log();
        if (replyTo == 'Human_Gospel'){
            var newTweet = ('@' + from + " Howdy! " + '@'+ from + " #LetsDoWonders " + RandomNumberGen());
            tweetStatus(newTweet);
        }
    }

function RandomNumberGen(){
    var randomNumber = Math.floor(Math.random()*100);
    return randomNumber;
}



  
