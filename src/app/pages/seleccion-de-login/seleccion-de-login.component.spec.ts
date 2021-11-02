import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionDeLoginComponent } from './seleccion-de-login.component';

describe('SeleccionDeLoginComponent', () => {
  let component: SeleccionDeLoginComponent;
  let fixture: ComponentFixture<SeleccionDeLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionDeLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionDeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
