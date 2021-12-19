import { Message, MessageEmbed } from 'discord.js';
import dotenv from 'dotenv';
import moment from 'moment';
const axios = require('axios').default;

dotenv.config();
const api = process.env.OPEN_WEATHER;
const url = `https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=${api}&units=imperial`;

export default {
  callback: async (message: Message, ...args: string[]) => {
    console.log(args);

    const city = args.join(' ');
    if (!city) {
      message.reply('Please give me a city name.');
      return;
    }
    const query = url.replace('Chicago', city);

    let response;
    try {
      response = await axios.get(`${query}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      message.reply('Sorry, I cannot get that information right now.');
      return;
    }
    const data = response.data;
    const temp = data.main.temp.toFixed(0);
    const low = data.main.temp_min.toFixed(0);
    const hi = data.main.temp_max.toFixed(0);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    let sunrise = data.sys.sunrise;
    let sunset = data.sys.sunset;
    const tz = data.timezone;
    sunset = moment
      .unix(sunset + tz)
      .utc()
      .format('h:mm a');
    sunrise = moment
      .unix(sunrise + tz)
      .utc()
      .format('h:mm a');
    // http://openweathermap.org/img/wn/10d@2x.png

    const exampleEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`Current Weather in ${data.name} ${data.sys.country}`)
      .setURL('https://discord.js.org/')
      .setAuthor('Alba Maldonado')
      .setDescription(`${temp}°F and ${description}`)
      .setThumbnail(`http://openweathermap.org/img/wn/${icon}@2x.png`)

      .addField('Low', `${low}°F`, true)
      .addField('High', `${hi}°F`, true)
      .addField('\u200B', '\u200B', false)
      .addField('Sunrise', `${sunrise}`, true)
      .addField('Sunset', `${sunset}`, true);

    message.reply({ embeds: [exampleEmbed] });
  },
};
