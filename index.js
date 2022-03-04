const axios = require("axios");
const jsdom = require("jsdom");
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const config = require("./app.json");
const { JSDOM } = require("jsdom");

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

    try {
      response = await axios.get("http://autoinsult.com/index.php?style=3");
      // console.log(response.data.statusCode);
      if (response.status == 200) {
        webpage = new JSDOM(response.data);
        message.reply(
          webpage.window.document.querySelector("div.insult").textContent
        );
      } else {
        message.reply("Sorry, I couldn't come up with an insult.");
      }
    } catch (error) {
      message.reply("Sorry, I couldn't come up with an insult.");
    }
  }
});

client.login(config.token);
