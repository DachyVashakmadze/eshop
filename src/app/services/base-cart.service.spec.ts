import { TestBed } from '@angular/core/testing';

import { BaseCartService } from './base-cart.service';

describe('BaseCartService', () => {
  let service: BaseCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
