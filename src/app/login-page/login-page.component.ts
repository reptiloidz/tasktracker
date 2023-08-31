import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/interfaces/login';
import {AuthService} from '../client/shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
})

export class LoginPageComponent implements OnInit, OnDestroy {
	form!: FormGroup;
	minPasswordLength: number = 6;
	submitted: boolean = false;
	message: string = '';
	user!: User;
	subscription: Subscription = new Subscription();
	error: string = '';
	errorMsg: string = '';
	loginTitle: string = 'Выполните вход';
	loginSubtitle: string = '';


	@HostBinding('class') class = 'd-flex flex-column flex-grow-1';

	constructor(
		public auth: AuthService,
		private fb: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
	){}

	ngOnInit(): void {
		this.form = this.fb.group({
			email: ['', [
				Validators.required,
				Validators.email,
			]],

			password: ['', [
				Validators.required,
				Validators.minLength(this.minPasswordLength),
			]]
		});

		this.subscription.add(
			this.route.queryParams.subscribe((params: Params) => {
				if (params['loginRepeat']) {
					this.loginTitle = 'Сначала выполните вход';
					this.loginSubtitle = 'Чтобы просматривать доски, сначала нужно войти';
				} else if (params['authFailed']) {
					this.loginTitle = 'Сессия истекла';
					this.loginSubtitle = 'Выполните вход заново';
				} else if (params['passwordFailed']) {
					this.loginTitle = 'Неверный пароль';
					this.loginSubtitle = 'Проверьте правильность ввода данных';
				}
			})
		);
	}

	get email() {
		return this.form.get('email');
	}

	get password() {
		return this.form.get('password');
	}

	submit() {
		if (this.form.invalid) {
			return;
		}

		this.submitted = true;

		this.user = {
			email: this.form.value.email,
			password: this.form.value.password,
		}

		this.auth.login(this.user).subscribe(() => {
			this.form.reset();
			this.router.navigate(['/client', 'home']).then();
			this.submitted = false;
		}, () => {
			this.submitted = false;
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
