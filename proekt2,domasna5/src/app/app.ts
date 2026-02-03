import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';

import { Vozac } from './vozac/vozac';
import { DRIVERS } from '../db-data';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Vozac, NgFor],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('MotoGP');

  Shoferi = DRIVERS;

  soul() {
    console.log('Clicked a driver card');
  }
}
