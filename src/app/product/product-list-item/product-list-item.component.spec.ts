import { CurrencyPipe, getLocaleId } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
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
        price: 10,
        priceHistory: []
    }

    let routerSpy = { navigate: jasmine.createSpy('navigate') };
    let rootElement: HTMLElement;
    
    let logSpy: jasmine.Spy<{
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    }>

    beforeEach(async () => {
        // Spy on console.log()
        logSpy = spyOn(console, 'log');

        await TestBed.configureTestingModule({
            declarations: [
                ProductListItemComponent
            ],
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

        // DOM root element
        rootElement = fixture.nativeElement;
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

    it('should display title', () => {
        const tiltleEl:HTMLSpanElement | null = rootElement.querySelector('span.truncate');
        if(!tiltleEl) {
            fail('Element not found');
            return;
        }

        expect(tiltleEl.textContent).toEqual(component.product.title);
    });

    it('should call #addCard when clicking on a button', () => {
        const button:HTMLButtonElement | null = rootElement.querySelector('mat-card-actions button:first-of-type');
        if(!button) {
            fail('Element not found');
            return;
        }

        // Create spy on component.addToCart() method
        spyOn(component, 'addToCart');

        // pretend button click
        button.click();

        expect(component.addToCart).toHaveBeenCalled();
    });

    it('should call #addToWatchlist when clicking on a button', () => {
        const button:HTMLButtonElement | null = rootElement.querySelector('mat-card-actions button:nth-of-type(2)');
        if(!button) {
            fail('Element not found');
            return;
        }

        // Create spy on component.addToCart() method
        spyOn(component, 'addToWatchlist');

        // pretend button click
        button.click();

        expect(component.addToWatchlist).toHaveBeenCalled();
    });

    it('should use currency pipe to display price', () => {
        const priceEl:HTMLHeadingElement | null = rootElement.querySelector('h3');
        if(!priceEl) {
            fail('Element not found');
            return;
        }

        // Note, we are using static locale: en-US
        let pipe = new CurrencyPipe('en-US');
        const expectedPriceWithPipe = pipe.transform(component.product.price);
        expect(priceEl.textContent).toEqual(expectedPriceWithPipe);
    });

    it('should have alt attribute set on image', () => {
        const imageEl:HTMLImageElement | null = rootElement.querySelector('img');
        if(!imageEl) {
            fail('Element not found');
            return;
        }

        expect(imageEl.hasAttribute('alt')).toBeTrue;
        const altText = imageEl.getAttribute('alt');
        expect(altText).toEqual(component.product.title);
    });
});
