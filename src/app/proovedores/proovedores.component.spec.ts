import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProovedoresComponent } from './proovedores.component';

describe('ProovedoresComponent', () => {
  let component: ProovedoresComponent;
  let fixture: ComponentFixture<ProovedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProovedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProovedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
