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
const pdf = require("pdf-creator-node");
var NodeGoogleDrive = require("node-google-drive");
var bodyParser = require('body-parser')
const fs = require('fs');
const path = require("path");
const distDir = path.join(__dirname, 'dist/eco-fab/browser');
const YOUR_ROOT_FOLDER = "1D5SaQBg4Nfw3zbzaoUiabGavM49iqj42",
  PATH_TO_CREDENTIALS = path.resolve(`${__dirname}/credential.json`);


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

async function WriteDb() {
  const creds_service_user = require(PATH_TO_CREDENTIALS);

  const googleDriveInstance = new NodeGoogleDrive({
    ROOT_FOLDER: YOUR_ROOT_FOLDER,
  });

  let gdrive = await googleDriveInstance.useServiceAccountAuth(
    creds_service_user
  );
  var date = new Date();
  var dateFormatted =
    ("0" + date.getDate()).substr(-2) +
    "-" +
    ("0" + (date.getMonth()+1)) +
    "-" +
    date.getFullYear();
  googleDriveInstance.writeFile(
    "ecofab.db",
    YOUR_ROOT_FOLDER,
    "ecofab" + dateFormatted + ".db",
    "[*/*]"
  );
}

setInterval(() => {
  WriteDb();
}, 86400000);

app.get("/database", function (req, res) {
  const file = `${__dirname}/ecofab.db`;
  res.download(file); // Set disposition and send it.
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
    "WHERE datetime(data/1000, 'unixepoch', 'localtime') >= date('now', 'localtime')\n" +
    "AND datetime(data/1000, 'unixepoch', 'localtime') < date('now', 'localtime', '+1 day') ORDER BY data DESC;\n "
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

app.get("/movimentiByGiorno", (req, res) => {
  var dataInizio = req.query.dataInizio;
  var dataFine = req.query.dataFine;
  var sql = "SELECT * FROM ecofab\n" +
    "  WHERE data BETWEEN "+dataInizio+" AND "+dataFine+";"
  db.all(sql, (err, result) => {
    res.json(result)
  })


})



app.get("/allExistingYears", (req, res) => {
  var sql = "SELECT DISTINCT strftime('%Y', datetime(data / 1000, 'unixepoch', 'localtime')) AS anno\n" +
    "FROM ecofab\n" +
    "ORDER BY anno;" ;
  db.all(sql, (err, result) => {
    res.json(result)
  })
})

app.get("/allExistingMonthByYears", (req, res) => {
  var year = req.query.year;
  var sql="SELECT DISTINCT \n" +
    "    CASE strftime('%m', datetime(data / 1000, 'unixepoch', 'localtime'))\n" +
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
    "WHERE strftime('%Y', datetime(data / 1000, 'unixepoch', 'localtime')) = '"+year+"'" +
    "ORDER BY mese;"
  console.log(sql)
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
    "    strftime('%Y', datetime(data / 1000, 'unixepoch', 'localtime')) AS anno, \n" +
    "    SUM(CASE WHEN importo < 0 THEN importo ELSE 0 END) AS totale_negativo,\n" +
    "    SUM(CASE WHEN importo > 0 THEN importo ELSE 0 END) AS totale_positivo\n" +
    "FROM ecofab\n" +
    "WHERE \n" +
    "    strftime('%Y', datetime(data / 1000, 'unixepoch', 'localtime')) IN ("+stringTosend+")\n" +
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
    "strftime('%m', datetime(data / 1000, 'unixepoch', 'localtime')) AS mese,\n" +
    "  SUM(CASE WHEN importo < 0 THEN importo ELSE 0 END) AS totale_negativo,\n" +
    "  SUM(CASE WHEN importo > 0 THEN importo ELSE 0 END) AS totale_positivo\n" +
    "FROM ecofab\n" +
    "WHERE\n" +
    "strftime('%Y', datetime(data / 1000, 'unixepoch', 'localtime')) = '"+anno+"'\n" +
    "AND CAST(strftime('%m', datetime(data / 1000, 'unixepoch', 'localtime')) AS INTEGER) IN ("+stringTosend+") -- Passa qui i mesi desiderati\n" +
    "GROUP BY mese\n" +
    "ORDER BY mese;\n"
  db.all(sql, (err, result) => {
    res.json(result)
  })
})

app.get("/eliminaMovimento", (req, res) => {
  var id = req.query.id;
  var sql = "DELETE FROM ecofab WHERE id=" +id
  db.run(sql, (err, result) => {
    res.json(result)
  })
})
app.post("/modificaMovimento", (req, res) => {
  let body = req.body;
  let sql ="UPDATE ecofab\n" +
    "SET data = "+body.data+", nome = '"+body.nome+"', categoria = '"+body.categoria+"',importo = "+body.importo+"\n" +
    "WHERE id="+body.id+";"
  console.log(sql)
  db.run(sql, (err, result) => {
    res.json(result)
    console.log(result,err)
  })
})

app.post("/report", (req, res) => {
  let body = req.body;
  var sql = "SELECT\n" +
    "*\n" +
    "FROM ecofab\n" +
    "WHERE\n" +
    "strftime('%Y', datetime(data / 1000, 'unixepoch', 'localtime')) = '"+body.anno+"'\n" +
    "AND CAST(strftime('%m', datetime(data / 1000, 'unixepoch', 'localtime')) AS INTEGER) IN ("+body.mese+") -- Passa qui i mesi desiderati\n" +
    "ORDER BY data;\n"
  db.all(sql, async (err, result) => {
    res.json(result);
  })
})




app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
