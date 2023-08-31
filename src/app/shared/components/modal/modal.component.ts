import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Workspace} from '../../interfaces/desk';
import {WorkspaceService} from '../../services/workspace.service';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {

	@Input() ngModalClass: string = '';
	@Output() close = new EventEmitter<void>();
	// modal: boolean = false;
	submitted: boolean = false;
	form!: FormGroup;

	constructor(
		private fb: FormBuilder,
		private workspaceService: WorkspaceService,
	){}

	ngOnInit(): void {
		this.form = this.fb.group({
			title: ['', [
				Validators.required,
			]],

			description: ['', [
			]]
		})
	}

	submit() {
		if (this.form.invalid) {
			return;
		}

		const workspace: Workspace = {
			title: this.form.value.title,
			description: this.form.value.description,
		};

		this.workspaceService.createDesk(workspace).subscribe(() => {
			this.form.reset();
		})

		this.submitted = true;
	}

}
