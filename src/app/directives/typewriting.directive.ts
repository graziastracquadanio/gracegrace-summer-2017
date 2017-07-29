import { Directive, ElementRef, Input, Renderer } from '@angular/core';

@Directive({
  selector: '[typewriting]',
})
export class TypewritingDirective {
  private breakSymbol: string = '~';
  breakTiming: number = 500;

  showTiming: number = 150;
  hideTiming: number = 100;
  pauseAtTheEnd: number = 1000;
  pauseInBetween: number = 1000;

  words: string[] = [];

  constructor(private elementRef: ElementRef, private renderer: Renderer) {}

  private async processWord(index: number, counter: number) {
    if (index === this.words.length) {
      index = 0;
      counter -= 1;
    }

    if (counter === 0) {
      return;
    }

    const word: string = this.words[index];
    await this.wait(this.pauseInBetween);
    await this.processLetter(0, 1, word);

    // recursively process next word
    this.processWord(index + 1, counter);
  }

  private wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  private async processLetter(current: number, next: number, word: string) {
    const nextLetter = word[next];
    let _current, _next, timing;

    // keep typing
    if (nextLetter && current < next) {
      _current = next;
      _next = next + 1;
      timing = this.showTiming;
      if (nextLetter === this.breakSymbol) {
        timing += this.breakTiming;
      }
    }

    // reached the end of the word, it will start cancelling
    if (!nextLetter && current < next) {
      _current = next;
      _next = current;
      timing = this.pauseAtTheEnd;
    }

    // keep cancelling
    if (nextLetter && current > next) {
      _current = next;
      _next = next - 1;
      timing = this.hideTiming;

      if (nextLetter === this.breakSymbol) {
        timing = 0;
      }
    }

    if (!nextLetter && current === 0) {
      return word;
    }

    this.type(word, 0, _current);
    await this.wait(timing);

    return this.processLetter(_current, _next, word);
  }

  private type(word, start, end) {
    const wordToPrint = word
      .slice(start, end)
      .replace(/~/g, '')
      .replace(/\s/g, '&nbsp;');
    this.elementRef.nativeElement.innerHTML = wordToPrint;
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
    this.words = words;
    this.processWord(0, this.repeat);
  }

  @Input('typewritingRepeat') repeat: number = 1;

  @Input()
  set typewritingColor(value: string) {
    this.setCursor(value);
  }
}
