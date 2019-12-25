import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';

import {DataService} from '../../data/data.service';

@Component({
  selector: 'app-vacation-create',
  templateUrl: './vacation-create.component.html',
  styleUrls: ['./vacation-create.component.css']
})
export class VacationCreateComponent implements OnInit {
  newVacationForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    from: ['', [Validators.required]],
    to: ['', [Validators.required]],
    amountOfDays: ['', [Validators.required]],
    comment: ['', [Validators.required]]
  });

  maxDate = new Date(2020, 0, 1);
  minDate = new Date();
  holidays: Date[];

  constructor(
    public dialogRef: MatDialogRef<VacationCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private dataService: DataService) {
  }

  startDateChanged(newDate) {
    this.maxDate = newDate;
  }

  endDateChanged(newDate) {
  }

  cancelClicked(): void {
    this.dialogRef.close();
  }

  createClicked(): void {
    if (this.newVacationForm.valid) {
      this.dataService.createVocationOfUser(this.data.userId, this.newVacationForm.value)
        .subscribe(
          data => {
            this.dialogRef.close(data);
          },
          errorObject => {
            alert(errorObject.error.errorMsg);
          });
    }
  }

  weekendExcludeFilter = (pickerDate: Date): boolean => {
    const day = pickerDate.getDay();
    const isInHolidays = this.holidays.map(Number).indexOf(+pickerDate) > -1;

    return day !== 0 && day !== 6 && !isInHolidays;
  };

  endDateFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  getDaysBetweenTwoDates(date1: Date, date2: Date): number {
    let result = 0;
    if (Object.prototype.toString.call(date1) === '[object Date]' && Object.prototype.toString.call(date2) === '[object Date]') {
      result = (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);
    }

    return result;
  }

  ngOnInit(): void {
    this.holidays = this.dataService.getHolidays();
  }
}
