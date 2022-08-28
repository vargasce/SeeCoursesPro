import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenesPorDefectoComponent } from './imagenes-por-defecto.component';

describe('ImagenesPorDefectoComponent', () => {
  let component: ImagenesPorDefectoComponent;
  let fixture: ComponentFixture<ImagenesPorDefectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagenesPorDefectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenesPorDefectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
