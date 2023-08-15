import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FbAuthResponse, User} from '../../../shared/interfaces/login';
import {catchError, Observable, Subject, tap, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment.development';

@Injectable()
export class AuthService {

	expDateSet!: Date;
	expDateGet!: Date;
	fbResponse!: FbAuthResponse;
	public errorPassword$: Subject<string> = new Subject<string>();
	public errorEmail$: Subject<string> = new Subject<string>();
	constructor(
		private http: HttpClient,
	) {

	}

	get token(): string | null {
		this.expDateGet = new Date(localStorage.getItem('fb-token-exp') as string);

		if (new Date() > this.expDateGet) {
			this.logout();
			return null;
		}

		return localStorage.getItem('fb-token');
	}
	login(user: User): Observable<any> {
		user.returnSecureToken = true;
		return this.http.post(
			`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
			user
		)
			.pipe(
				tap(this.setToken),
				catchError(this.handleError.bind(this)),
			);
	}

	logout(): void {
		this.setToken(null);
	}

	private handleError(error: HttpErrorResponse) {
		const { message } = error.error.error;

		console.log(message);

		switch (message) {
			case 'INVALID_PASSWORD':
				this.errorPassword$.next('Неверный пароль');
				break;
			case 'INVALID_EMAIL':
				this.errorEmail$.next('Неверный email');
				break;
			case 'EMAIL_NOT_FOUND':
				this.errorEmail$.next('Такого адреса не существует');
				break;
		}

		return throwError(error);
	}

	isAuth(): boolean {
		return !!this.token;
	}

	//todo: нужен ли FbAuthResponse в типе response
	private setToken(response: FbAuthResponse | object | null): void {
		if (response) {
			this.fbResponse = response as FbAuthResponse;
			this.expDateSet = new Date(new Date().getTime() + +this.fbResponse.expiresIn * 1000);
			localStorage.setItem('fb-token', this.fbResponse.idToken);
			localStorage.setItem('fb-token-exp', this.expDateSet.toString());
		} else {
			localStorage.clear();
		}
	}
}
