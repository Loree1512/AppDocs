import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScanDocPage } from './scan-doc.page';

describe('ScanDocPage', () => {
  let component: ScanDocPage;
  let fixture: ComponentFixture<ScanDocPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanDocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
