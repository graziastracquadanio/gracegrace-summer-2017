import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';
import * as Trianglify from 'trianglify';
import { COLORS } from '../commons/color-defs';
import { ColorService } from '../services';

@Directive({
  selector: '[trianglify]'
})

export class TrianglifyDirective {
  isFast: boolean;
  fastAnimation: number = 250;
  slowAnimation: number = 5000;
  currentColor: any;
  currentBackground: string = 'white';

  constructor(
    private colorService: ColorService,
    private elementRef: ElementRef,
    private renderer: Renderer) {
  }

  private trianglifyElement(color: any, duration: number = 250) {
    let element = this.elementRef.nativeElement;
    const options = this.getOptions(element, color);
    const { width, height } = options;
    const pattern = Trianglify(options);
    const svg = pattern.svg();
    const background = `url('data:image/svg+xml;charset=utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${width} ${height}" height="${height}px" width="${width}px">${svg.innerHTML}</svg>') no-repeat`;
    this.renderer.setElementStyle(element, 'background-size', '100% 100%');

    this.renderer.invokeElementMethod(
      element,
      'animate',
      [
        [
          {background: this.currentBackground},
          {background: background}
        ],
        {
          duration: duration,
          delay: 0,
          fill: 'forwards'
        }
      ]
    );

    this.currentBackground = background;
  }

  private getOptions(element: any, color: any) {
    const { width, height } = this.rect(element);
    const palette = typeof color === 'number' ?
      Trianglify.colorbrewer[COLORS[color]] :
      color;

    return {
      width,
      height,
      x_colors: palette
    }
  }

  private rect(element: any) {
    let rect = element.getBoundingClientRect();
    let height = rect.height === undefined ? rect.top - rect.bottom : rect.height;
    let width = rect.width === undefined ? rect.left - rect.right : rect.width;
    return { width, height };
  }

  private parseColor(value: any) {
    return typeof value === 'string' ?
      COLORS.findIndex(color => color === value) :
      value;
  }

  @Input() set trianglify(value: any) {
    const nextColor = this.parseColor(value);
    let timing = this.isFast || this.currentBackground === 'white' ?
      this.fastAnimation : this.slowAnimation;

    this.currentColor = nextColor;
    this.trianglifyElement(nextColor, timing);
  }

  @Input() set animateFast(value: boolean) {
    this.isFast = value;
  }

  @HostListener('window:resize', ['$event'])
    onResize(event) {
      this.trianglifyElement(this.currentColor, 0);
    }
}
