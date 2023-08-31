import {inject} from '@angular/core';
import {AuthService} from './auth.service';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

export const AuthGuard: CanActivateFn = (
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot,
): Observable<boolean> | Promise<boolean> | boolean => {
	const auth: AuthService = inject(AuthService);
	const router: Router = inject(Router);

	if (auth.isAuth()) {
		return true;
	} else {
		auth.logout();
		router.navigate(['/', 'login'], {
			queryParams: {
				loginRepeat: true,
			}
		}).then();
		return false;
	}
}
