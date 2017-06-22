import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgModule } from '@angular/core';

import {
  ColorService
} from './services';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { IntroComponent } from './components/intro/intro.component';
import { TrianglifyDirective } from './directives/trianglify.directive';
import { MenuComponent } from './components/menu/menu.component';
import { TypewritingDirective } from './directives/typewriting.directive';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    IntroComponent,
    TrianglifyDirective,
    MenuComponent,
    TypewritingDirective,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    InlineSVGModule,
  ],
  providers: [
    ColorService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
