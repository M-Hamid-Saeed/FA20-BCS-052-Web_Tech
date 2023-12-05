const express = require('express')
const app = express()
const gameNames = ["Call Of Duty","GTA V","Fortnite"];
app.get('/api/gameNames/:index', function (req, res) {
    const {index} = req.params;
    res.send(gameNames[index]);
  
})

app.listen(3000)