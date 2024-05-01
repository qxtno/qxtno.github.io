import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NabozenstwaComponent } from './nabozenstwa.component';

describe('NabozenstwaComponent', () => {
  let component: NabozenstwaComponent;
  let fixture: ComponentFixture<NabozenstwaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NabozenstwaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NabozenstwaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
