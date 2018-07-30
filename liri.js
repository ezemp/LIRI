require("dotenv").config();
var twitter = require("twitter")
var Spotify = require('node-spotify-api')
var keys = require("./keys")
var request = require("request")
var fs = require('fs')
var spotify = new Spotify(keys.spotify);

var myTweets = function(){
    var client = new twitter(keys.twitter)
    var useName = {
        screen_name: "ezemp93"
    };
    client.get("statuses/user_timeline", useName, function(error, tweets, response){
        if(!error){
            for(var i = 0; i < tweets.length; i++){
                console.log(tweets[i].created_at+"\n");
                console.log(tweets[i].text)
            }
        }
})}
var getArtistName = function(artist){
    return artist.name;
}
var spotifyThisSong = function(songName){
    if(songName === undefined){
        songName = "Beat It";
    }
    spotify.search(
        {
            type:"track",
            query: songName
        },
        function(err,data){
            if (err){
                console.log("An Error has Occured: " + err);
                return;
            }
            var songs = data.tracks.items;
            for(var i =  0 ; i < songs.length; i++){
                console.log(i)
                console.log("Artist: " + songs[i].artists.map(artistName))
                console.log("Song Name: " + songs[i].name);
                console.log("Preview Link: " + songs[i].preview_url);
                console.log("Album: " + songs[i].album.name);
            }
        }
    )
}

var movieThis = function(movieName){
    if(movieName === undefined){
        movieName = "The Godfather";
    }
    var qurl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";
    request(qurl, function(error, response, body){
        var json = JSON.parse(body)
        console.log("Title: " + json.Title)
        console.log("Year: "+ json.Year)
        console.log("IMDB Rating: " + json.imdbRating)
        console.log("Rotton Tomatoes Rating: " + json.Ratings[1].Value)
        console.log("Plot: " + json.Plot)
        console.log("Actors: " + json.Actors)
    })
}

var doWhatItSays = function(){
    fs.readFile("random.txt", "utf8", function(error, data){
        console.log(data);
        var dataArr = data.split(",");
        if (dataArr.length === 2){
            run(dataArr[0], dataArr[1]);
        } else if (dataArr.length === 1){
            run(dataArr[0]);
        }
    })
}

var run = function(command, input){
    switch(command){
        case "my-tweets":
        myTweets()
        break;

        case "spotify-this-song":
        spotifyThisSong()
        break;

        case "movie-this":
        movieThis(input);
        break;

        default:
        console.log("Invalid Inputs!")
    }
}
var execute = function(argOne, argTwo){
    run(argOne, argTwo);
}
execute(process.argv[2], process.argv[3])