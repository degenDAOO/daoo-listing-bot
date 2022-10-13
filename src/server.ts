import dotenv from "dotenv";
import {Env, loadConfig} from "config";
import logger from "lib/logger";
import startAblyFeedForAction from "lib/ably";

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const config = loadConfig(process.env as Env);
const {actions} = config;

if (!actions.length) {
  logger.warn('No actions loaded');
}

// if (bannedTokens.length) {
//   logger.log(`Banned Tokens: ${bannedTokens}`);
// }

// subscriptions.map((s) => {
//   startAblyFeedFor(s.projectChannel, s.discordChannelId);
// });

actions.map((a) => {
  logger.log(`actions project: ${a.projectId}`);
  logger.log(`actions action: ${a.actions}`);
  logger.log(`actions discordId: ${a.discordChannelId}`);
  startAblyFeedForAction(a.projectId, a.actions, a.discordChannelId);
})