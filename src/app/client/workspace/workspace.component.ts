import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription, switchMap} from 'rxjs';
import {Desk, Workspace} from '../../shared/interfaces/desk';
import {ActivatedRoute, Params} from '@angular/router';
import {WorkspaceService} from '../../shared/services/workspace.service';
import {DeskService} from '../../shared/services/desk.service';

@Component({
	selector: 'app-workspace',
	templateUrl: './workspace.component.html',
	styles: []
})
export class WorkspaceComponent implements OnInit, OnDestroy {
	workspace$!: Observable<Workspace>;
	workspaces!: Workspace[];
	desks!: Desk[];
	subscriptions: Subscription = new Subscription();
	// errorMsg: string = '';
	createDesk: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private workspaceService: WorkspaceService,
		private deskService: DeskService,
	) {
	}
	ngOnInit() {
		this.workspace$ = this.route.params
			.pipe(
				switchMap((params: Params) => {
					return this.workspaceService.getWorkspaceById(params['id']);
				})
			)

		this.subscriptions.add(
			this.workspaceService.getAllWorkspaces()
				.subscribe(workspaces => {
					if (workspaces) {
						this.workspaces = workspaces;
					}
			})
		);

		this.subscriptions.add(
			this.deskService.getAllDesks()
				.subscribe(desks => {
					if (desks) {
						console.log(desks);
						this.desks = desks;
					}
			})
		);
	}

	newDesk(idWorkspace: string | undefined) {
		this.createDesk = !this.createDesk;
	}

	remove(id?: string) {
		this.subscriptions.add(
			this.deskService.remove(id).subscribe(() => {
				this.desks = this.desks.filter(desk => desk.id !== id)
			})
		);
	}

	ngOnDestroy() {
		this.subscriptions?.unsubscribe();
	}
}
