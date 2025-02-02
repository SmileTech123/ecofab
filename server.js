const express = require('express')
const app = express()
const port = 3000
const sqlite3 = require("sqlite3");
var db = new sqlite3.Database("ecofab.db", (err, room) => {
  if (err) {
    console.log("errore");
  }
});
app.get('/saldo', (req, res) => {
  var sql = "SELECT SUM(importo)\n" +
    " AS saldo \n" +
    "FROM ecofab;"
  db.get(sql, (err, result) => {
    res.json(result)
  })
})

app.get('/movimenti', (req, res) => {
  var sql = "SELECT * FROM ecofab"
  db.all(sql, (err, result) => {
    res.json(result)
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
