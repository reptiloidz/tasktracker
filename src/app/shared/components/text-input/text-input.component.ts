import {Component, ContentChild, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import {BehaviorSubject} from 'rxjs';

@Component({
	selector: 'app-shared-text-input',
	templateUrl: './text-input.component.html',
})
export class TextInputComponent {
	@Input() type: string = 'text';
	@Input() placeholder: string = '';
	@Input() inputClasses: string = '';
	@Input() inputWrapperClasses: string = '';
	@Input() animatedTitle: boolean = true;

	@Output() focusHandle: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

	@ContentChild('placeholder') placeholderTemplate: TemplateRef<any> | undefined;
	@Output() blurHandle: EventEmitter<any> = new EventEmitter<any>();

	isFocused: boolean = false;

	private onTouched = () => {};

	/** Фокус инпута */
	public focusEvent = new BehaviorSubject<boolean>(false);
	/** Блюр инпута */
	public blurEvent = new BehaviorSubject<boolean>(false);

	focusHandler(event: FocusEvent) {
		this.isFocused = true;
		this.focusHandle.emit(event);
		this.focusEvent.next(this.isFocused);
	}

	blurHandler(event: Event) {
		this.isFocused = false;
		this.markAsTouched();
		this.blurHandle.emit(event);
		this.blurEvent.next(this.isFocused);
	}
	markAsTouched() {
		this.onTouched();
	}

	get canMoveTitle(): boolean {
		if (!this.animatedTitle) return false;

		return this.isFocused;
	}
}
