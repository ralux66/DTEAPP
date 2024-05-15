import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessBillComponent } from './process-bill.component';

describe('ProcessBillComponent', () => {
  let component: ProcessBillComponent;
  let fixture: ComponentFixture<ProcessBillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessBillComponent]
    });
    fixture = TestBed.createComponent(ProcessBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
