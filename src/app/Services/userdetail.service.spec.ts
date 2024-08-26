import { TestBed } from '@angular/core/testing';

import { UserdetailService } from './userdetail.service';

describe('UserdetailService', () => {
  let service: UserdetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserdetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
