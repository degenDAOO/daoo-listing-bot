import * as Ably from 'ably';
import { Env, loadConfig } from 'config';
import notifyDiscord from 'lib/discord/notifyDiscordSale';
import logger from 'lib/logger';
import notifyTwitter from 'lib/twitter/notifyTwitter';

const config = loadConfig(process.env as Env);
const { ablyToken } = config;
const options: Ably.Types.ClientOptions = { key: ablyToken };
const client = new Ably.Realtime(options);

export default function startAblyFeedForAction(
  projectChannel: string,
  actionType: string,
  discordChannelId: string
) {
  let channel = client.channels.get(projectChannel);

  client.connection.on('connected', function() {
    logger.log(`Successful connect: ${projectChannel}`);
  });

  channel.subscribe(actionType, function(message) {
    notifyDiscord(discordChannelId, actionType, message.data);
    // not tweeting on this one.
    // notifyTwitter(message.data, actionType);    
  });
}
