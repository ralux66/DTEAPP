import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogCaseComponent } from './log-case.component';

describe('LogCaseComponent', () => {
  let component: LogCaseComponent;
  let fixture: ComponentFixture<LogCaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogCaseComponent]
    });
    fixture = TestBed.createComponent(LogCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
