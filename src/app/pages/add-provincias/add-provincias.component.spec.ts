import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProvinciasComponent } from './add-provincias.component';

describe('AddProvinciasComponent', () => {
  let component: AddProvinciasComponent;
  let fixture: ComponentFixture<AddProvinciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProvinciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProvinciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
