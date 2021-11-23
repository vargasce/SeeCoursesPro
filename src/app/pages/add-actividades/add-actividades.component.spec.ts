import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActividadesComponent } from './add-actividades.component';

describe('AddActividadesComponent', () => {
  let component: AddActividadesComponent;
  let fixture: ComponentFixture<AddActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddActividadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
