import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DataService} from '../../data/data.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-time-range-cancellation',
  templateUrl: './time-range-cancellation.component.html',
  styleUrls: ['./time-range-cancellation.component.css']
})
export class TimeRangeCancellationComponent implements OnInit {
  cancelTimeRangeForm = this.formBuilder.group({
    reason: ['', [Validators.required]]
  });

  constructor(public dialogRef: MatDialogRef<TimeRangeCancellationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private dataService: DataService) {
  }

  stornierenClicked(): void {
    if (this.cancelTimeRangeForm.valid) {
      const cancel = {id: this.data.timeRange.id, reason: this.cancelTimeRangeForm.value.reason};

      this.dataService.cancelTimeRangeOfUser(this.data.userId, cancel).subscribe(newData => {
        this.dialogRef.close(newData);
      });
    }
  }

  cancelClicked(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}
