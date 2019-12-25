import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {UserCreateComponent} from './user-create/user-create.component';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';


import {UserDeactivateComponent} from './user-deactivate/user-deactivate.component';
import {DataService, User} from '../data/data.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumnsUsers: string[] = ['position', 'name', 'action'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private httpClient: HttpClient,
              private dialog: MatDialog,
              private router: Router,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe(data => {
      if (data) {
        this.dataSource.data = data.sort((a, b) => {
          if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) {
            return -1;
          } else if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) {
            return 1;
          } else {
            return 0;
          }
        });
      }
    });
    this.dataSource.paginator = this.paginator;
  }

  createUserDialog(): void {
    this.dialog.open(UserCreateComponent, {
      width: '30em',
      data: {}
    }).afterClosed().subscribe(newData => {
      if (newData) {
        this.dataSource.data = newData;
      }
    });
  }

  deactivateUser(user: User): void {
    this.dialog.open(UserDeactivateComponent, {
      width: '30em',
      data: user
    }).afterClosed().subscribe(newData => {
      if (newData) {
        this.dataSource.data = newData;
      }
    });
  }

  openUser(user: User): void {
    this.router.navigateByUrl(`user/${user.id}/vacation-time-ranges`);
  }
}
