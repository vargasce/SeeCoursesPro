import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmProvinciasComponent } from './abm-provincias.component';

describe('AbmProvinciasComponent', () => {
  let component: AbmProvinciasComponent;
  let fixture: ComponentFixture<AbmProvinciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmProvinciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmProvinciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
