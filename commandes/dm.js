const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client({fetchAllMembers: true});
const con = console.log
const figlet = require('figlet');
const colors = require('colors');
const readline = require('readline');
const sleep = require('system-sleep');
const moment = require('moment')

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
   var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
  return v.toString(16);
  });
}

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


var msg = (`${config.invite}
   **REJOINS LE PREMIER SERVEUR FRANCAIS DISCORD COMMUNAUTAIRE  ** 
   JOIN = NITRO?!
  ` + '\n \n `' + uuidv4() + '`' + `
  `)


  let verif = {
    "true": `Non ${x}`,
    "false": `Oui ${valid}` ,
  }

  
console.log(`[${getNow('time')}]` + `[COMMANDS]`.yellow + ` Utilisation de la commande: ` + `${message.content}`.yellow)

var pub = 0;
let [guildid] = args
let guild = bot.guilds.get(guildid)
  if (!guild) return message.channel.send('`' + getNow('time') + '`' + ` ${x} ID non valide, veuillez reformulé votre demande`)
  var x = config.ms * guild.memberCount
  if(config.ms === '0') {
    x = '200' * guild.memberCount
  }
  message.channel.send('`' + getNow('time') + '`' + ` :e_mail: Publicité envoyé a **${guild.memberCount} membres** sur **${guild.name}** (Millisecondes: ${config.ms} /UUID,Pub les administrateurs: ${verif[config.admin]} )
  
  :clock1: **Temps estimé:** ${moment('2000-01-01 00:00:00').add(moment.duration(x)).format('HH:mm:ss')}
  `)
  console.log(config.ms * guild.memberCount)
  guild.members.forEach(member => {
    sleep(config.ms);
  if(member.user.bot) { 
pub++
console.log(`[${getNow('time')}][LOGS] Erreur rencontré (Cause: BOT): ${member.user.tag} (ID: ${member.user.id}) - Avancement: ${pub}/${guild.memberCount}`.blue)
if(pub === guild.memberCount) { 
  message.channel.send('`' + getNow('time') + '`' + ` ${valid} Publicité terminé a un total de **${guild.memberCount} membres**`)
}
} else if(member.hasPermission("ADMINISTRATOR")) { 
  if(config.admin === 'true') { 
  console.log(`[${getNow('time')}][LOGS] Erreur rencontré (Cause: Administrateur): ${member.user.tag} (ID: ${member.user.id}) - Avancement: ${pub}/${guild.memberCount}`.magenta)
pub++
if(pub === guild.memberCount) { 
  message.channel.send('`' + getNow('time') + '`' + ` ${valid} Publicité terminé a un total de **${guild.memberCount} membres**`)
}
} else {
  member.send(`${msg}`).then(m => { 
  pub++
  console.log(`[${getNow('time')}][LOGS] Message envoyé à: ${member.user.tag} (ID: ${member.user.id}) - Avancement: ${pub}/${guild.memberCount}`.green)   
  if(pub === guild.memberCount) { 
    message.channel.send('`' + getNow('time') + '`' + ` ${valid} Publicité terminé a un total de **${guild.memberCount} membres**`)
  }
});
}
} else {
  member.send(`${msg}`).then(m => { 
    pub++
     console.log(`[${getNow('time')}][LOGS] Message envoyé à: ${member.user.tag} (ID: ${member.user.id}) - Avancement: ${pub}/${guild.memberCount}`.green)   
     if(pub === guild.memberCount) { 
       message.channel.send('`' + getNow('time') + '`' + ` ${valid} Publicité terminé a un total de **${guild.memberCount} membres**`)
     }
    
  }).catch(err => {
    pub++     
    if(pub === guild.memberCount) { 
      message.channel.send('`' + getNow('time') + '`' + ` ${valid} Publicité terminé a un total de **${guild.memberCount} membres**`)
     }
console.log(`[${getNow('time')}][LOGS] Erreur rencontré (Cause: MP CLOSED): ${member.user.tag} (ID: ${member.user.id}) - Avancement: ${pub}/${guild.memberCount}`.red)
  })
}
                  
              });       
              return;
            
}

module.exports.help = {
  name:"dm"
}