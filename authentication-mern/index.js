const express = require('express');
const app = express();
const cors = require('cors')
const router = require('./routing');

const PORT = process.env.PORT || 5000;
app.use(cors())
app.use(express.json({ extended: false }));
app.use('/',router);

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})