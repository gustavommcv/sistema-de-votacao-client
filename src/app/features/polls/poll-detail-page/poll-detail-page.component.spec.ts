import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollDetailPageComponent } from './poll-detail-page.component';

describe('PollDetailPageComponent', () => {
  let component: PollDetailPageComponent;
  let fixture: ComponentFixture<PollDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PollDetailPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
