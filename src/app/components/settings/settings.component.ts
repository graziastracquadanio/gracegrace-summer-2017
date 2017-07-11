import { Component, OnInit, OnDestroy } from '@angular/core';
import { palettes } from '../../commons/palettes';
import { ColorService } from '../../services';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  palettes: object = palettes;
  colorSubscription;
  currentPalette;
  isOpen: boolean = false;

  constructor(private colorService: ColorService) {}

  toggleSettings() {
    this.isOpen = !this.isOpen;
  }

  changeColor(color: string) {
    this.colorService.setNextPalette(color);
  }

  ngOnInit() {
    this.colorSubscription = this.colorService.currentPalette$.subscribe(
      value => {
        this.currentPalette = value;
      }
    );
  }

  ngOnDestroy() {
    this.colorSubscription.unsubscribe();
  }
}
