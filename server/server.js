const http = require("http");
const app = require("./app");
const sequelize = require("./Database/database");
require("dotenv/config");

const PORT = process.env.PORT;

const server = http.createServer(app);



sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized.");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to synchronize the database:", err);
    process.exit(1);
});