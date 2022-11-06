import { TestBed } from '@angular/core/testing';
import { Product } from '../product/products.model';
import { TestProductService } from './test-product.service';

describe('ProductTestService', () => {
    let service: TestProductService;

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [TestProductService] });
        service = TestBed.inject(TestProductService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('#getProductList should return an observable of the array of products', (done: DoneFn) => {
        service.getProductList().subscribe(products => {
            expect(products).toEqual(jasmine.any(Array<Product>));
            done();
        });
    });

    it('#getProductById should return an observable of product if the product id is valid', (done: DoneFn) => {
        service.getProductById(1).subscribe(product => {
            expect(product).not.toBeNull();
            done();
        });
    });

    it('#getProductById should return an observable of null if the product id is invalid', (done: DoneFn) => {
        service.getProductById(-1).subscribe(product => {
            expect(product).toBeNull();
            done();
        });
    });
});
