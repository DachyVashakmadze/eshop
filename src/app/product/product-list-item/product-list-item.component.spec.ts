import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Product } from '../products.model';

import { ProductListItemComponent } from './product-list-item.component';

describe('ProductListItemComponent', () => {
    let component: ProductListItemComponent;
    let fixture: ComponentFixture<ProductListItemComponent>;

    let testProduct: Product = {
        id: 1,
        title: 'TEST PRODUCT',
        image: '/assets/images/logo.svg',
        images: [],
        price: 0,
        priceHistory: []
    }

    let routerSpy = { navigate: jasmine.createSpy('navigate') };
    
    let logSpy: jasmine.Spy<{
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    }>

    beforeEach(async () => {
        // Spy on console.log()
        logSpy = spyOn(console, 'log');

        await TestBed.configureTestingModule({
            declarations: [ProductListItemComponent],
            providers: [
                { provide: Router, useValue: routerSpy }
            ],
            imports: [
                MatCardModule,
                MatIconModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ProductListItemComponent);
        component = fixture.componentInstance;

        // set test product data
        component.product = testProduct;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('should navigate to product personal page on #openProduct', () => {
        component.openProduct();
        // The URL should look like /product/1
        expect(routerSpy.navigate).toHaveBeenCalledWith(['product', 1]);
    });

    it('should add item to cart', () => {
        component.addToCart();
        expect(logSpy).toHaveBeenCalledWith('Add to cart, product id: 1')
    });

    it('should add item to watchlist', () => {
        component.addToWatchlist();
        expect(logSpy).toHaveBeenCalledWith('Add to watchlist, product id: 1')
    });
});
