import {
  trigger,
  state,
  animate,
  transition,
  style,
  keyframes,
} from '@angular/animations';

const fadeIn = '.4s';
const fadeOut = '.5s';

const slideIn = '.6s';
const slideOut = '.3s';

export const fadeInOut = trigger('routingAnimation', [
  state('void', style({ opacity: 1 })),
  state('*', style({ opacity: 1 })),
  transition(':enter', [
    style({ opacity: 0 }),
    animate(`${fadeIn} 300ms linear`, style({ opacity: 1 })),
  ]),
]);

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

export const heightChange = trigger('heightAnimation', [
  transition(
    'menu-hidden => menu-visible',
    animate(
      600,
      keyframes([
        style({
          transform: 'translateY(-100%) rotate(-2deg) scale(1.2, 1)',
          offset: 0,
        }),
        style({ transform: 'translateY(0%)', offset: 0.5 }),
        style({ transform: 'translateY(-20%)', offset: 0.6 }),
        style({ transform: 'translateY(0%)', offset: 0.7 }),
        style({ transform: 'translateY(-10%)', offset: 0.8 }),
        style({ transform: 'translateY(0%)', offset: 0.9 }),
        style({ transform: 'translateY(0%)', offset: 1 }),
      ])
    )
  ),
  transition('menu-visible => menu-hidden', [
    animate(
      250,
      keyframes([
        style({ transform: 'translateY(0%)', offset: 0 }),
        style({ transform: 'translateY(-100%)', offset: 1 }),
      ])
    ),
  ]),
]);

export const componentLoaded = trigger('loadedAnimation', [
  state('*', style({ opacity: 0 })),
  state(
    'not-loaded',
    style({
      opacity: 0,
      transform: 'translateY(100%)',
    })
  ),
  state(
    'loaded',
    style({
      opacity: 1,
      transform: 'translateY(0%)',
    })
  ),
  transition('loaded <=> not-loaded', animate('300ms 300ms linear')),
]);
