import {NgModule} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {CommonModule} from '@angular/common';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {ButtonComponent} from './components/button/button.component';
import {TextInputComponent} from './components/text-input/text-input.component';
import {RouterLink} from '@angular/router';
import {DeclensionDirective} from '../../../.history/src/app/shared/directives/dectlension.directive_20230731231528';
import {HttpClientModule} from '@angular/common/http';
import {ModalComponent} from './components/modal/modal.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
	declarations: [
		HeaderComponent,
		BreadcrumbComponent,
		ButtonComponent,
		TextInputComponent,
		DeclensionDirective,
		ModalComponent,
	],
	imports: [
		CommonModule,
		RouterLink,
		HttpClientModule,
		ReactiveFormsModule,
	],
	exports: [
		HeaderComponent,
		BreadcrumbComponent,
		ButtonComponent,
		TextInputComponent,
		DeclensionDirective,
		HttpClientModule,
		ModalComponent,
	],
})

export class SharedModule {
}
