import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GagHomeComponent } from './gag-home.component';

describe('GagHomeComponent', () => {
  let component: GagHomeComponent;
  let fixture: ComponentFixture<GagHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GagHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GagHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
