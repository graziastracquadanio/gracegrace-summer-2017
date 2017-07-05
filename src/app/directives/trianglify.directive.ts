import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import * as Trianglify from 'trianglify';
import { PALETTE_CODES, PALETTE_DEFS } from '../commons/color-defs';

@Directive({
  selector: '[trianglify]',
})
export class TrianglifyDirective {
  canRenderImage: boolean = true;
  fastAnimation: number = 250;
  slowAnimation: number = 4000;
  currentColor: any;
  currentBackground: string = 'white';
  isFast: boolean;
  isChrome: boolean = navigator.userAgent.indexOf('Chrome') !== -1;
  isSafari: boolean = navigator.userAgent.indexOf('Safari') !== -1;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.canRenderImage = window.innerWidth >= 768;
    let element = this.elementRef.nativeElement;
    this.renderer.setStyle(element, 'background-size', 'cover');
    // this.renderer.setStyle(element, 'opacity', `${this.isChrome || this.isSafari ? '0.9' : '0.6'}`);
  }

  private trianglifyElement(color: any, duration: number = 250) {
    const fallbackColor = PALETTE_DEFS[PALETTE_CODES[color]].fallback;
    let element = this.elementRef.nativeElement;

    this.setBackgroundColor(color);

    if (this.isChrome || this.isSafari) {
      const options = this.getOptions(element, color);
      const { width, height, x_colors } = options;
      const pattern = Trianglify(options);
      const svg = pattern.svg();
      const background = `url('data:image/svg+xml;charset=utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${width} ${height}" height="${height}px" width="${width}px">${svg.innerHTML}</svg>')`;
      this.renderer.setStyle(element, 'opacity', 0.2);
      // if (this.isChrome) {
      //   this.renderer.invokeElementMethod(element, 'animate', [
      //     [{ background: this.currentBackground }, { background: background }],
      //     {
      //       duration: duration,
      //       delay: 0,
      //       fill: 'forwards',
      //     },
      //   ]);
      //   this.currentBackground = background;
      // } else {
      this.renderer.setStyle(element, 'background-image', background);
      // }
    }
  }

  private getOptions(element: any, color: any) {
    const { width, height } = this.rect(element);
    const palette =
      typeof color === 'number'
        ? Trianglify.colorbrewer[PALETTE_CODES[color]]
        : color;

    return {
      width,
      height,
      x_colors: palette,
    };
  }

  private rect(element: any) {
    let rect = element.getBoundingClientRect();
    let height =
      rect.height === undefined ? rect.top - rect.bottom : rect.height;
    let width = rect.width === undefined ? rect.left - rect.right : rect.width;
    return { width, height };
  }

  private parseColor(value: any) {
    return typeof value === 'string'
      ? PALETTE_CODES.findIndex(color => color === value)
      : value;
  }

  private cleanBackground() {
    let element = this.elementRef.nativeElement;
    this.renderer.removeStyle(element, 'background-image');
    this.renderer.setStyle(element, 'opacity', 0.8);
  }

  private setBackgroundColor(color: any) {
    const fallbackColor = PALETTE_DEFS[PALETTE_CODES[color]].fallback;
    let element = this.elementRef.nativeElement;

    this.renderer.setStyle(element, 'background-color', fallbackColor);
  }

  @Input()
  set trianglify(value: any) {
    const nextColor = this.parseColor(value);
    let timing =
      this.isFast || this.currentBackground === 'white'
        ? this.fastAnimation
        : this.slowAnimation;

    this.currentColor = nextColor;

    this.canRenderImage
      ? this.trianglifyElement(nextColor, timing)
      : this.setBackgroundColor(nextColor);
  }

  @Input()
  set animateFast(value: boolean) {
    this.isFast = value;
    if (!this.isChrome) {
      let element = this.elementRef.nativeElement;
      let timing =
        value || this.currentBackground === 'white'
          ? this.fastAnimation
          : this.slowAnimation;
      this.renderer.setStyle(
        element,
        'transition',
        `all ${timing / 1000}s linear`
      );
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768 && this.canRenderImage) {
      this.cleanBackground();
      this.canRenderImage = false;
    } else if (this.canRenderImage) {
      this.canRenderImage = true;
      this.trianglifyElement(this.currentColor, 0);
    }
  }
}
