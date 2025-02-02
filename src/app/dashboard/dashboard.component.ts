import {Component, inject, OnInit} from '@angular/core';
import {BottomNavComponent} from '../bottom-nav/bottom-nav.component';
import {MatCard, MatCardHeader, MatCardModule} from '@angular/material/card';
import {MatTab, MatTabGroup} from '@angular/material/tabs';

import {MatIcon} from '@angular/material/icon';
import {MatFabButton, MatMiniFabButton} from '@angular/material/button';
import {ServiceService} from '../service.service';
import {TabComponent} from '../tab/tab.component';

@Component({
  selector: 'app-dashboard',
  imports: [

    MatCard,
    MatCardHeader,
    MatCardModule,
    MatTabGroup,
    MatTab,
    MatIcon,
    MatFabButton,
    TabComponent,
  ],

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  service = inject(ServiceService)
  saldo=0;


  ngOnInit(): void {
    this.service.getSaldo().subscribe((result:any)=>{
      console.log(result);
      this.saldo=result.saldo;
    })
  }
}
