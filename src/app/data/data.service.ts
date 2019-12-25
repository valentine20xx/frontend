import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Vacation {
  id: string;
  name: string;
  from: Date;
  to: Date;
  amountOfDays: number;
  comment: string;
  status: string;
}

export interface TimeRange {
  id: string;
  name: string;
  from: Date;
  to: Date;
  amountOfDays: number;
  applicationsAmount: number;
  restAmountOfDays: number;
}

export interface Cancellation {
  id: string;
  reason: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:8080/users');
  }

  public getUser(userId: string): Observable<User> {
    return this.getUsers().pipe(map(users => users.find(user => user.id === userId)));
  }

  public createUser(user: User): Observable<User[]> {
    return this.httpClient.post<User[]>('http://localhost:8080/user', user);
  }

  public deactivateUser(cancellation: Cancellation): Observable<User[]> {
    return this.httpClient.patch<User[]>('http://localhost:8080/user', cancellation);
  }

  public cancelTimeRangeOfUser(userId: string, cancellation: Cancellation): Observable<TimeRange[]> {
    return this.httpClient.patch<TimeRange[]>(`http://localhost:8080/user/${userId}/vacation-time-ranges`, cancellation);
  }

  public createTimeRangeOfUser(userId: string, newTimeRange: TimeRange): Observable<TimeRange[]> {
    return this.httpClient.post<TimeRange[]>(`http://localhost:8080/user/${userId}/vacation-time-ranges`, newTimeRange)
      .pipe(map((timeRanges: TimeRange[]) => timeRanges.map(timerange => {
        timerange.from = new Date(timerange.from);
        timerange.to = new Date(timerange.to);

        return timerange;
      })));
  }

  public getTimeRangesOfUser(userId: string): Observable<TimeRange[]> {
    return this.httpClient.get<TimeRange[]>(`http://localhost:8080/user/${userId}/vacation-time-ranges`)
      .pipe(map((timeranges: TimeRange[]) => timeranges.map(timerange => {
        timerange.from = new Date(timerange.from);
        timerange.to = new Date(timerange.to);

        return timerange;
      })));
  }

  public cancelVocationOfUser(userId: string, cancellation: Cancellation): Observable<Vacation[]> {
    return this.httpClient.patch<Vacation[]>(`http://localhost:8080/user/${userId}/vacations`, cancellation);
  }


  public createVocationOfUser(userId: string, newVocation: Vacation): Observable<Vacation[]> {
    return this.httpClient.post<Vacation[]>(`http://localhost:8080/user/${userId}/vacations`, newVocation)
      .pipe(map((vocations: Vacation[]) => vocations.map(vocation => {
        vocation.from = new Date(vocation.from);
        vocation.to = new Date(vocation.to);

        return vocation;
      })));
  }

  public getVocationsOfUser(userId: string, vacationTimeRangeId: string): Observable<Vacation[]> {
    return this.httpClient.get<Vacation[]>(`http://localhost:8080/user/${userId}/vacation-time-ranges/${vacationTimeRangeId}/vacations`)
      .pipe(map((vacations: Vacation[]) => vacations.map(vacation => {
        vacation.from = new Date(vacation.from);
        vacation.to = new Date(vacation.to);

        return vacation;
      })));
  }

  public getHolidays(): Date[] {
    const holiday = ['2019-01-01', '2019-01-06', '2019-03-08', '2019-04-19', '2019-04-21', '2019-04-22', '2019-05-01', '2019-05-30',
      '2019-06-09', '2019-06-10', '2019-06-20', '2019-08-08', '2019-08-15', '2019-09-20', '2019-10-03', '2019-10-31', '2019-11-01',
      '2019-11-20', '2019-12-25', '2019-12-26', '2020-01-01', '2020-01-06', '2020-03-08', '2020-04-09', '2020-04-10', '2020-04-12',
      '2020-04-13', '2020-05-01', '2020-05-21', '2020-05-31', '2020-06-01', '2020-06-11', '2020-08-08', '2020-08-15', '2020-09-20',
      '2020-10-03', '2020-10-31', '2020-11-01', '2020-11-18', '2020-12-25', '2020-12-26'];

    return holiday.map(value => {
      return new Date(value + 'T00:00:00');
    });
  }

  constructor(private httpClient: HttpClient) {
  }
}
