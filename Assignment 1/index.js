const express = require('express')
const app = express()
app.use(express.json());
const gameNames = ["Call Of Duty","GTA V","Fortnite"];
app.get('/api/gameNames', function (req, res) {
   
    res.send(gameNames);
  
})
app.get('/api/gameNames/:index', function (req, res) {
    const {index} = req.params;
    if(!gameNames[index])
      return res.status(400).send("GAME NOT FOUND");
    res.send(gameNames[index]);
  
})
app.put('/api/gameNames/:index', function (req, res) {
    const {index} = req.params;
    if(!gameNames[index])
      return res.status(400).send("GAME NOT FOUND");
    gameNames[index] = req.body.name;
    res.send(gameNames);
  
})
app.post('/api/gameNames', function (req, res) {
    const {index} = req.params;
    gameNames.push(req.body.name);
    res.send(gameNames);
  
})
app.delete('/api/gameNames/:index', function (req, res) {
    const {index} = req.params;
    if(!gameNames[index])
      return res.status(400).send("GAME NOT FOUND");
    gameNames.splice(index,1);
    res.send(gameNames);
  
})

app.listen(3000)