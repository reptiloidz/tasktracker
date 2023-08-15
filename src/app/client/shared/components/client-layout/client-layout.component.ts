import {Component, HostBinding} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
	selector: 'app-client-layout',
	templateUrl: './client-layout.component.html',
})
export class ClientLayoutComponent {
	@HostBinding('class') class = 'd-flex flex-column flex-grow-1';

	constructor(
		private router: Router,
		public auth: AuthService,
	) {
	}
	logout(event: Event) {
		event.preventDefault();
		this.auth.logout();
		this.router.navigate(['/client', 'login']).then();
	}
}
