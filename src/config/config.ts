import logger from "lib/logger";

export interface ProjectActions {
  projectId: string;
  actions: string;
  discordChannelId: string;
}

interface TwitterConfig {
  isActive: string;
  appKey: string;
  appSecret: string;
  accessToken: string;
  accessSecret: string;
}

export interface Config {
  twitter: TwitterConfig;
  discordBotToken: string;
  queueConcurrency: number;
  actions: ProjectActions[];
  ablyToken: string;
  hsToken: string;
  bannedTokens: Array<String>;
}

export type Env = { [key: string]: string };

export interface MutableConfig extends Config {
  setActions(actions: ProjectActions[]): Promise<void>;

  addActions(action: ProjectActions): Promise<void>;
}

function loadActions(env: Env): ProjectActions[] {
  if (!env.SUBSCRIPTION_PROJECT_ID || !env.SUBSCRIPTION_DISCORD_CHANNEL_ID) {
    return [];
  }
  const project_id = env.SUBSCRIPTION_PROJECT_ID;
  const discordChannels = env.SUBSCRIPTION_DISCORD_CHANNEL_ID.split(",");
  const action_types = env.SUBSCRIPTION_ACTIONS.split(",");

  const watch: ProjectActions[] = [];

  action_types.forEach((action, idx) => {
    const channel = discordChannels[idx] || discordChannels[0];
    if (!channel) {
      return;
    }
    watch.push({
      projectId: project_id,
      actions: action,
      discordChannelId: channel
    })

  })

  return watch;

}

export function loadConfig(env: Env): MutableConfig {
  const config: Config = {
    twitter: {
      isActive: env.TWITTER_ACTIVE || "false",
      appKey: env.TWITTER_API_KEY || "",
      appSecret: env.TWITTER_API_KEY_SECRET || "",
      accessToken: env.TWITTER_ACCESS_TOKEN || "",
      accessSecret: env.TWITTER_ACCESS_TOKEN_SECRET || "",
    },
    discordBotToken: env.DISCORD_BOT_TOKEN || "",
    queueConcurrency: parseInt(env.QUEUE_CONCURRENCY || "2", 10),
    ablyToken: env.ABLY_TOKEN,
    actions: loadActions(env),
    hsToken: env.HYPERSPACE_API_TOKEN,
    bannedTokens: env.BANNED_TOKENS.split(","),
  };

  return {
    ...config,
    async setActions(actions: ProjectActions[]): Promise<void> {
      this.actions = actions;
    },
    async addActions(action: ProjectActions): Promise<void> {
      this.actions.push(action);
    },
  };
}
