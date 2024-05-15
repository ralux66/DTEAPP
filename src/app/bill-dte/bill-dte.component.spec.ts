import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDteComponent } from './BillDteComponent';

describe('BillDteComponent', () => {
  let component: BillDteComponent;
  let fixture: ComponentFixture<BillDteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillDteComponent]
    });
    fixture = TestBed.createComponent(BillDteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
