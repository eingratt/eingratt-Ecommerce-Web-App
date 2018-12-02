import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogIssuesComponent } from './log-issues.component';

describe('LogIssuesComponent', () => {
  let component: LogIssuesComponent;
  let fixture: ComponentFixture<LogIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
