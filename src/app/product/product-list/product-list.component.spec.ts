import { BreakpointObserver } from '@angular/cdk/layout';
import { TestBed } from '@angular/core/testing';
import { BaseProductService } from 'src/app/services/base-product.service';
import { TestProductService } from 'src/app/services/test-product.service';

import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ProductListComponent,
        { provide: BaseProductService, useClass: TestProductService },
        BreakpointObserver
      ],
    })
      .compileComponents();

    component = TestBed.inject(ProductListComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has #products initially empty', () => {
    expect(component.products).toEqual([]);
  })

  it('should has #columnCount initially 0', () => {
    expect(component.columnCount).toEqual(0);
  })

  it('should has #productSubscription set after initialization', () => {
    component.ngOnInit();
    expect(component.productSubscription).toBeTruthy();
  });

  it('should properly determine initial #columnCount based on #responsive service after initialization', () => {
    component.ngOnInit();
    expect(component.columnCount).toBeGreaterThan(0);
    expect(component.columnCount).toBeLessThan(5);
  });
});
