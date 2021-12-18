import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEliminarCursoComponent } from './dialog-eliminar-curso.component';

describe('DialogEliminarCursoComponent', () => {
  let component: DialogEliminarCursoComponent;
  let fixture: ComponentFixture<DialogEliminarCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEliminarCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEliminarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
