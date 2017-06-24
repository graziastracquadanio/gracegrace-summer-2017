import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PALETTES } from '../commons/color-defs';

@Injectable()
export class ColorService {
  private currentIndex: number = null;
  private currentPaletteSource = new BehaviorSubject<string>(null);
  currentPalette$ = this.currentPaletteSource.asObservable();

  constructor() {
  }

  getNextIndex() {
    if (!!this.currentIndex) {
     return Math.floor(Math.random() * PALETTES.codes.length);
    }
    const next = this.currentIndex + 1;
    return next >= PALETTES.codes.length ?
      0 : next;
  }

  getCurrentPalette() {
    return this.currentPalette$;
  }

  setNextPalette(value?: any) {
    let nextIndex;

    switch (typeof value) {
      case 'string':
        nextIndex = PALETTES.codes.findIndex(code => code === value);
        if (nextIndex < 0) {
          throw new Error(`${value} doesn't exist in the palette definition!!`);
        }
        break;
      case 'number':
        if (nextIndex < 0 || nextIndex >= PALETTES.codes.length) {
          throw new Error(`${value} is not a valid index!!`);
        }
        nextIndex = value;
        break;
      default:
        // get next index;
        nextIndex = this.getNextIndex();
        break;
    }

    this.currentIndex = nextIndex;
    const nextPalette = PALETTES.codes[this.currentIndex];
    this.currentPaletteSource.next(nextPalette);
  }
}
