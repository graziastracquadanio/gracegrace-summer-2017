import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { palettes } from '../commons/palettes';

@Injectable()
export class ColorService {
  private localStorageItem: string;
  private currentIndex: number = null;
  private currentPaletteSource = new BehaviorSubject<string>(null);
  currentPalette$ = this.currentPaletteSource.asObservable();

  constructor() {
    const lastValue = localStorage.getItem('palette');
    if (lastValue) {
      this.setNextPalette(lastValue);
    } else {
      this.setNextPalette('day');
    }
  }

  getNextIndex() {
    if (this.currentIndex === null) {
      return Math.floor(Math.random() * palettes.codes.length);
    }
    const next = this.currentIndex + 1;
    return next >= palettes.codes.length ? 0 : next;
  }

  getCurrentPalette(): string {
    return this.currentPaletteSource.value;
  }

  isCurrentPaletteInWhitelist() {
    const currentPalette = this.getCurrentPalette();
    return !!this.localStorageItem;
  }

  setNextPalette(value?: any) {
    let nextIndex;
    let nextPalette = null;

    switch (typeof value) {
      case 'string':
        nextIndex = palettes.codes.findIndex(code => code === value);
        if (nextIndex < 0) {
          nextIndex = null;
        }
        nextPalette = value;
        this.localStorageItem = nextPalette;
        localStorage.setItem('palette', nextPalette);
        break;
      case 'number':
        if (nextIndex < 0 || nextIndex >= palettes.codes.length) {
          nextIndex = null;
          nextPalette = '';
        }
        nextIndex = value;
        break;
      default:
        // get next index;
        nextIndex = this.getNextIndex();
        localStorage.removeItem('palette');
        this.localStorageItem = null;
        break;
    }

    this.currentIndex = nextIndex;
    if (nextIndex !== null) {
      nextPalette = palettes.codes[this.currentIndex];
    }
    this.currentPaletteSource.next(nextPalette);
  }
}
