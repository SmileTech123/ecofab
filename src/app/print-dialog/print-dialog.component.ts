import {Component, ComponentFactoryResolver, inject, Injector, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {ServiceService} from '../service.service';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-print-dialog',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    FormsModule
  ],
  templateUrl: './print-dialog.component.html',
  styleUrl: './print-dialog.component.scss'
})
export class PrintDialogComponent implements OnInit {
  service = inject(ServiceService)
  anno="";
  mesi:any[]=[]
  anni:any[]=[]
  mese="";
  REPORTHTML="<!doctype html>\n" +
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
    "            color:black;\n" +
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
    "<body >\n" +
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

  ngOnInit(): void {
    this.service.getAllYear().subscribe((result:any)=>{

      this.anni = result;
    })

  }

  getMesi(){
    this.service.getAllMonthByYear(this.anno).subscribe((result:any)=>{
      this.mesi = result;
    })
  }

  getNumeroMese() {
    const mesi = [
      "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
      "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
    ];

    // Converti la stringa in numero e sottrai 1 per ottenere l'indice corretto
    let index = mesi.findIndex((element:any)=>element===this.mese);
    return index+1;
  }

  downloadReport(){
    let body ={
      title:"Report "+this.mese+" "+this.anno,
      mese:this.getNumeroMese(),
      anno:this.anno,
    }
    this.service.generateReport(body).subscribe((result:any)=>{
      const sommaEntrate = result
        .filter((obj: any) => obj.importo >0)  // Filtra gli oggetti
        .reduce((acc:any, obj:any) => acc + obj.importo, 0).toFixed(2);  // Somma gli importi

      const sommaSpese = result
        .filter((obj: any) => obj.importo <0)  // Filtra gli oggetti
        .reduce((acc:any, obj:any) => acc + obj.importo, 0).toFixed(2);  // Somma gli importi
      let sumSpesa =result.filter((f:any) => f.categoria === "S").reduce((acc:any, obj:any) => acc + obj.importo, 0).toFixed(2);  // Somma gli importi
      let sumDivertimento =result.filter((f:any) => f.categoria === "D").reduce((acc:any, obj:any) => acc + obj.importo, 0).toFixed(2);  // Somma gli importi
      let sumCasa =result.filter((f:any) => f.categoria === "C").reduce((acc:any, obj:any) => acc + obj.importo, 0).toFixed(2);  // Somma gli importi
      let sumAuto =result.filter((f:any) => f.categoria === "A").reduce((acc:any, obj:any) => acc + obj.importo, 0).toFixed(2);  // Somma gli importi
      let sumBollette =result.filter((f:any) => f.categoria === "B").reduce((acc:any, obj:any) => acc + obj.importo, 0).toFixed(2);  // Somma gli importi
      let tablebody=""
      result.forEach((e:any) => {
        let dataTodate = new Date(e.data)
        let dataformat=("0"+dataTodate.getDate()).substr(-2)+"/"+("0"+dataTodate.getMonth()).substr(-2)+"/"+dataTodate.getFullYear()
        if(e.importo<0){
          tablebody+="<tr> <td>"+dataformat+"</td> <td>"+e.nome+"</td> <td>"+this.convertCatToName(e.categoria)+"</td> <td style='color:red'>"+e.importo.toFixed(2) +"€</td> </tr>"
        }else{
          tablebody+="<tr> <td>"+dataformat+"</td> <td>"+e.nome+"</td> <td>"+this.convertCatToName(e.categoria)+"</td> <td style='color:green'>"+e.importo.toFixed(2) +"€</td> </tr>"
        }
      })

      let newhtml = this.REPORTHTML.replaceAll("{{TITLE}}", body.title).replaceAll("{{CONTENUTO}}", tablebody).replaceAll("{{ENTRATE}}",sommaEntrate).replaceAll("{{USCITE}}",sommaSpese).replaceAll("{{TOTCASA}}",sumCasa).replaceAll("{{TOTBOLLETTE}}",sumBollette).replaceAll("{{TOTAUTO}}",sumAuto).replaceAll("{{TOTSPESA}}",sumSpesa).replaceAll("{{TOTDIVERTIMENTO}}",sumDivertimento)
      var htmlObject = document.createElement('div');
      htmlObject.innerHTML = newhtml;

        let doc = new jsPDF({
          orientation: "p",
          format: "a4",
          unit: "px",
          hotfixes: ["px_scaling"],
        })

      let fileName = "Report "+this.mese+" "+this.anno
      doc.html(htmlObject, {
        callback: function (doc) {
          doc.save(fileName);
        },
        x: 0,
        y: 0,
        autoPaging: "text",
        margin: 20,
        width: 750,
        windowWidth: 750,
      });



    })
  }

  convertCatToName(cat:any){
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
      case "E":
        return  "Entrate"
      default:
        return "None";
        break;
    }
  }
}
