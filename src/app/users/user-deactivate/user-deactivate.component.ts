import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DataService, User} from '../../data/data.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-deactivate.component.html',
  styleUrls: ['./user-deactivate.component.css']
})
export class UserDeactivateComponent implements OnInit {
  deactivateUserForm = this.formBuilder.group({
    reason: ['', [Validators.required]]
  });

  constructor(
    public dialogRef: MatDialogRef<UserDeactivateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private formBuilder: FormBuilder,
    private dataService: DataService) {
  }

  deactivateClicked(): void {
    if (this.deactivateUserForm.valid) {
      this.dataService.deactivateUser({
        id: this.data.id,
        reason: this.deactivateUserForm.value.reason
      }).subscribe(data => this.dialogRef.close(data));
    }
  }

  cancelClicked(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}
