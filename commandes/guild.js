const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client({fetchAllMembers: true});
const figlet = require('figlet');
const colors = require('colors');
const readline = require('readline');
const wb = new Discord.WebhookClient(config.webhookid, config.webhooktoken);
module.exports.run = async (bot, message, args) => {
  if (message.channel.name != bot.user.id) { 
    return;
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

wb.send('`' + getNow('time') + '`' + ' 📝 **Nouvelle entrée dans la console:** ```' + `[COMMANDS] Utilisation de la commande ${message.content}` + '```')
console.log(`[${getNow('time')}]` + `[COMMANDS]`.yellow + ` Utilisation de la commande: ` + `${message.content}`.yellow)

let client = {
  "true": "🤖 Robot",
  "false": "👥 Utilisateur",
}
console.log(config.test)
guildnumber = 1;
const embed = new Discord.RichEmbed()
.setAuthor(`${bot.user.tag} • Apo`,bot.user.displayAvatarURL)
.setDescription(`**LISTE DES GUILDES:** \n` + 
bot.guilds.map(p => 
`**${guildnumber++}.** ` +  '`' + p.name  + '`\n' + 
`**ID:** ` + '`' + p.id  + '`\n' + 
`**Nombre de membre:** ` + '`' + p.memberCount  + ' membres`\n') + `

**INFORMATION A PROPOS DU BOT:**

**TAG:** ` + '`' + `${bot.user.tag}` + '`' + `
**ID:** ` + '`' + `${bot.user.username}` + '`' + `
**Statut:** ` + '`' + client[bot.user.bot] + '`' + `
**Date de création:** ` + '`' + `${bot.user.createdAt.toUTCString().substr(0, 16)}` + '`' + `
**Compteur:** ` + '`' + `${bot.guilds.size} guildes - ${bot.users.size} membres` + '`' + `

**Lien d'invitation:** [Lien](https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=0)
`)
.setFooter(`Commande réclamé par ${message.author.tag} (${message.author.id})`)
message.channel.send(embed)
}
    




module.exports.help = {
  name:"guild"
}