import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeRangeCreateComponent } from './time-range-create.component';

describe('TimeRangeCreateComponent', () => {
  let component: TimeRangeCreateComponent;
  let fixture: ComponentFixture<TimeRangeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeRangeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeRangeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
