import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReportComponent } from './my-report.component';

describe('MyReportComponent', () => {
  let component: MyReportComponent;
  let fixture: ComponentFixture<MyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
