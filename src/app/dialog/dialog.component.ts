import {Component, inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
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
  data = inject(MAT_DIALOG_DATA);
  date :Date=new Date();
  name=""
  category=""
  import=""
  isModify = false;
  ngOnInit(): void {
    if(this.data!=null){
      this.isModify = true;
      this.date = new Date(this.data.movimento.data);
      this.name = this.data.movimento.nome;
      this.category = this.data.movimento.categoria;
      this.import = (this.data.movimento.importo*-1).toString();
    }
  }

  saveSpesa(){

    const obj = {data:this.date.getTime(),nome:this.name,categoria:this.category,importo:this.category==="E"?this.import:(Number(this.import)*-1)};
     this.service.addMovement(obj).subscribe()
  }

  editSpesa(){
    const obj = {id:this.data.movimento.id, data:this.date.getTime(),nome:this.name,categoria:this.category,importo:this.category==="E"?this.import:(Number(this.import)*-1)};
    this.service.editMovement(obj).subscribe()
  }
}
