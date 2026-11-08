import { createApp } from "./app";
import { config } from "./config";

createApp().listen(config.port, () => {
  console.log(`API: http://localhost:${config.port}/api`);
});
