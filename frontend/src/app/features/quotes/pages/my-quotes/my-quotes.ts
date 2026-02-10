import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-quotes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-quotes.html',
  styleUrl: './my-quotes.scss',
})
export class MyQuotes {
  quotes = [
    { id: 1, text: 'Allt vi har att besluta är vad vi ska göra med den tid som ges oss.', author: 'J.R.R. Tolkien' },
    { id: 2, text: 'Det finns inget så praktiskt som en bra teori.', author: 'Kurt Lewin' },
    { id: 3, text: 'Sann enkelhet kräver arbete.', author: 'Clarice Lispector' },
    { id: 4, text: 'Den som har ett varför kan uthärda nästan vilket hur som helst.', author: 'Friedrich Nietzsche' },
    { id: 5, text: 'Gör det lilla du kan, där du är, med det du har.', author: 'Theodore Roosevelt' },
  ];
}
