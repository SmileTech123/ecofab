import {Component, inject, OnInit} from '@angular/core';

import {MatCard, MatCardHeader, MatCardModule} from '@angular/material/card';
import {MatTab, MatTabGroup} from '@angular/material/tabs';

import {MatIcon} from '@angular/material/icon';
import {MatFabButton, } from '@angular/material/button';
import {ServiceService} from '../service.service';
import {TabComponent} from '../tab/tab.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';



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
  readonly dialog = inject(MatDialog);
  saldo=0;



  ngOnInit(): void {
    this.service.getSaldo().subscribe((result:any)=>{
      this.saldo=result.saldo;
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
