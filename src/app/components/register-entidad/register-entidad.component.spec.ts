import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEntidadComponent } from './register-entidad.component';

describe('RegisterEntidadComponent', () => {
  let component: RegisterEntidadComponent;
  let fixture: ComponentFixture<RegisterEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterEntidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
