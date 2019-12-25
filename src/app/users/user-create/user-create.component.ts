import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {DataService} from '../../data/data.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  newUserForm = this.formBuilder.group({
    firstName: [''],
    lastName: ['']
  });

  constructor(
    public dialogRef: MatDialogRef<UserCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private dataService: DataService) {
  }

  cancelClicked(): void {
    this.dialogRef.close();
  }

  createClicked(): void {
    this.dataService.createUser(this.newUserForm.value).subscribe(data => {
      this.dialogRef.close(data);
    });
  }

  ngOnInit(): void {
  }
}
