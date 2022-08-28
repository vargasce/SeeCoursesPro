import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarProvinciasComponent } from './agregar-provincias.component';

describe('AgregarProvinciasComponent', () => {
  let component: AgregarProvinciasComponent;
  let fixture: ComponentFixture<AgregarProvinciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarProvinciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarProvinciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
