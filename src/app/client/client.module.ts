import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DeclensionDirective} from '../shared/directives/dectlension.directive';
import {ClientLayoutComponent} from './shared/components/client-layout/client-layout.component';
import {ProfileComponent} from './profile/profile.component';
import {TaskManagerComponent} from './task-manager/task-manager.component';
import {TaskComponent} from './task/task.component';
import { HomePageComponent } from './home-page/home-page.component';
import {SharedModule} from '../shared/shared.module';
import {LoginPageComponent} from '../login-page/login-page.component';

const childRoutes: Routes = [
	{
		path: '',
		component: ClientLayoutComponent,
		children: [
			{
				path: '',
				redirectTo: '/client/home',
				pathMatch: 'full',
			},
			{
				path: 'home',
				component: HomePageComponent,
			},
			{
				path: 'profile',
				component: ProfileComponent,
			},
			{
				path: 'task-manager',
				component: TaskManagerComponent,
			},
			{
				path: 'task/:id',
				component: TaskComponent,
			},
		]
	},
	{
		path: '**',
		redirectTo: '/client/home',
	},
];

@NgModule({
	declarations: [
		ClientLayoutComponent,
		DeclensionDirective,
		ProfileComponent,
		TaskManagerComponent,
		TaskComponent,
		HomePageComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		RouterModule.forChild(childRoutes),
	],
	exports: [
		RouterModule,
	],
})

export class ClientModule {
}
