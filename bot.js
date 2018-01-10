var express = require('express');
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var fs = require('fs');

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

var emoji_ranges = [
  '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
  '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
  '\ud83d[\ude80-\udeff]'  // U+1F680 to U+1F6FF
];

var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
  logger.info(message)
  if (message.substring(0,1) == '!') {
    var args = message.substring(1).split(' ');
    var cmd = args[0];
    args = args.splice(1);
    switch(cmd) {
      case 'record':
        if(args.length != 2) {
          bot.sendMessage({
            to: channelID,
            message: '#Invalid number of arguments'
          });
        }
        else {
          var emoji_cmp = new RegExp(emoji_ranges.join('|'), 'g')
          if(args[0].replace(emoji_cmp,'') === ''){
            if(Number.isInteger(parseInt(args[1]))){
              bot.joinVoiceChannel('400151487394873351', function(err, evt){
                if(err) return console.error(err);
                bot.getAudioContext('400151487394873351', function(err, evt){
                  if(err) return console.error(err);
                  fs.createReadStream('hello.mp3').pipe(stream, {end: false});
                });
              });
            }
            else{
              bot.sendMessage({
                to: channelID,
                message: '#The second argument must be an integer'
              });
            }
          }
          else{
            bot.sendMessage({
              to: channelID,
              message: '#The first argument must be an emoji'
            });
          }
        }
        break;
      default:
        bot.sendMessage({
          to: channelID,
          message: '#We did not recognize the command'
        });
    }
  }
  else if(message.substring(0,1) == '#') {
  }
  else {
    bot.sendMessage({
      to: channelID,
      message: '#Play sound if emoji is associated with sound'
    });
  }
});