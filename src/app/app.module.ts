import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BreadcrumbComponent } from './shared/components/breadcrumb/breadcrumb.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { TextInputComponent } from './shared/components/text-input/text-input.component';
import { DeclensionDirective } from './shared/directives/dectlension.directive';

@NgModule({
	declarations: [
		AppComponent,
		LoginPageComponent,
		BreadcrumbComponent,
		ButtonComponent,
		HeaderComponent,
		LayoutComponent,
		TextInputComponent,
		DeclensionDirective,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
