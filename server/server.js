const express = require('express');
const app = express();
const port = 5000;
const zip = require("jszip");

app.use(express.static('public'));
app.use(express.json({limit: '50mb'}));

app.get('/message', async (req, res) => {
    await res.send({message: 'Hello World!'});
});

app.get('/hi', async (req, res) => {
    await res.send('hello world!');
})

app.post('/object', async (req, res) => {
    console.log('object: ', req.body);
    await res.sendStatus(200);
})



app.listen(port, () => {
    console.log('listening on port', port);
});