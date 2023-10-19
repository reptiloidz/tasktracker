import {DoCheck, Component, OnDestroy, OnInit} from '@angular/core';
import {WorkspaceService} from '../../shared/services/workspace.service';
import {Desk, Workspace} from '../../shared/interfaces/desk';
import {Subscription} from 'rxjs';
import {DeskService} from '../../shared/services/desk.service';

@Component({
	selector: 'app-task-manager',
	templateUrl: './task-manager.component.html'
})
export class TaskManagerComponent implements OnInit, OnDestroy, DoCheck {

	workspaces!: Workspace[];
	// desks!: Desk[];
	subscriptions: Subscription = new Subscription();
	errorMsg: string = '';
	// createDesk: boolean = false;
	constructor(
		private workspaceService: WorkspaceService,
		// private deskService: DeskService,
	) {
	}

	ngOnInit() {
		this.subscriptions.add(
			this.workspaceService.getAllWorkspaces()
				.subscribe(workspaces => {
					if (workspaces) {
						this.workspaces = workspaces;
					}
			})
		);
		// this.subscriptions.add(
		// 	this.deskService.getAllDesks()
		// 		.subscribe(desks => {
		// 			if (desks) {
		// 				console.log(desks);
		// 				this.desks = desks;
		// 			}
		// 	})
		// );
	}

	ngDoCheck() {
		// this.showAllWorkspaces();
	}

	// newDesk(idWorkspace: string | undefined) {
	// 	this.createDesk = !this.createDesk;
	// }

	remove(id?: string) {
		this.subscriptions.add(
			this.workspaceService.remove(id).subscribe(() => {
				this.workspaces = this.workspaces.filter(workspace => workspace.id !== id)
			})
		);
	}

	ngOnDestroy() {
		this.subscriptions?.unsubscribe();
	}
}
