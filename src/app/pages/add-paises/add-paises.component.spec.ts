import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaisesComponent } from './add-paises.component';

describe('AddPaisesComponent', () => {
  let component: AddPaisesComponent;
  let fixture: ComponentFixture<AddPaisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPaisesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPaisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
