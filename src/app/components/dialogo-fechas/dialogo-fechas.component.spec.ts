import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoFechasComponent } from './dialogo-fechas.component';

describe('DialogoFechasComponent', () => {
  let component: DialogoFechasComponent;
  let fixture: ComponentFixture<DialogoFechasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoFechasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoFechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
