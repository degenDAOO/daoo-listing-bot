import * as Ably from 'ably';
import { Env, loadConfig } from 'config';
import notifyDiscord from 'lib/discord/notifyDiscordSale';
import logger from 'lib/logger';
import notifyTwitter from 'lib/twitter/notifyTwitter';

const config = loadConfig(process.env as Env);
const { ablyToken, twitter } = config;
const options: Ably.Types.ClientOptions = { key: ablyToken };
const client = new Ably.Realtime(options);

// const actionTypesToWatch = ['TRANSACTION'];

export default function startAblyFeedFor(
  projectChannel: string,
  discordChannelId: string
) {
  let channel = client.channels.get(projectChannel);

  client.connection.on('connected', function() {
    logger.log(`Successful connect: ${projectChannel}`);
  });

  channel.subscribe('TRANSACTION', function(message) {    
    notifyDiscord(discordChannelId, 'TRANSACTION', message.data);
    if (twitter.isActive == 'true') {
      notifyTwitter(message.data, 'TRANSACTION');
    }
  });
}