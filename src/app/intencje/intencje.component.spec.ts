import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntencjeComponent } from './intencje.component';

describe('IntencjeComponent', () => {
  let component: IntencjeComponent;
  let fixture: ComponentFixture<IntencjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntencjeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntencjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
