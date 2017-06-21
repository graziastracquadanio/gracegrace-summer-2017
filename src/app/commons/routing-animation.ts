import { trigger, state, animate, transition, style } from '@angular/animations';

const fadeIn = '.6s';
const fadeOut = '.3s';

const slideIn = '.6s';
const slideOut = '.3s';

export const fadeInOut = trigger('routingAnimation', [
  state('void', style({ opacity: 1 }) ),
  state('*', style({ opacity: 1 }) ),
  transition(':enter', [
    style({ opacity: 0 }),
    animate(`${fadeIn} linear`, style({ opacity: 1 }))
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate(`${fadeOut} linear`, style({ opacity: 0 }))
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
  ]),
  transition(':leave', [
    style({
      opacity: 1,
      transform: 'translateY(0%)'
    }),
    animate(`${slideOut} ease-out`, style({
      opacity: 0,
      transform: 'translateY(100%)'
    }))
  ])
]);