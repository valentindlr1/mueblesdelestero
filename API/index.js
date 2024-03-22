const app = require("./app.js");
const { conn } = require("./db.js");
const port = process.env.PORT || 3001;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  app.listen(port, async () => {
    console.log(`%s listening at ${port}`); // eslint-disable-line no-console
  });
});
