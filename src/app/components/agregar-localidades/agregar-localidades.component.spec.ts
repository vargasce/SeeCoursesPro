import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarLocalidadesComponent } from './agregar-localidades.component';

describe('AgregarLocalidadesComponent', () => {
  let component: AgregarLocalidadesComponent;
  let fixture: ComponentFixture<AgregarLocalidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarLocalidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarLocalidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
