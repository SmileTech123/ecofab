const express = require('express')
const app = express()
const port = 4000
const sqlite3 = require("sqlite3");
const cors = require("cors");
var db = new sqlite3.Database("ecofab.db", (err, room) => {
  if (err) {
    console.log("errore");
  }
});
var bodyParser = require('body-parser')
const path = require("path");
const distDir = path.join(__dirname, 'dist/eco-fab/browser');
app.use(bodyParser.json())
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static(distDir));
app.post('/aggiungiSpesa', (req, res) => {
  let body = req.body;
  db.run("INSERT INTO ecofab VALUES(NULL,?,?,?,?)",[body.data, body.nome,body.categoria,body.importo]);
})

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
    "AND datetime(data/1000, 'unixepoch', 'localtime') < date('now', '+1 day') ORDER BY data DESC;\n "
  db.all(sql, (err, result) => {
    res.json(result)
  })
})


app.get('/movimentiSettimana', (req, res) => {
  var sql = "SELECT * FROM ecofab\n" +
    "WHERE datetime(data/1000, 'unixepoch', 'localtime') >= date('now', 'localtime', 'weekday 0', '-6 days')\n" +
    "AND datetime(data/1000, 'unixepoch', 'localtime') < date('now', '+1 day', 'localtime', 'weekday 0', '+1 day') ORDER BY data DESC;\n"
  db.all(sql, (err, result) => {
    res.json(result)
  })
})

app.get('/movimentiMese', (req, res) => {
  var sql = "SELECT * FROM ecofab\n" +
    "WHERE datetime(data/1000, 'unixepoch', 'localtime') >= date('now', 'localtime', 'start of month')\n" +
    "AND datetime(data/1000, 'unixepoch', 'localtime') < date('now', 'localtime', 'start of month', '+1 month') ORDER BY data DESC;\n"
  db.all(sql, (err, result) => {
    res.json(result)
  })
})


app.get("/allExistingYears", (req, res) => {
  var sql = "SELECT DISTINCT strftime('%Y', datetime(data / 1000, 'unixepoch')) AS anno\n" +
    "FROM ecofab\n" +
    "ORDER BY anno;" ;
  db.all(sql, (err, result) => {
    res.json(result)
  })
})

app.get("/allExistingMonthByYears", (req, res) => {
  var year = req.query.year;
  var sql="SELECT DISTINCT \n" +
    "    CASE strftime('%m', datetime(data / 1000, 'unixepoch'))\n" +
    "        WHEN '01' THEN 'Gennaio'\n" +
    "        WHEN '02' THEN 'Febbraio'\n" +
    "        WHEN '03' THEN 'Marzo'\n" +
    "        WHEN '04' THEN 'Aprile'\n" +
    "        WHEN '05' THEN 'Maggio'\n" +
    "        WHEN '06' THEN 'Giugno'\n" +
    "        WHEN '07' THEN 'Luglio'\n" +
    "        WHEN '08' THEN 'Agosto'\n" +
    "        WHEN '09' THEN 'Settembre'\n" +
    "        WHEN '10' THEN 'Ottobre'\n" +
    "        WHEN '11' THEN 'Novembre'\n" +
    "        WHEN '12' THEN 'Dicembre'\n" +
    "    END AS mese\n" +
    "FROM ecofab\n" +
    "WHERE strftime('%Y', datetime(data / 1000, 'unixepoch')) = '"+year+"'" +
    "ORDER BY mese;"
  db.all(sql, (err, result) => {
    res.json(result)
  })
})

app.get("/confrontaAnni", (req, res) => {
  let anni = req.query.anni;
  let anniarray = anni.split(",")
  let stringTosend=""
  let index = 1
  anniarray.forEach(anni => {
    if(anniarray.length ===index){
      stringTosend= stringTosend+"'"+anni+"'"
    }else{
      stringTosend= stringTosend+"'"+anni+"',"
      index++
    }

  })

  var sql = "SELECT \n" +
    "    strftime('%Y', datetime(data / 1000, 'unixepoch')) AS anno, \n" +
    "    SUM(CASE WHEN importo < 0 THEN importo ELSE 0 END) AS totale_negativo,\n" +
    "    SUM(CASE WHEN importo > 0 THEN importo ELSE 0 END) AS totale_positivo\n" +
    "FROM ecofab\n" +
    "WHERE \n" +
    "    strftime('%Y', datetime(data / 1000, 'unixepoch')) IN ("+stringTosend+")\n" +
    "GROUP BY anno\n" +
    "ORDER BY anno;\n"
  db.all(sql, (err, result) => {
    res.json(result)
  })
})

app.get("/confrontaMesi", (req, res) => {
  let anno = req.query.anno;
  let mesi = req.query.mesi;
  let mesiarray = mesi.split(",")
  let stringTosend=""
  let index = 1
  mesiarray.forEach(mesi => {
    if(mesiarray.length ===index){
      stringTosend= stringTosend+"'"+mesi+"'"
    }else{
      stringTosend= stringTosend+"'"+mesi+"',"
      index++
    }

  })

  var sql = "SELECT\n" +
    "strftime('%m', datetime(data / 1000, 'unixepoch')) AS mese,\n" +
    "  SUM(CASE WHEN importo < 0 THEN importo ELSE 0 END) AS totale_negativo,\n" +
    "  SUM(CASE WHEN importo > 0 THEN importo ELSE 0 END) AS totale_positivo\n" +
    "FROM ecofab\n" +
    "WHERE\n" +
    "strftime('%Y', datetime(data / 1000, 'unixepoch')) = '"+anno+"'\n" +
    "AND CAST(strftime('%m', datetime(data / 1000, 'unixepoch')) AS INTEGER) IN (1, 2, 3) -- Passa qui i mesi desiderati\n" +
    "GROUP BY mese\n" +
    "ORDER BY mese;\n"
  db.all(sql, (err, result) => {
    res.json(result)
  })
})

app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
