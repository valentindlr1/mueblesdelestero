const app = require('./app.js')
const { conn } = require('./db.js')
const port = process.env.PORT || 3001
// const { saveDogs,
//   saveUsers,
//   savePost,
//   saveArticles,
//   saveOpinions,
//   saveReferences,
// } = require('./src/handlers/saveData.js')

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  app.listen(port, async () => {
//   await saveDogs(),
//   saveUsers(),
//   saveArticles(),
//   savePost(),
//   saveOpinions(),
//   saveReferences()
  console.log(`%s listening at ${port}`); // eslint-disable-line no-console
  });
});