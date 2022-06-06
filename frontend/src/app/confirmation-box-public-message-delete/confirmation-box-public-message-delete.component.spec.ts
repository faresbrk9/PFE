/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConfirmationBoxPublicMessageDeleteComponent } from './confirmation-box-public-message-delete.component';

describe('ConfirmationBoxPublicMessageDeleteComponent', () => {
  let component: ConfirmationBoxPublicMessageDeleteComponent;
  let fixture: ComponentFixture<ConfirmationBoxPublicMessageDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationBoxPublicMessageDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationBoxPublicMessageDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
