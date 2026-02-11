import { CommonModule, } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-choice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-choice.html',
  styleUrl: './confirm-choice.scss',
})
export class ConfirmChoice {
  @Input() title = 'Bekräfta radering';
  @Input() message = 'Är du säker på att du vill radera?';
  open = false;
  private onConfirm: (() => void) | null = null;

  show(message: string, onConfirm: () => void) {
    this.message = message;
    this.onConfirm = onConfirm;
    this.open = true;
  }

  confirm() {
    this.open = false;
    this.onConfirm?.();
  }

  cancel() {
    this.open = false;
  }
}
