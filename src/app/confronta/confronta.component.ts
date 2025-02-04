import {Component, inject, OnInit} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {ServiceService} from '../service.service';
import {MatButton} from '@angular/material/button';
import {BarChartModule, Color, LegendPosition, ScaleType} from '@swimlane/ngx-charts';
import {FactoryTarget} from '@angular/compiler';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';


@Component({
  selector: 'app-confronta',
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    FormsModule,
    MatButton,
    BarChartModule
  ],

  templateUrl: './confronta.component.html',
  styleUrl: './confronta.component.scss'
})
export class ConfrontaComponent implements OnInit {
  service=inject(ServiceService)
  confronto : "M" | "A"| ""=""
  anni:any[]=[]
  mesi:any[]=[]
  anno:string[]|string=""
  mese:string[]=[]
  dati:any[]=[]

  isConfrontaAnniClicked=false
  isConfrontaMesiClicked=false
  colorScheme:Color = {
    name:"colori",
    group:ScaleType.Linear,
    selectable:false,
    domain: ['#2dc22d', '#ba0f0f']
  };
  view: [number,number] = [300, 400];
  ngOnInit(): void {
    this.service.getAllYear().subscribe((result:any)=>{

      this.anni = result;
    })

  }
confront(type:string){
    this.isConfrontaAnniClicked=false;
  this.isConfrontaMesiClicked=false;
  this.dati=[]
  if(type==="A"){

    this.service.confrontYears(this.anno as string[]).subscribe((result:any)=>{

      result.forEach((element: any) => {
        let obj = {
          "name": element.anno,
          "series": [
            {
              "name": "Entrate",
              "value": element.totale_positivo,
            },
            {
              "name": "Uscite",
              "value": element.totale_negativo*-1,
            },
          ]
        }
        this.dati.push(obj)
      })

      this.isConfrontaAnniClicked=true;

    })
  }else{
    this.service.confrontMonths(this.anno as string,this.mese ).subscribe((result:any)=>{
      result.forEach((element: any) => {
        let obj = {
          "name": this.getNomeMese(element.mese),
          "series": [
            {
              "name": "Entrate",
              "value": element.totale_positivo,
            },
            {
              "name": "Uscite",
              "value": element.totale_negativo*-1,
            },
          ]
        }
        this.dati.push(obj)
      })
      this.isConfrontaMesiClicked=true;

    })
  }
  }

  getNomeMese(numeroMese:string) {
    const mesi = [
      "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
      "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
    ];

    // Converti la stringa in numero e sottrai 1 per ottenere l'indice corretto
    const indice = parseInt(numeroMese, 10) - 1;

    return mesi[indice] || "Mese non valido";
  }


  getMesi(){
    this.service.getAllMonthByYear(this.anno as string).subscribe((result:any)=>{
      this.mesi = result;
    })
  }


  protected readonly LegendPosition = LegendPosition;
}
