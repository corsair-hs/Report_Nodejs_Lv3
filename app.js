const express = require('express');
const app = express();
const PORT = 3000;

const postsRouter = require('./routes/posts.router.js');

app.use(express.json());
app.use('/', [postsRouter]);

app.listen(PORT, () => {
  console.log(`Server listen ${PORT}`)
});