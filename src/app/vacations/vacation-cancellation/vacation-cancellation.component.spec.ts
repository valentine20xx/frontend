import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationCancellationComponent } from './vacation-cancellation.component';

describe('VacationCancellationComponent', () => {
  let component: VacationCancellationComponent;
  let fixture: ComponentFixture<VacationCancellationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacationCancellationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
