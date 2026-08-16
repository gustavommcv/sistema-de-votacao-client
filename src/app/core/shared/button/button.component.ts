import { booleanAttribute, Component, input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
@Component({
  selector: 'app-button',
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  route = input<string | readonly (string | number)[]>('/');
  isLink = input(false);
  disabled = input(false, { transform: booleanAttribute });
  type = input<'button' | 'submit' | 'reset'>('button');

  preventDisabledLink(event: Event): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
