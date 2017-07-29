import { Directive, ElementRef, Input, Renderer } from '@angular/core';

@Directive({
  selector: '[typewriting]',
})
export class TypewritingDirective {
  private breakSymbol: string = '~';
  breakTiming: number = 500;

  showTiming: number = 150;
  hideTiming: number = 100;
  pauseBetween: number = 500;

  words: string[] = [];
  processedWords: any[] = [];
  fullTiming: number = 0;

  constructor(private elementRef: ElementRef, private renderer: Renderer) {}

  private typeWord({ word, showAt, hideAt }) {
    const { showTiming, hideTiming } = this;
    let element = this.elementRef.nativeElement;
    const wordNoBreaks = this.getRealWord(word);
    let breaks = 0;
    let letterTiming = showAt;

    for (let i = 0; i <= word.length; i++) {
      const letter = word.slice(i - 1, i);
      if (letter === this.breakSymbol) {
        letterTiming += this.breakTiming;
      } else {
        letterTiming += showTiming;
        setTimeout(() => {
          element.innerHTML += letter;
        }, letterTiming);
      }
    }

    for (let i = 0; i <= wordNoBreaks.length; i++) {
      setTimeout(() => {
        element.innerHTML = wordNoBreaks.slice(0, wordNoBreaks.length - i);
      }, this.period + letterTiming + hideTiming * i);
    }
  }

  private getRealWord(word) {
    return word.replace(this.breakSymbol, '');
  }

  private getBreaks(word) {
    const matches = word.match(/~/g) || [];
    return matches.length;
  }

  private processWords(words: string[]) {
    let fullTiming = 0;
    const { showTiming, hideTiming, period, pauseBetween } = this;
    this.words = words;

    words.forEach((word, index) => {
      const showAt = fullTiming + pauseBetween;
      const wordNoBreaks = this.getRealWord(word);
      const breaks = this.getBreaks(word) * this.breakTiming;
      const hideAt =
        showAt + wordNoBreaks.length * showTiming + breaks + period;
      fullTiming = hideAt + wordNoBreaks.length * hideTiming;

      const wordSettings = {
        word,
        showAt,
        hideAt,
      };

      this.processedWords.push(wordSettings);
    });

    this.fullTiming = fullTiming;
  }

  private cycleWords() {
    this.processedWords.forEach(wordSettings => {
      this.typeWord(wordSettings);
    });
  }

  private setCursor(color: string = 'gray') {
    let element = this.elementRef.nativeElement;
    this.renderer.setElementStyle(
      element,
      'border-right',
      `2px solid ${color}`
    );
  }

  @Input()
  set typewriting(value: any) {
    const words = typeof value === 'string' ? [value] : value;
    this.processWords(value);
    setTimeout(() => {
      this.cycleWords();
      setInterval(() => {
        this.cycleWords();
      }, this.fullTiming);
    }, 1000);
  }

  @Input('typewritingPeriod') period: number = 2000;

  @Input()
  set typewritingColor(value: string) {
    this.setCursor(value);
  }
}
