import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarCursosComponent } from './eliminar-cursos.component';

describe('EliminarCursosComponent', () => {
  let component: EliminarCursosComponent;
  let fixture: ComponentFixture<EliminarCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarCursosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
