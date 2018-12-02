import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlistsComponent } from './viewlists.component';

describe('ViewlistsComponent', () => {
  let component: ViewlistsComponent;
  let fixture: ComponentFixture<ViewlistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewlistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewlistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
