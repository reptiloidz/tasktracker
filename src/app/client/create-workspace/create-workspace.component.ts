import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WorkspaceService} from '../../shared/services/workspace.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Workspace} from '../../shared/interfaces/desk';

@Component({
	selector: 'app-create-workspace',
	templateUrl: './create-workspace.component.html',
})
export class CreateWorkspaceComponent implements OnInit {

	@Input() ngModalClass: string = '';
	@Output() close = new EventEmitter<void>();
	submitted: boolean = false;
	form!: FormGroup;
	workspace!: Workspace;

	constructor(
		private fb: FormBuilder,
		private workspaceService: WorkspaceService,
		private router: Router,
		private route: ActivatedRoute,
		private location: Location,
	) {
	}

	ngOnInit(): void {
		this.form = this.fb.group({
			title: ['', [
				Validators.required,
			]],

			description: ['']
		});
	}

	submit() {
		if (this.form.invalid) {
			return;
		}

		this.workspace = {
			title: this.form.value.title,
			description: this.form.value.description,
		};

		this.workspaceService.createWorkspace(this.workspace).subscribe(() => {
			this.form.reset();
		});

		this.submitted = true;

		this.close.emit();

		if (this.location.path() !== '/client/task-manager') {
			this.router.navigate(['/client', 'task-manager']).then();
		}
	}

}
