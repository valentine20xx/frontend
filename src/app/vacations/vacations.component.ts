import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

import {VacationCancellationComponent} from './vacation-cancellation/vacation-cancellation.component';
import {VacationCreateComponent} from './vacation-create/vacation-create.component';
import {DataService, TimeRange, User, Vacation} from '../data/data.service';

import {Observable} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacations.component.html',
  styleUrls: ['./vacations.component.css']
})
export class VacationsComponent implements OnInit {
  displayedColumnsUrlaubs: string[] = ['position', 'name', 'from', 'to', 'amount_of_days', 'comment', 'status', 'action'];
  dataSource = new MatTableDataSource<Vacation>();

  user: Observable<User>;
  userId: string;
  vacationTimeRangeId: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialog: MatDialog,
              private httpClient: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private dataService: DataService) {
  }

  createVacation(): void {
    this.dialog.open(VacationCreateComponent, {
      width: '25em',
      data: {userId: this.userId}
    }).afterClosed().subscribe(newData => {
      if (newData) {
        this.dataSource.data = newData;
      }
    });
  }

  cancelVacation(vacation: Vacation): void {
    this.dialog.open(VacationCancellationComponent, {
      width: '25em',
      data: {userId: this.userId, vacation}
    }).afterClosed().subscribe(newData => {
      if (newData) {
        this.dataSource.data = newData;
      }
    });
  }

  backClicked(): void {
    this.router.navigateByUrl(`user/${this.userId}/vacation-time-ranges`);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('userid');
      const vacationTimeRangeId = params.get('vacationTimeRangeId');

      this.user = this.dataService.getUser(userId);

      this.dataService.getVocationsOfUser(userId, vacationTimeRangeId).subscribe(data => this.dataSource.data = data);
      this.dataSource.paginator = this.paginator;

      this.userId = userId;
      this.vacationTimeRangeId = vacationTimeRangeId;
    });
  }
}
