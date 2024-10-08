const axios = require("axios");



const moduleConfig = {
  name: "htv", 
  aliases: [],
  author: "Vex_Kshitiz",
  version: "1.0",
  cooldowns: 5,
  role: 0,
  shortDescription: "",
  longDescription: "get watch online url of hentais",
  category: "hanime",
  guide: "{p}htv {name}-{episode}",
};

module.exports = {
  config: moduleConfig,

  onStart: async function ({ api, event, message, args }) {
    const [animeName, episodeNumber] = args.join(" ").split("-").map(item => item.trim());

    if (!animeName) {
      message.reply("Please provide the name of the hanime.");
      return;
    }



      let response;
      if (episodeNumber !== undefined) {
        response = await axios.get(`https://h-tv-kshitiz.vercel.app/hanime?name=${encodeURIComponent(animeName)}&episode=${encodeURIComponent(episodeNumber)}`);
      } else {
        response = await axios.get(`https://h-tv-kshitiz.vercel.app/hanime?name=${encodeURIComponent(animeName)}`);
      }

      if (!response.data.url) {
        message.reply("Sorry, no video URL found for the provided anime.");
        return;
      }

      const videoUrl = response.data.url;

      const shortenerResponse = await axios.get(`https://shortner-sepia.vercel.app/kshitiz?url=${encodeURIComponent(videoUrl)}`);
      const shortenedURL = shortenerResponse.data.shortened;

      if (!shortenedURL) {
        message.reply("Failed to shorten the URL.");
        return;
      }

      if (episodeNumber !== undefined) {
        message.reply(`watch online: ${shortenedURL}`);
      } else {
        message.reply(`watch online: ${shortenedURL}`);
      }
    } catch (error) {
      console.error(error);
      message.reply("An error occurred while processing your request.");
    }
  }
};
