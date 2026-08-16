import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();
  });

  it('renderiza a identidade do produto', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.title).toBe('SignoTech');
    expect((fixture.nativeElement as HTMLElement).querySelector('h1')?.textContent).toContain(
      'SignoTech',
    );
  });
});
