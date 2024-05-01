import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsOutletComponent } from './notifications-outlet.component';

describe('NotificationsOutletComponent', () => {
  let component: NotificationsOutletComponent;
  let fixture: ComponentFixture<NotificationsOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsOutletComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationsOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
