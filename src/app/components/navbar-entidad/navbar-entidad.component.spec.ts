import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarEntidadComponent } from './navbar-entidad.component';

describe('NavbarEntidadComponent', () => {
  let component: NavbarEntidadComponent;
  let fixture: ComponentFixture<NavbarEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarEntidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
