import {Component, inject, OnInit} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from '@angular/material/form-field';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatInput, MatInputModule} from '@angular/material/input';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MatNativeDateModule,

  provideNativeDateAdapter
} from '@angular/material/core';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {ServiceService} from '../service.service';

@Component({
  selector: 'app-dialog',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatLabel,
    MatDatepickerModule,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatDatepicker,
    MatDatepickerToggle,
    MatNativeDateModule,

    MatDatepickerInput,
    MatInput,
    MatFormFieldModule,
    MatInputModule,
    MatSelect,
    MatOption,
    MatIcon,
    FormsModule
  ],
  providers: [provideNativeDateAdapter(),{provide: MAT_DATE_LOCALE, useValue: 'it-IT'}],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit {
  service = inject(ServiceService)
  date = "";
  name=""
  category=""
  import=""
  ngOnInit(): void {
    let today = new Date();
    this.date = today.getFullYear() + '-' + ("0"+(today.getMonth() + 1)).substr(-2) + '-' + ("0"+today.getDate()).substr(-2)+"T"+("0"+today.getHours()).substr(-2) + ':' + ("0"+today.getMinutes() ).substr(-2) + ':' + ("0"+today.getSeconds()).substr(-2)+"Z";


  }

  saveSpesa(){

    const obj = {data:new Date(this.date).getTime(),nome:this.name,categoria:this.category,importo:this.category==="E"?this.import:(Number(this.import)*-1)};
     this.service.addMovement(obj).subscribe()
  }
}
