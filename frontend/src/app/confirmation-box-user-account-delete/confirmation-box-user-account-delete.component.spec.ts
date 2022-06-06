/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConfirmationBoxUserAccountDeleteComponent } from './confirmation-box-user-account-delete.component';

describe('ConfirmationBoxUserAccountDeleteComponent', () => {
  let component: ConfirmationBoxUserAccountDeleteComponent;
  let fixture: ComponentFixture<ConfirmationBoxUserAccountDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationBoxUserAccountDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationBoxUserAccountDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
