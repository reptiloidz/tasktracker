import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FbAuthResponse, User} from '../../../shared/interfaces/login';
import {catchError, Observable, Subject, tap, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment.development';

@Injectable({providedIn: 'root'})
export class AuthService {

	private expDateSet!: Date;
	private expDateGet!: Date;
	private fbResponse!: FbAuthResponse;

	constructor(
		private http: HttpClient,
	) {}

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
				tap((response: object) => this.setToken(response)),
			);
	}

	logout(): void {
		this.setToken(null);
	}

	isAuth(): boolean {
		return !!this.token;
	}

	//todo: нужен ли FbAuthResponse в типе response
	private setToken(response: FbAuthResponse | object | null): void {
		if (response) {
			this.fbResponse = response as FbAuthResponse;
			console.log(response);
			this.expDateSet = new Date(new Date().getTime() + +this.fbResponse.expiresIn * 1000);
			console.log(this.fbResponse);
			localStorage.setItem('fb-token', this.fbResponse.idToken);
			localStorage.setItem('fb-token-exp', this.expDateSet.toString());
		} else {
			localStorage.clear();
		}
	}
}
