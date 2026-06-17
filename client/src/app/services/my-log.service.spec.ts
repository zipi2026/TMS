import { TestBed } from '@angular/core/testing';

import { MyLogService } from './my-log.service';

describe('MyLogService', () => {
  let service: MyLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
