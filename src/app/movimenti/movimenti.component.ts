import {Component, inject} from '@angular/core';
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MAT_DATE_LOCALE, MatOption, provideNativeDateAdapter} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {FormsModule} from '@angular/forms';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {ServiceService} from '../service.service';
import {MatListItem} from '@angular/material/list';
import {NgClass} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {DialogComponent} from '../dialog/dialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-movimenti',
  imports: [
    MatFormField,
    MatLabel,

    FormsModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatInput,
    MatSuffix,
    MatButton,
    MatListItem,
    NgClass,
    MatIcon,
    MatIconButton
  ],
  providers: [provideNativeDateAdapter(),{provide: MAT_DATE_LOCALE, useValue: 'it-IT'}],
  templateUrl: './movimenti.component.html',
  styleUrl: './movimenti.component.scss'
})
export class MovimentiComponent {
  service=inject(ServiceService)
  readonly dialog = inject(MatDialog);
  giorno :Date=new Date();
  movements:any[]=[]

  findMovement(){
    let dataInizio =this.giorno.getFullYear()+"-"+("0"+(this.giorno.getMonth()+1)).substr(-2)+"-"+("0"+this.giorno.getDate()).substr(-2)+"T00:00:00";
    let dataFine =this.giorno.getFullYear()+"-"+("0"+(this.giorno.getMonth()+1)).substr(-2)+"-"+("0"+this.giorno.getDate()).substr(-2)+"T23:59:59";
    let dataInizioTime =new Date(dataInizio).getTime();
    let dataFineTime =new Date(dataFine).getTime();
    console.log(dataInizio,dataFine,dataInizioTime,dataFineTime);
    this.service.getMovementsByDay(dataInizioTime,dataFineTime).subscribe((result:any)=>{
      console.log(result);
      this.movements = result;
    })
  }

  editMovement(movement:any){
    let conf:MatDialogConfig={data:{movimento:movement}};
      const dialogRef = this.dialog.open(DialogComponent,conf);

      dialogRef.afterClosed().subscribe((result: any) => {
        if(result){
          //location.reload();
        }
      });

  }

  deleteMovement(movementId:number,title:string){
      let conf:MatDialogConfig={data:{title:title}};
      const dialogRef = this.dialog.open(DeleteDialogComponent,conf);

      dialogRef.afterClosed().subscribe((result: any) => {
        if(result){
          this.service.deleteMovement(movementId).subscribe((result:any)=>{
            //location.reload();
          })
        }
      });

  }
}
