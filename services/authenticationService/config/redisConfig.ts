import { RedisStore } from "connect-redis";
import { createClient } from "redis";

//configure redis client
const optionsObject = {
  host: "127.0.0.1",
  port: 6379,
};
let redisClient = createClient();
redisClient.connect().catch((err) => {
  console.log("An error occured", err);
});

//initialize store
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "TeleSync",
});

export default redisStore;
