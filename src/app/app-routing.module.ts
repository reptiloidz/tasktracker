import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {HomePageComponent} from './home-page/home-page.component';

const routes: Routes = [
	{
		path: '',
		component: MainLayoutComponent,
		children: [
			{
				path: '',
				redirectTo: '/login',
				pathMatch: 'full',
			},
			{
				path: 'login',
				component: LoginPageComponent,
			},
			{
				path: 'home',
				component: HomePageComponent,
			}
		]
	},
	// {
	// 	path: '**',
	// 	redirectTo: '/home',
	// },

	// lazy loading client
	{
		path: 'client',
		loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
		preloadingStrategy: PreloadAllModules,
	})],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
