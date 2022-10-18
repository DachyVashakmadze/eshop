import { TestBed } from '@angular/core/testing';

import { TestProductService } from './test-product.service';

describe('ProductTestService', () => {
  let service: TestProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
