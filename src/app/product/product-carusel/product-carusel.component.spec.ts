import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCaruselComponent } from './product-carusel.component';

describe('ProductCaruselComponent', () => {
  let component: ProductCaruselComponent;
  let fixture: ComponentFixture<ProductCaruselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCaruselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCaruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
