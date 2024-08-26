import { TestBed } from '@angular/core/testing';

import { SeatselectionService } from './seatselection.service';

describe('SeatselectionService', () => {
  let service: SeatselectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatselectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
