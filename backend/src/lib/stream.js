import { StreamChat } from "stream-chat";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;
if (!apiKey || !apiSecret) {
  throw new Error("Stream API key and secret are required");
}
export const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const createStreamUser = async (user) => {
  try {
    await streamClient.upsertUsers([user]);
    return user;
  } catch (error) {
    console.error("Error creating/updating Stream user:", error);
  }
};

export const generateStreamToken = (userId) => {
  try {
    return streamClient.createToken(userId.toString());
  } catch (error) {
    console.error("Error generating Stream token:", error);
    return null;
  }
};
