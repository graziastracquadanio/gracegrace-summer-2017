import {
  trigger,
  state,
  animate,
  transition,
  style,
  keyframes,
} from '@angular/animations';

export const heightChange = trigger('heightAnimation', [
  state('menu-visible', style({ transform: 'translateY(0%)' })),
  state('menu-hidden', style({ transform: 'translateY(-100%)' })),
  transition('menu-visible <=> menu-hidden', animate('300ms ease-out')),
]);

export const slideInOut = trigger('afterLoadAnimation', [
  state('void', style({ transform: 'translateY(-100%)' })),
  state('*', style({ transform: 'translateY(0%)' })),
  transition(':enter', [
    style({
      transform: 'translateY(-100%)',
    }),
    animate(
      `400ms 1000ms ease-out`,
      style({
        transform: 'translateY(0%)',
      })
    ),
  ]),
]);
