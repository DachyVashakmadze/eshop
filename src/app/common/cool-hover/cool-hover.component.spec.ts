import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoolHoverComponent } from './cool-hover.component';

describe('CoolHoverComponent', () => {
  let component: CoolHoverComponent;
  let fixture: ComponentFixture<CoolHoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoolHoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoolHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
