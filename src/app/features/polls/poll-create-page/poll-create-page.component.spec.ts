import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollCreatePageComponent } from './poll-create-page.component';

describe('PollCreatePageComponent', () => {
  let component: PollCreatePageComponent;
  let fixture: ComponentFixture<PollCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PollCreatePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PollCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
