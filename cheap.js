/*
This script uses the discord.js library to connect to Discord and listens for the !upland-cheapest command. When the command is received, the script sends a GraphQL query to the Upland API to retrieve the 10 cheapest properties for sale, sorted by price in ascending order. The script then formats the results into a message and sends it back to the Discord channel.

To use this script, you will need to replace 'your-discord-bot-token' with your own Discord bot token. You will also need to install the discord.js and node-fetch libraries by running npm install discord.js node-fetch in your terminal.
*/

const Discord = require('discord.js');
const fetch = require('node-fetch');

const client = new Discord.Client();
const uplandApiUrl = 'https://api.upland.me/graphql';

client.once('ready', () => {
  console.log('Connected to Discord!');
});

client.on('message', async (message) => {
  if (message.content === '!upland-cheapest') {
    try {
      const query = `
        query {
          properties(first: 10, orderBy: { direction: ASC, field: PRICE }) {
            edges {
              node {
                id
                name
                city {
                  name
                }
                price
              }
            }
          }
        }
      `;

      const response = await fetch(uplandApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      const properties = data.data.properties.edges.map((edge) => edge.node);
      const messageText = properties
        .map(
          (property, index) =>
            `${index + 1}. ${property.name} (${property.city.name}): ${property.price} UPX`
        )
        .join('\n');

      message.channel.send(`Here are the 10 cheapest properties for sale on Upland:\n${messageText}`);
    } catch (error) {
      console.error(error);
      message.channel.send('An error occurred while retrieving the cheapest properties.');
    }
  }
});

client.login('your-discord-bot-token');
