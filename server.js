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

app.get('/movimentiGiorno', (req, res) => {
  var sql = "SELECT * FROM ecofab\n" +
    "WHERE datetime(data/1000, 'unixepoch', 'localtime') >= date('now')\n" +
    "AND datetime(data/1000, 'unixepoch', 'localtime') < date('now', '+1 day');\n"
  db.all(sql, (err, result) => {
    res.json(result)
  })
})


app.get('/movimentiSettimana', (req, res) => {
  var sql = "SELECT * FROM ecofab\n" +
    "WHERE datetime(data/1000, 'unixepoch', 'localtime') >= date('now', 'localtime', 'weekday 0', '-6 days')\n" +
    "AND datetime(data/1000, 'unixepoch', 'localtime') < date('now', '+1 day', 'localtime', 'weekday 0', '+1 day');\n"
  db.all(sql, (err, result) => {
    res.json(result)
  })
})

app.get('/movimentiMese', (req, res) => {
  var sql = "SELECT * FROM ecofab\n" +
    "WHERE datetime(data/1000, 'unixepoch', 'localtime') >= date('now', 'localtime', 'start of month')\n" +
    "AND datetime(data/1000, 'unixepoch', 'localtime') < date('now', 'localtime', 'start of month', '+1 month');\n"
  db.all(sql, (err, result) => {
    res.json(result)
  })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
