import {ChangeDetectorRef, Component, ContentChild, EventEmitter, Injector, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {
	FormControl,
	FormControlDirective,
	FormControlName,
	FormGroupDirective,
	NG_VALUE_ACCESSOR,
	NgControl,
	UntypedFormControl
} from '@angular/forms';
import {BehaviorSubject, distinctUntilChanged, Subscription} from 'rxjs';

@Component({
	selector: 'app-shared-text-input',
	templateUrl: './text-input.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: TextInputComponent,
		}
	],
})
export class TextInputComponent implements OnInit {
	@Input() type: string = 'text';
	@Input() placeholder: string = '';
	@Input() inputClasses: string = '';
	@Input() inputWrapperClasses: string = '';
	@Input() animatedTitle: boolean = true;

	@Output() focusHandle: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

	@ContentChild('placeholder') placeholderTemplate: TemplateRef<any> | undefined;
	@Output() blurHandle: EventEmitter<any> = new EventEmitter<any>();

	isFocused: boolean = false;

	private onTouched = () => { };
	private subscription = new Subscription();

	/** Фокус инпута */
	public focusEvent = new BehaviorSubject<boolean>(false);
	/** Блюр инпута */
	public blurEvent = new BehaviorSubject<boolean>(false);

	constructor(
		private cdr: ChangeDetectorRef,
		private injector: Injector,
	) { }

	ngOnInit() {

	}
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
