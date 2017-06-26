import { trigger, state, animate, transition, style } from '@angular/animations';

const fadeIn = '.4s';
const fadeOut = '.3s';

const slideIn = '.6s';
const slideOut = '.3s';

export const fadeInOut = trigger('routingAnimation', [
  state('void', style({ opacity: 1 }) ),
  state('*', style({ opacity: 1 }) ),
  transition(':enter', [
    style({ opacity: 0 }),
    animate(`${fadeIn} 300ms linear`, style({ opacity: 1 }))
  ])
]);

export const slideInOut = trigger('routingAnimation', [
  state('void', style({ transform: 'translateY(0%)' }) ),
  state('*', style({ transform: 'translateY(0%)' }) ),
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(100%)'
    }),
    animate(`${slideIn} ease-out`, style({
      opacity: 1,
      transform: 'translateY(0%)'
    }))
  ])
]);

export const blurInOut = trigger('blurAnimation', [
  state('menuVisible', style({
    filter: 'blur(10px)',
  })),
  state('menuHidden',   style({
    filter: 'none',
  })),
  transition('menuVisible <=> menuHidden', animate('300ms linear')),
]);

export const heightChange = trigger('heightAnimation', [
  state('menuVisible', style({
    height: '100vh',
  })),
  state('menuHidden',   style({
    height: '*',
  })),
  transition('menuVisible <=> menuHidden', animate('300ms linear')),
]);