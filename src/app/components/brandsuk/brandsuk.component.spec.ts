import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsukComponent } from './brandsuk.component';

describe('BrandsukComponent', () => {
  let component: BrandsukComponent;
  let fixture: ComponentFixture<BrandsukComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandsukComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
