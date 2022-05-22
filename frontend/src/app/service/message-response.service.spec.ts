/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MessageResponseService } from './message-response.service';

describe('Service: MessageResponse', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageResponseService]
    });
  });

  it('should ...', inject([MessageResponseService], (service: MessageResponseService) => {
    expect(service).toBeTruthy();
  }));
});
