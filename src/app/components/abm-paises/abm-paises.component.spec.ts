import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmPaisesComponent } from './abm-paises.component';

describe('AbmPaisesComponent', () => {
  let component: AbmPaisesComponent;
  let fixture: ComponentFixture<AbmPaisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmPaisesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmPaisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
