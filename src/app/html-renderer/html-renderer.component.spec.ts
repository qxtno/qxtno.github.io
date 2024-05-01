import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlRendererComponent } from './html-renderer.component';

describe('HtmlRendererComponent', () => {
  let component: HtmlRendererComponent;
  let fixture: ComponentFixture<HtmlRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HtmlRendererComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HtmlRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
