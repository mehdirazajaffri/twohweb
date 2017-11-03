import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartShoppingUkComponent } from './start-shopping-uk.component';

describe('StartShoppingUkComponent', () => {
  let component: StartShoppingUkComponent;
  let fixture: ComponentFixture<StartShoppingUkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartShoppingUkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartShoppingUkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
