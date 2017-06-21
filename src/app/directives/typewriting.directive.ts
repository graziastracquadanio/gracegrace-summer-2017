import { Directive, ElementRef, Input, Renderer } from '@angular/core';

@Directive({
  selector: '[typewriting]'
})
export class TypewritingDirective {
  showTiming: number = 150;
  hideTiming: number = 100;
  pauseBetween: number = 500;
  words: string[] = [];
  period: number = 2000;
  processedWords: any[] = [];
  fullTiming: number = 0;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer) {
  }

  private typeWord({word, showAt, hideAt}) {
    const { showTiming, hideTiming } = this;
    let element = this.elementRef.nativeElement;
    const length = word.length;

    for(let i=0; i<=length; i++) {
      setTimeout(() => {
        element.innerHTML = word.slice(0, i);
      }, showAt + (showTiming * i));

      setTimeout(() => {
        element.innerHTML = word.slice(0, length - i);
      }, hideAt + (hideTiming * i));
    }
  }

  private processWords(words: string[]) {
    let fullTiming = 0;
    const { showTiming, hideTiming, period, pauseBetween } = this;
    this.words = words;

    words.forEach((word, index) => {
      const showAt = fullTiming + pauseBetween;
      const hideAt = showAt + word.length * showTiming + period;
      fullTiming = hideAt + word.length * hideTiming;

      const wordSettings = {
        word,
        showAt,
        hideAt
      }

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
    this.renderer.setElementStyle(element, 'border-right', `2px solid ${color}`);
  }

  @Input() set typewriting(value: any) {
    const words = typeof value === 'string' ? [value] : value;
    this.processWords(value);
    this.cycleWords();
    setInterval(() => {
      this.cycleWords();
    }, this.fullTiming);
    this.setCursor('');
  }

  @Input() set typewritingColor(value: string) {
    this.setCursor(value);
  }

  @Input() set typewritingPeriod(period: number) {
    this.period = period;
  }
}