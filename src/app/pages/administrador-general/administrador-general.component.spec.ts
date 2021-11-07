import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorGeneralComponent } from './administrador-general.component';

describe('AdministradorGeneralComponent', () => {
  let component: AdministradorGeneralComponent;
  let fixture: ComponentFixture<AdministradorGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
