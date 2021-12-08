import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarClaveProgramadorComponent } from './actualizar-clave-programador.component';

describe('ActualizarClaveProgramadorComponent', () => {
  let component: ActualizarClaveProgramadorComponent;
  let fixture: ComponentFixture<ActualizarClaveProgramadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarClaveProgramadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarClaveProgramadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
