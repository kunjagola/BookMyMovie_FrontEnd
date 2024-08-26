import { TestBed } from '@angular/core/testing';

import { UserreservationService } from './userreservation.service';

describe('UserreservationService', () => {
  let service: UserreservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserreservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
