import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollEditPageComponent } from './poll-edit-page.component';

describe('PollEditPageComponent', () => {
  let component: PollEditPageComponent;
  let fixture: ComponentFixture<PollEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PollEditPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
