import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GagItemComponent } from './gag-item.component';

describe('GagItemComponent', () => {
  let component: GagItemComponent;
  let fixture: ComponentFixture<GagItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GagItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GagItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
