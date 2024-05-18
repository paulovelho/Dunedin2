import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedGagComponent } from './shared-gag.component';

describe('SharedGagComponent', () => {
  let component: SharedGagComponent;
  let fixture: ComponentFixture<SharedGagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedGagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedGagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
