import {Component, OnDestroy, OnInit} from '@angular/core';
import {WorkspaceService} from '../../shared/services/workspace.service';
import {Workspace} from '../../shared/interfaces/desk';
import {Subscription} from 'rxjs';

@Component({
	selector: 'app-task-manager',
	templateUrl: './task-manager.component.html',
	styles: []
})
export class TaskManagerComponent implements OnInit, OnDestroy {

	workspaces!: Workspace[];
	subscriptions: Subscription = new Subscription();
	errorMsg: string = '';
	constructor(
		private workspaceService: WorkspaceService
	) {
	}

	ngOnInit() {
		this.subscriptions.add(
			this.workspaceService.getAllWorkspaces().subscribe(workspaces => {
				if (workspaces) {
					this.workspaces = workspaces;
				}
				// todo
				// return desks;
				// error: (error) => {
				// 	this.errorMsg = error;
				// }
			})
		);
	}

	remove(id?: string) {

	}

	ngOnDestroy() {
		this.subscriptions?.unsubscribe();
	}
}
