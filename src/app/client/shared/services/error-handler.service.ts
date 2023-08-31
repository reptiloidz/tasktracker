import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ErrorHandlerService {
	private errorMsg: string = '';

	constructor(
		private router: Router,
	) {
	}

	private handleError = (error: HttpErrorResponse) => {
		this.createErrorMessage(error);
	};

	private createErrorMessage = (error: HttpErrorResponse) => {
		this.errorMsg = error.error ? error.error : error.statusText;
	};
}
