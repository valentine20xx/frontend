import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';

import {DataService} from '../../data/data.service';


@Component({
  selector: 'app-time-range-create',
  templateUrl: './time-range-create.component.html',
  styleUrls: ['./time-range-create.component.css'],

})
export class TimeRangeCreateComponent implements OnInit {
  newTimeRangeForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    from: ['', [Validators.required]],
    to: ['', [Validators.required]],
    amountOfDays: ['', [Validators.required]]
  });
  maxDate = new Date(2020, 0, 1);
  minDate = new Date();
  holidays: Date[];

  constructor(
    public dialogRef: MatDialogRef<TimeRangeCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private dataService: DataService) {
  }

  createClicked(): void {
    if (this.newTimeRangeForm.valid) {
      this.dataService.createTimeRangeOfUser(this.data.userId, this.newTimeRangeForm.value)
        .subscribe(
          data => {
            this.dialogRef.close(data);
          },
          errorObject => {
            alert(errorObject.error.errorMsg);
          });
    }
  }

  cancelClicked(): void {
    this.dialogRef.close();
  }

  startDateChanged(newDate): void {
    this.maxDate = newDate;
  }

  endDateChanged(newDate): void {
  }

  weekendExcludeFilter = (pickerDate: Date): boolean => {
    const day = pickerDate.getDay();
    const isInHolidays = this.holidays.map(Number).indexOf(+pickerDate) > -1;
    return day !== 0 && day !== 6 && !isInHolidays;
  };

  ngOnInit(): void {
    this.holidays = this.dataService.getHolidays();
  }
}
