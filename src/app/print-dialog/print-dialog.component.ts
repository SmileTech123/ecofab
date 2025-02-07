import {Component, ComponentFactoryResolver, inject, Injector, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {ServiceService} from '../service.service';


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

        const a = document.createElement("a");
        a.download=result.file;
        a.href="/"+result.file;
        a.click();
        document.removeChild(a)



    })
  }
}
