import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddDocPage } from './add-doc.page';

describe('AddDocPage', () => {
  let component: AddDocPage;
  let fixture: ComponentFixture<AddDocPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
