import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Desk, Workspace} from '../../shared/interfaces/desk';
import {DeskService} from '../../shared/services/desk.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
	selector: 'app-create-desk',
	templateUrl: './create-desk.component.html',
})
export class CreateDeskComponent implements OnInit {
	@Input() ngModalClass: string = '';
	@Output() close = new EventEmitter<void>();
	// modal: boolean = false;
	submitted: boolean = false;
	form!: FormGroup;

	constructor(
		private fb: FormBuilder,
		private deskService: DeskService,
		private route: ActivatedRoute,
	) {
	}

	ngOnInit(): void {
		this.form = this.fb.group({
			title: ['', [
				Validators.required,
			]],
		});
	}

	submit() {
		if (this.form.invalid) {
			return;
		}

		const desk: Desk = {
			title: this.form.value.title,
			relatedTo: this.route.snapshot.params?.['id'],
		}

		this.deskService.createDesk(desk).subscribe(() => {
			this.form.reset();
		});

		this.submitted = true;

		this.close.emit();
	}
}
