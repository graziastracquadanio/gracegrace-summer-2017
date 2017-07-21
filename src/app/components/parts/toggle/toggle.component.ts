import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent {
  selected: boolean;
  constructor() {}

  toggle() {
    this.selected = !this.selected;

    setTimeout(() => this.valueChanged.emit(this.selected), 500);
  }

  @Input()
  set isOn(value: boolean) {
    this.selected = value;
  }

  @Output() valueChanged = new EventEmitter();
}
