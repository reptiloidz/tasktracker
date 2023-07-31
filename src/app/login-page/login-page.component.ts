import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
})

export class LoginPageComponent implements OnInit {
	form!: FormGroup;
	minPasswordLength: number = 6;
	submitted: boolean = false;
	message: string = '';

	constructor() {}

	ngOnInit(): void {
		this.form = new FormGroup({
			email: new FormControl('',
				[
					Validators.required,
					Validators.email,
				]
			),

			password: new FormControl('',
				[
					Validators.required,
					Validators.minLength(this.minPasswordLength),
				]
			)
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
	}
}
