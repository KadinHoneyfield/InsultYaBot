const axios = require('axios');
const jsdom = require("jsdom");
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const config = require("./config.json");
const { JSDOM } = require('jsdom');

client.on("ready", () => {
  console.log(`Logged in...`);
});

// client.on("message", (msg) => {
//   msg.reply("ding");
// });

const prefix = `!`;
client.on("message", async function (message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  // get channel id and command out of message
  const channelId = message.channel.id;
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();
  if (command === "insult") {
    // after successfully create the play space, response to the user that call this command.
    console.log(new URL("/index.php?style=3/", "http://autoinsult.datahamster.com/"))
    response = await axios.get('http://autoinsult.datahamster.com/index.php?style=3/')
    if (response.status = 200) {
      webpage = new JSDOM(response.data)
      message.reply(webpage.window.document.querySelector("div.insult").textContent);
    }
  }
});

client.login(config.token);
