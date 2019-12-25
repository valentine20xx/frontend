import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {Observable} from 'rxjs';

import {TimeRangeCancellationComponent} from './time-range-cancellation/time-range-cancellation.component';
import {TimeRangeCreateComponent} from './time-range-create/time-range-create.component';
import {DataService, TimeRange, User} from '../data/data.service';


@Component({
  selector: 'app-time-range',
  templateUrl: './time-range.component.html',
  styleUrls: ['./time-range.component.css']
})
export class TimeRangeComponent implements OnInit {
  displayedColumnsTimeRanges: string[] = ['position', 'name', 'from', 'to', 'amountOfDays', 'applicationsAmount', 'restAmountOfDays',
    'status', 'action'];
  dataSource = new MatTableDataSource<TimeRange>();

  user: Observable<User>;
  userId: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog, private dataService: DataService) {
  }

  createTimeRangeDialog(): void {
    const dialogRef = this.dialog.open(TimeRangeCreateComponent, {
      width: '25em',
      data: {userId: this.userId}
    });

    dialogRef.afterClosed().subscribe(newData => {
      if (newData) {
        this.dataSource.data = newData;
      }
    });
  }

  backClicked(): void {
    this.router.navigateByUrl(`/users`);
  }


  cancelTimeRange(timeRange: TimeRange): void {
    const dialogRef = this.dialog.open(TimeRangeCancellationComponent, {
      width: '25em',
      data: {userId: this.userId, timeRange}
    }).afterClosed().subscribe(newData => {
      if (newData) {
        this.dataSource.data = newData;
      }
    });
  }

  dateSort(a: Date, b: Date): number {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  }

  openTimeRange(timeRange: TimeRange): void {
    this.router.navigateByUrl(`user/${this.userId}/vacation-time-ranges/${timeRange.id}/vacations`);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('userid');

      this.user = this.dataService.getUser(userId);

      this.dataService.getTimeRangesOfUser(userId)
        .subscribe(data => this.dataSource.data = data.sort((a, b) => this.dateSort(a.from, b.from)));
      this.dataSource.paginator = this.paginator;

      this.userId = userId;
    });
  }
}
