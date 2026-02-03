import { Component, Input } from '@angular/core';
import { Shofer } from '../shofer';

@Component({
  selector: 'app-vozac',
  templateUrl: './vozac.html',
  styleUrl: './vozac.css',
})
export class Vozac {

  @Input()
  motordzija?: Shofer;

  @Input()
  indeks: number = 0;

  funk(): void {
    console.log('Vozac button clicked');
  }
}
