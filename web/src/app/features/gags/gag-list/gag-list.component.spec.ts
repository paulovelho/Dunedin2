import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GagListComponent } from './gag-list.component';

describe('GagListComponent', () => {
  let component: GagListComponent;
  let fixture: ComponentFixture<GagListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GagListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
