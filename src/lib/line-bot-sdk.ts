import { messagingApi } from "@line/bot-sdk";

const config = {
  channelAccessToken: process.env
    .LINE_MESSAGING_API_CHANNEL_ACCESS_TOKEN as string,
  channelSecret: process.env.LINE_MESSAGING_API_CHANNEL_SECRET as string,
};

const lineMessagingApiClient = new messagingApi.MessagingApiClient(config);

export default lineMessagingApiClient;
