import {Component} from '@angular/core';
import {BottomNavComponent} from '../bottom-nav/bottom-nav.component';
import {MatCard, MatCardHeader, MatCardModule} from '@angular/material/card';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {Color, LegendPosition, PieChartModule, ScaleType} from '@swimlane/ngx-charts';
import {MatList, MatListItem} from '@angular/material/list';
import {MatLabel} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatFabButton, MatMiniFabButton} from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  imports: [

    MatCard,
    MatCardHeader,
    MatCardModule,
    MatTabGroup,
    MatTab,
    PieChartModule,
    MatList,
    MatListItem,
    MatLabel,
    MatIcon,
    MatFabButton,
  ],

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  results:any[]=[{
    "name": "Spesa",
    "value": 10
  },
    {
      "name": "Divertimento",
      "value": 30
    },
    {
      "name": "Casa",
      "value": 30
    },
    {
      "name": "Auto",
      "value": 30
    },
    {
      "name": "Bollette",
      "value": 30
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
}
