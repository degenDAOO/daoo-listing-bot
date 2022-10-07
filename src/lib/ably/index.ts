import * as Ably from 'ably';
import { Env, loadConfig } from 'config';
import notifyDiscord from 'lib/discord/notifyDiscordSale';
import logger from 'lib/logger';
import notifyTwitter from 'lib/twitter/notifyTwitter';

const config = loadConfig(process.env as Env);
const { ablyToken, twitter } = config;
const options: Ably.Types.ClientOptions = { key: ablyToken };
const client = new Ably.Realtime(options);

const actionTypesToWatch = ['TRANSACTION'];

export default function startAblyFeedFor(
  projectChannel: string,
  discordChannelId: string
) {
  let channel = client.channels.get(projectChannel);

  client.connection.on('connected', function() {
    logger.log(`Successful connect: ${projectChannel}`);
  });

  channel.subscribe(function(message) {
    let data = JSON.parse(message.data);
    let actionType = data.action_type;
    
    if (actionTypesToWatch.includes(actionType)) {
      notifyDiscord(discordChannelId, actionType, message.data);
      if (twitter.isActive == 'true') {
        notifyTwitter(message.data, actionType);
      }
    }
  });
}