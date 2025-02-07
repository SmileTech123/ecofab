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
const path = require("path");
const distDir = path.join(__dirname, 'dist/eco-fab/browser');
const YOUR_ROOT_FOLDER = "1D5SaQBg4Nfw3zbzaoUiabGavM49iqj42",
  PATH_TO_CREDENTIALS = path.resolve(`${__dirname}/credential.json`);

const REPORTHTML="<!doctype html>\n" +
  "<html lang=\"it\">\n" +
  "<head>\n" +
  "    <meta charset=\"UTF-8\">\n" +
  "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
  "    <title>{{TITLE}}</title>\n" +
  "    <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>\n" +
  "    <style>\n" +
  "\n" +
  "\n" +
  "        body{\n" +
  "            background-color: #323232;\n" +
  "            color:white;\n" +
  "            height: 100vh;\n" +
  "            font-family: 'Roboto';\n" +
  "        }\n" +
  "        table {\n" +
  "            font-family: arial, sans-serif;\n" +
  "            border-collapse: collapse;\n" +
  "            width: 100%;\n" +
  "        }\n" +
  "\n" +
  "        td, th {\n" +
  "            border: 1px solid #dddddd;\n" +
  "            text-align: left;\n" +
  "            padding: 8px;\n" +
  "        }\n" +
  "        .category{\n" +
  "            border-radius: 100px;\n" +
  "            border: 2px solid;\n" +
  "            width: 10px;\n" +
  "            display: inline-block;\n" +
  "            height: 10px;\n" +
  "            margin-right: 10px;\n" +
  "        }\n" +
  "\n" +
  "        .C{\n" +
  "            border-color: white;\n" +
  "            background-color: white;\n" +
  "        }\n" +
  "\n" +
  "        .B{\n" +
  "            border-color: #d92534;\n" +
  "            background-color: #d92534;\n" +
  "        }\n" +
  "\n" +
  "        .A{\n" +
  "            border-color: #2312e0;\n" +
  "            background-color: #2312e0;\n" +
  "        }\n" +
  "\n" +
  "        .S{\n" +
  "            border-color: #13cbcf;\n" +
  "            background-color: #13cbcf;\n" +
  "        }\n" +
  "\n" +
  "        .D{\n" +
  "            border-color: #b57dba;\n" +
  "            background-color: #b57dba;\n" +
  "        }\n" +
  "\n" +
  "        .E{\n" +
  "            border-color: green;\n" +
  "            background-color: green;\n" +
  "        }\n" +
  "\n" +
  "    </style>\n" +
  "</head>\n" +
  "<body>\n" +
  "    <h1 style=\"text-align: center\">{{TITLE}}</h1>\n" +
  "        <div style=\"text-align: center\">\n" +
  "            <div style=\"display: inline-block;color:green\"><h3>ENTRATE: {{ENTRATE}}€</h3></div>\n" +
  "            <div style=\"display: inline-block\"><h3>|</h3></div>\n" +
  "            <div style=\"display: inline-block;color:red\"><h3>SPESE: {{USCITE}}€</h3></div>\n" +
  "            <div>\n" +
  "                <div style=\"display: inline-block;margin-right: 10px\"><div class=\"category C\"></div><span>CASA: {{TOTCASA}}€</span></div>\n" +
  "                <div style=\"display: inline-block;margin-right: 10px\"><div class=\"category B\"></div><span>BOLLETTE: {{TOTBOLLETTE}}€</span></div>\n" +
  "                <div style=\"display: inline-block;margin-right: 10px\"><div class=\"category A\"></div><span>AUTO: {{TOTAUTO}}€</span></div>\n" +
  "                <div style=\"display: inline-block;margin-right: 10px\"><div class=\"category S\"></div><span>SPESA: {{TOTSPESA}}€</span></div>\n" +
  "                <div style=\"display: inline-block;margin-right: 10px\"><div class=\"category D\"></div><span>DIVERTIMENTO: {{TOTDIVERTIMENTO}}€</span></div>\n" +
  "            </div>\n" +
  "            <div>\n" +
  "                <table>\n" +
  "                    <tr>\n" +
  "                        <th>DATA</th>\n" +
  "                        <th>MOVIMENTO</th>\n" +
  "                        <th>CATEGORIA</th>\n" +
  "                        <th>IMPORTO</th>\n" +
  "                    </tr>\n" +
  "                    {{CONTENUTO}}\n" +
  "                </table>\n" +
  "            </div>\n" +
  "        </div>\n" +
  "\n" +
  "\n" +
  "</body>\n" +
  "</html>"
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
    const sommaEntrate = result
      .filter(obj => obj.importo >0)  // Filtra gli oggetti
      .reduce((acc, obj) => acc + obj.importo, 0);  // Somma gli importi

    const sommaSpese = result
      .filter(obj => obj.importo <0)  // Filtra gli oggetti
      .reduce((acc, obj) => acc + obj.importo, 0);  // Somma gli importi
    let sumSpesa =result.filter((f) => f.categoria === "S").reduce((acc, obj) => acc + obj.importo, 0);  // Somma gli importi
    let sumDivertimento =result.filter((f) => f.categoria === "D").reduce((acc, obj) => acc + obj.importo, 0);  // Somma gli importi
    let sumCasa =result.filter((f) => f.categoria === "C").reduce((acc, obj) => acc + obj.importo, 0);  // Somma gli importi
    let sumAuto =result.filter((f) => f.categoria === "A").reduce((acc, obj) => acc + obj.importo, 0);  // Somma gli importi
    let sumBollette =result.filter((f) => f.categoria === "B").reduce((acc, obj) => acc + obj.importo, 0);  // Somma gli importi
    let tablebody=""
    result.forEach(e => {
      let dataTodate = new Date(e.data)
      let dataformat=("0"+dataTodate.getDate()).substr(-2)+"/"+("0"+dataTodate.getMonth()).substr(-2)+"/"+dataTodate.getFullYear()
      if(e.importo<0){
        tablebody+="<tr> <td>"+dataformat+"</td> <td>"+e.nome+"</td> <td>"+convertCatToName(e.categoria)+"</td> <td style='color:red'>"+e.importo +"€</td> </tr>"
      }else{
        tablebody+="<tr> <td>"+dataformat+"</td> <td>"+e.nome+"</td> <td>"+convertCatToName(e.categoria)+"</td> <td style='color:green'>"+e.importo +"€</td> </tr>"
      }
    })
    let newhtml = REPORTHTML.replaceAll("{{TITLE}}", body.title).replaceAll("{{CONTENUTO}}", tablebody).replaceAll("{{ENTRATE}}",sommaEntrate).replaceAll("{{USCITE}}",sommaSpese).replaceAll("{{TOTCASA}}",sumCasa).replaceAll("{{TOTBOLLETTE}}",sumBollette).replaceAll("{{TOTAUTO}}",sumAuto).replaceAll("{{TOTSPESA}}",sumSpesa).replaceAll("{{TOTDIVERTIMENTO}}",sumDivertimento)
    const document = {
      html: newhtml,
      data: {},
      path: distDir+"/"+body.title+".pdf",
      type: "",
    };

    await pdf.create(document, {});
    res.json({file:body.title+".pdf"});
    console.log(result, err)

  })
})


function convertCatToName(cat){
  switch(cat){
    case "S":
      return "Spesa";
      break;
    case "D":
      return "Divertimento";
      break;
    case "C":
      return "Casa";
      break;
    case "A":
      return "Auto";
      break;
    case "B":
      return "Bollette";
      break;
  }
}

app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
