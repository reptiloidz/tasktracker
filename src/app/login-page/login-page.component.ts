import {Component, HostBinding, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/interfaces/login';
import {AuthService} from '../client/shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
})

export class LoginPageComponent implements OnInit {
	form!: FormGroup;
	minPasswordLength: number = 6;
	submitted: boolean = false;
	message: string = '';
	user!: User;

	@HostBinding('class') class = 'd-flex flex-column flex-grow-1';

	constructor(
		public auth: AuthService,
		private fb: FormBuilder,
		private router: Router,
	){}

	ngOnInit(): void {
		this.form = this.fb.group({
			email:['', [
				Validators.required,
				Validators.email,
			]],

			password: ['', [
				Validators.required,
				Validators.minLength(this.minPasswordLength),
			]]
		})
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
}
