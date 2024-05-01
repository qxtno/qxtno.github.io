import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OgloszeniaWybraneComponent } from './ogloszenia.wybrane.component';

describe('OgloszeniaWybraneComponent', () => {
  let component: OgloszeniaWybraneComponent;
  let fixture: ComponentFixture<OgloszeniaWybraneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OgloszeniaWybraneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OgloszeniaWybraneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
