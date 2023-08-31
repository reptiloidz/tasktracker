import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Workspace} from '../../../../shared/interfaces/desk';
import {Subscription} from 'rxjs';
import {WorkspaceService} from '../../../../shared/services/workspace.service';

@Component({
	selector: 'app-client-layout',
	templateUrl: './client-layout.component.html',
})
export class ClientLayoutComponent implements OnInit, OnDestroy {
	@HostBinding('class') class = 'd-flex flex-column flex-grow-1';
	modal: boolean = false;
	// desks!: Desk[];
	// subscriptions: Subscription = new Subscription();

	constructor(
		private router: Router,
		public auth: AuthService,
		// private workspaceService: WorkspaceService
	) {
	}

	ngOnInit(): void {
		// this.subscriptions.add(
		// 	this.workspaceService.getAllWorkspaces().subscribe(desks => {
		// 		this.desks = desks;
		// 	})
		// );
	}
	logout(event: Event) {
		event.preventDefault();
		this.auth.logout();
		this.router.navigate(['/', 'login']).then();
	}

	ngOnDestroy() {
		// this.subscriptions?.unsubscribe();
	}
}
