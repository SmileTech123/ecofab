import {Component, OnInit} from '@angular/core';
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
    MatIcon
  ],
  providers: [provideNativeDateAdapter(),{provide: MAT_DATE_LOCALE, useValue: 'it-IT'}],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit {
 date = "";

  ngOnInit(): void {
    let today = new Date();
    this.date = today.getFullYear() + '-' + ("0"+(today.getMonth() + 1)).substr(-2) + '-' + ("0"+today.getDate()).substr(-2);
  }
}
