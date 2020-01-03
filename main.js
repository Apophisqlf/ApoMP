const 
      config = require("./commandes/config.json");
      Discord = require("discord.js");
      bot = new Discord.Client({fetchAllMembers: true});
      fs = require("fs");
      con = console.log
      bot.commands = new Discord.Collection();
      figlet = require('figlet');
      colors = require('colors');
      readline = require('readline');
      console.clear();
      con(`
     **     *******    *******         ****     **** ******* 
    ****   /**////**  **/////**       /**/**   **/**/**////**
   **//**  /**   /** **     //**      /**//** ** /**/**   /**
  **  //** /******* /**      /**      /** //***  /**/******* 
 **********/**////  /**      /**      /**  //*   /**/**////  
/**//////**/**      //**     **       /**   /    /**/**      
/**     /**/**       //*******        /**        /**/**      
//      // //         ///////         //         // //       v5
      `.red)
bot.login(config.token)


fs.readdir("./commandes/", (err, files) => {
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    con(`[ERREUR]`.red + ` Aucune commande trouvé..`);
    return;
  }
  jsfile.forEach((f, i) =>{
    con(`[VALIDE]`.green + ` Chargement du module: ` + `${f}`.green);
    let props = require(`./commandes/${f}`);
    bot.commands.set(props.help.name, props);
  });
});

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

bot.on("ready", () => {
  partner = bot.emojis.find(emoji => emoji.name === "apo1");
  star = bot.emojis.find(emoji => emoji.name === "apo2");
  x = bot.emojis.find(emoji => emoji.name === "apo3");
  valid = bot.emojis.find(emoji => emoji.name === "apo4");
  twitter = bot.emojis.find(emoji => emoji.name === "apo5");
con(`
Username`.green + ` ${bot.user.username} ` + ` 
Discriminator:`.green + ` ${bot.user.discriminator} `  + `
Tag:`.green  + ` ${bot.user.tag} ` + ` 
ID:`.green + ` ${bot.user.id} ` +  `
Date de création:`.green + ` ${bot.user.createdAt} ` + `

Nombre de guildes:`.green + ` ${bot.guilds.size} ` + ` 
Nombre de membres:`.green + ` ${bot.users.size} ` + `

Liste des guildes:`.green + ` 
${bot.guilds.map(g => g.name)}
`) 
let mpstreaming = 0;
    setInterval(function() {
        if (mpstreaming === 0) {
          bot.user.setActivity(`${bot.guilds.size} guildes • Apo`, {
                type: "Streaming",
                url: 'https://www.twitch.tv/ninja'
            });
            mpstreaming = 1;
        } else if (mpstreaming === 1) {
          bot.user.setActivity(`${bot.users.size} membres • Apo`, {
                type: "Streaming",
                url: 'https://www.twitch.tv/ninja'
            });
            mpstreaming = 2;
        } else if (mpstreaming === 2) {
          bot.user.setActivity(`${bot.user.tag} • Apo`, {
                type: "Streaming",
                url: 'https://www.twitch.tv/ninja'
            });
            mpstreaming = 3;
        } else if (mpstreaming === 3) { 
          bot.user.setActivity(`Follow @apoptn on twitter • Apo`, {
                type: "Streaming",
                url: 'https://www.twitch.tv/ninja'
            });
            mpstreaming = 0;
        }
    }, 10 * 1000)
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    if(message.content.startsWith(prefix)){
        let commandfile = bot.commands.get(cmd.slice(prefix.length));
        if(commandfile) commandfile.run(bot,message,args);
    }
        else{

        }
  });
