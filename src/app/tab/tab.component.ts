import {Component, inject, OnInit} from '@angular/core';
import {Color, LegendPosition, PieChartModule, ScaleType} from '@swimlane/ngx-charts';
import {MatLabel} from '@angular/material/form-field';
import {MatList, MatListItem} from '@angular/material/list';
import {NgClass} from '@angular/common';
import {ServiceService} from '../service.service';


@Component({
  selector: 'app-tab',
  imports: [
    PieChartModule,
    MatLabel,
    MatList,
    MatListItem,
    NgClass
  ],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})
export class TabComponent implements OnInit {
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

  ngOnInit(): void {
    this.service.getMovements().subscribe((result:any)=>{
      console.log(result);
      this.movements = result;
      this.getGraphData()
    })
  }

  getGraphData(){
    const sumSpesa =this.movements.filter((f)=>f.categoria==='S').reduce((n: any, {importo}: any) => n + importo, 0)
    const sumBollette =this.movements.filter((f)=>f.categoria==='B').reduce((n: any, {importo}: any) => n + importo, 0)
    const sumDivertimento =this.movements.filter((f)=>f.categoria==='D').reduce((n: any, {importo}: any) => n + importo, 0)
    const sumCasa =this.movements.filter((f)=>f.categoria==='C').reduce((n: any, {importo}: any) => n + importo, 0)
    const sumAuto =this.movements.filter((f)=>f.categoria==='A').reduce((n: any, {importo}: any) => n + importo, 0)
    this.results.find((f)=>f.id==="S").value=sumSpesa*-1
    this.results.find((f)=>f.id==="B").value=sumBollette*-1
    this.results.find((f)=>f.id==="D").value=sumDivertimento*-1
    this.results.find((f)=>f.id==="C").value=sumCasa*-1
    this.results.find((f)=>f.id==="A").value=sumAuto*-1
  console.log(this.results)
  }
}
