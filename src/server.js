import "dotenv/config";
import app from "./app.js";
import config from "./config/index.js";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
