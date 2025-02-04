import {AfterViewInit, Component, inject, Input, OnInit} from '@angular/core';
import {Color, LegendPosition, PieChartModule, ScaleType} from '@swimlane/ngx-charts';
import {MatLabel} from '@angular/material/form-field';
import {MatList, MatListItem} from '@angular/material/list';
import {DatePipe, NgClass} from '@angular/common';
import {ServiceService} from '../service.service';
import EventEmitter from 'node:events';
import {Observable, Subscription, take} from 'rxjs';
import {MatTooltip} from '@angular/material/tooltip';


@Component({
  selector: 'app-tab',
  imports: [
    PieChartModule,
    MatLabel,
    MatList,
    MatListItem,
    NgClass,
    MatTooltip,
    DatePipe
  ],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})
export class TabComponent implements AfterViewInit {

  @Input() type: "G"|"M"|"S" = 'G';

  spesa=0;
  service = inject(ServiceService)
  movements:any[]=[]
  results:any[]=[
    {
    "id":"S",
    "name": "Spesa",
    "value": 0
    },
    {
      "id":"D",
      "name": "Divertimento",
      "value": 0
    },
    {
      "id":"C",
      "name": "Casa",
      "value": 0
    },
    {
      "id":"A",
      "name": "Auto",
      "value": 0
    },
    {
      "id":"B",
      "name": "Bollette",
      "value": 0
    },
  ]
  colorScheme:Color = {
    name:"colori",
    group:ScaleType.Linear,
    selectable:false,
    domain: ['#13cbcf', '#b57dba', '#ffffff', '#2312e0','#d92534']
  };
  view: [number,number] = [350, 200];


  protected readonly LegendPosition = LegendPosition;

  ngAfterViewInit(): void {
      this.getData();
  }

  getData(){

    switch (this.type) {
      case "G":
        this.service.getMovementsDay().subscribe((result:any)=>{

          this.movements = result;
          this.getGraphData()
          this.getSpesa()
          this.results= [...this.results];
        })
        break;
      case "M":

        this.service.getMovementsMonth().subscribe((result:any)=>{

          this.movements = result;
          this.getGraphData()
          this.getSpesa()
          this.results= [...this.results];
        })
        break;
      case "S":
        this.service.getMovementsWeek().subscribe((result:any)=>{

          this.movements = result;
          this.getGraphData()
          this.getSpesa()
          this.results= [...this.results];
        })
        break;
    }
  }

  getGraphData(){


      if (this.movements) {
        const sumSpesa = this.movements.filter((f) => f.categoria === 'S').reduce((n: any, {importo}: any) => n + importo, 0)
        const sumBollette = this.movements.filter((f) => f.categoria === 'B').reduce((n: any, {importo}: any) => n + importo, 0)
        const sumDivertimento = this.movements.filter((f) => f.categoria === 'D').reduce((n: any, {importo}: any) => n + importo, 0)
        const sumCasa = this.movements.filter((f) => f.categoria === 'C').reduce((n: any, {importo}: any) => n + importo, 0)
        const sumAuto = this.movements.filter((f) => f.categoria === 'A').reduce((n: any, {importo}: any) => n + importo, 0)
        this.results.find((f) => f.id === "S").value = sumSpesa * -1
        this.results.find((f) => f.id === "B").value = sumBollette * -1
        this.results.find((f) => f.id === "D").value = sumDivertimento * -1
        this.results.find((f) => f.id === "C").value = sumCasa * -1
        this.results.find((f) => f.id === "A").value = sumAuto * -1
      }

  }

  getSpesa(){
    this.spesa=this.movements.filter((f)=>f.importo<0).reduce((n: any, {importo}: any) => n + importo, 0).toFixed(2)

  }
}
