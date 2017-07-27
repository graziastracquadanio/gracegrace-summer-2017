import {
  trigger,
  state,
  animate,
  transition,
  style,
  keyframes,
} from '@angular/animations';

const slideIn = '.6s';
const slideOut = '.3s';

export const slideInOut = trigger('routingAnimation', [
  state('void', style({ transform: 'translateY(0%)' })),
  state('*', style({ transform: 'translateY(0%)' })),
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(100%)',
    }),
    animate(
      `${slideIn} ease-out`,
      style({
        opacity: 1,
        transform: 'translateY(0%)',
      })
    ),
  ]),
]);

export const componentLoaded = trigger('loadedAnimation', [
  state('*', style({ opacity: 0 })),
  state(
    'not-loaded',
    style({
      opacity: 0,
    })
  ),
  state(
    'loaded',
    style({
      opacity: 1,
    })
  ),
  transition('loaded <=> not-loaded', animate('300ms 300ms linear')),
]);
