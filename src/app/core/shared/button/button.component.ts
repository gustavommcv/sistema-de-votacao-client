import { booleanAttribute, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
@Component({
  selector: 'app-button',
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  route = input<string>();
  isLink = input(false);
  disabled = input(false, { transform: booleanAttribute });
}
