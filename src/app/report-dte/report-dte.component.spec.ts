import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDteComponent } from './report-dte.component';

describe('ReportDteComponent', () => {
  let component: ReportDteComponent;
  let fixture: ComponentFixture<ReportDteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportDteComponent]
    });
    fixture = TestBed.createComponent(ReportDteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
