import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntencjeWybraneComponent } from './intencje.wybrane.component';

describe('IntencjeWybraneComponent', () => {
  let component: IntencjeWybraneComponent;
  let fixture: ComponentFixture<IntencjeWybraneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntencjeWybraneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntencjeWybraneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
