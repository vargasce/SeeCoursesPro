import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarActividadesComponent } from './agregar-actividades.component';

describe('AgregarActividadesComponent', () => {
  let component: AgregarActividadesComponent;
  let fixture: ComponentFixture<AgregarActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarActividadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
