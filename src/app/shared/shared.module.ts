import {NgModule} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {CommonModule} from '@angular/common';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {ButtonComponent} from './components/button/button.component';
import {TextInputComponent} from './components/text-input/text-input.component';
import {RouterLink} from '@angular/router';
import {DeclensionDirective} from '../../../.history/src/app/shared/directives/dectlension.directive_20230731231528';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
	declarations: [
		HeaderComponent,
		BreadcrumbComponent,
		ButtonComponent,
		TextInputComponent,
		DeclensionDirective,
	],
	imports: [
		CommonModule,
		RouterLink,
		HttpClientModule,
	],
	exports: [
		HeaderComponent,
		BreadcrumbComponent,
		ButtonComponent,
		TextInputComponent,
		DeclensionDirective,
		HttpClientModule,
	],
})

export class SharedModule {}
