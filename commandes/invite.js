const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client({fetchAllMembers: true});
const figlet = require('figlet');
const colors = require('colors');
const readline = require('readline');
var sleep = require('system-sleep');


function getNow(strType) {
  let strReturn = '';
  switch (strType) {
      case 'date':
          strReturn = new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris", day: "2-digit", month: "2-digit", year: "2-digit" });
          break;
      case 'time':
          strReturn = new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
          break;
      case 'datetime':
          strReturn = new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris", hour12: false, day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).replace(',', '');
          break;
  }
  return strReturn;
}


module.exports.run = async (bot, message, args) => {
  if (message.channel.name != bot.user.id) { 
    return;
} 
console.log(args)
  if(args) {
    if (!message.content.includes('discord.gg/')) {
      message.channel.send('`' + getNow('time') + '`' + ` ${x} Erreur rencontré: Le lien donné n'est pas une invite`)
    } else {
    config.invite = args
    message.channel.send('`' + getNow('time') + '`' + ` ${valid} Changement de l'invite de la pub à ` + '`' + args + '`.')
    }
  } else {
   message.channel.send('`' + getNow('time') + '`' + ` ${x} Votre message ne contient pas d'invitation.`)
  }
}

module.exports.help = {
  name:"invite"
}