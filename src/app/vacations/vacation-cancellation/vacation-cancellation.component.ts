import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DataService, Vacation} from '../../data/data.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-vacation-cancellation',
  templateUrl: './vacation-cancellation.component.html',
  styleUrls: ['./vacation-cancellation.component.css']
})
export class VacationCancellationComponent implements OnInit {
  cancelVacationForm = this.formBuilder.group({
    reason: ['', [Validators.required]]
  });

  constructor(public dialogRef: MatDialogRef<VacationCancellationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private dataService: DataService) {
  }

  stornierenClicked(): void {
    if (this.cancelVacationForm.valid) {
      const cancel = {id: this.data.vacation.id, reason: this.cancelVacationForm.value.reason};

      this.dataService.cancelVocationOfUser(this.data.userId, cancel).subscribe(newData => {
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
