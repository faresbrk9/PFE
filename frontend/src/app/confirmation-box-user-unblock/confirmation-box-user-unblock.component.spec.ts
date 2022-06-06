/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConfirmationBoxUserUnblockComponent } from './confirmation-box-user-unblock.component';

describe('ConfirmationBoxUserUnblockComponent', () => {
  let component: ConfirmationBoxUserUnblockComponent;
  let fixture: ComponentFixture<ConfirmationBoxUserUnblockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationBoxUserUnblockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationBoxUserUnblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
