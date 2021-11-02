import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgTestComponent } from './img-test.component';

describe('ImgTestComponent', () => {
  let component: ImgTestComponent;
  let fixture: ComponentFixture<ImgTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
