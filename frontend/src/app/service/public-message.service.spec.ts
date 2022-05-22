/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PublicMessageService } from './public-message.service';

describe('Service: PublicMessage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PublicMessageService]
    });
  });

  it('should ...', inject([PublicMessageService], (service: PublicMessageService) => {
    expect(service).toBeTruthy();
  }));
});
