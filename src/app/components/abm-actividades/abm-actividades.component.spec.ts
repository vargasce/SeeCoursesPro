import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmActividadesComponent } from './abm-actividades.component';

describe('AbmActividadesComponent', () => {
  let component: AbmActividadesComponent;
  let fixture: ComponentFixture<AbmActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmActividadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
