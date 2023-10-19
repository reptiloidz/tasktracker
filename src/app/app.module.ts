import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgModule, Provider} from '@angular/core';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import {SharedModule} from './shared/shared.module';
import {LoginPageComponent} from './login-page/login-page.component';
import {AuthService} from './client/shared/services/auth.service';
// import {HTTP_INTERCEPTORS} from '@angular/common/http';
// import {AuthInterceptor} from './shared/interseptors/auth.interceptor';

// const INTERCEPTOR_PROVIDER: Provider = {
// 	provide: HTTP_INTERCEPTORS,
// 	multi: true,
// 	useClass: AuthInterceptor,
// }

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
		// INTERCEPTOR_PROVIDER,
	],
	exports: [
		MainLayoutComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
