import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainPageComponent} from './main-page/main-page.component';
import {LayoutComponent} from './shared/layout/layout.component';
import {ButtonComponent} from './shared/button/button.component';
import { SvgComponent } from './shared/svg/svg.component';

@NgModule({
	declarations: [
		AppComponent,
		MainPageComponent,
		LayoutComponent,
		ButtonComponent,
  SvgComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
