import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from '../../client/shared/services/auth.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(
		private auth: AuthService,
		private router: Router,
	) {
	}
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (this.auth.isAuth()) {
			req = req.clone({
				setParams: {
					auth: `${this.auth.token}`,
				}
			})
		}

		return next.handle(req)
			.pipe(
				catchError((error: HttpErrorResponse) => {
					if (error.status === 401) {
						this.auth.logout();
						this.router.navigate(['/admin', 'login'], {
							queryParams: {
								authFailed: true,
							}
						}).then();
					} else if (error.status === 400) {
						this.auth.logout();
						this.router.navigate(['/admin', 'login'], {
							queryParams: {
								passwordFailed: true,
							}
						}).then();
					}
					return throwError(() => new Error());
				})
			);

	}

}
