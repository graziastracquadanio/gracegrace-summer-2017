import {
  trigger,
  state,
  animate,
  transition,
  style,
  keyframes,
} from '@angular/animations';

export const fadeInOut = trigger('routingAnimation', [
  state('*', style({ opacity: 0 })),
  state('loaded', style({ opacity: 1 })),
  transition('void => loaded', [
    style({ opacity: 0 }),
    animate(`400ms 300ms linear`, style({ opacity: 1 })),
  ]),
]);

export const blurInOut = trigger('blurAnimation', [
  state(
    'menu-visible',
    style({
      filter: 'blur(10px)',
    })
  ),
  state(
    'menu-hidden',
    style({
      filter: 'none',
    })
  ),
  transition('menu-visible <=> menu-hidden', animate('300ms linear')),
]);
