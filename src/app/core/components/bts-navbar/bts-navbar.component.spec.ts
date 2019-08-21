import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtsNavbarComponent } from './bts-navbar.component';

describe('BtsNavbarComponent', () => {
  let component: BtsNavbarComponent;
  let fixture: ComponentFixture<BtsNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtsNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
