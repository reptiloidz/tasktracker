import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgModule} from '@angular/core';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import {SharedModule} from './shared/shared.module';
import {LoginPageComponent} from './login-page/login-page.component';
import {AuthService} from './client/shared/services/auth.service';

@NgModule({
	declarations: [
		AppComponent,
		MainLayoutComponent,
		HomePageComponent,
		LoginPageComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
	],
	providers: [
		AuthService,
	],
	exports: [
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
