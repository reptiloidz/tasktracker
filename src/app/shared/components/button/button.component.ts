import {Component, ContentChild, ElementRef, HostBinding, Input, TemplateRef} from '@angular/core';

@Component({
	selector: '[app-shared-button]',
	templateUrl: './button.component.html',
})
export class ButtonComponent {

	/** Классы внутренней обертки */
	@Input() btnInnerClass: string | null = null;

	/** Классы иконки */
	@Input() iconClass: string | null = null;

	/** Классы текста */
	@Input() textClass: string | null = null;

	/** Атрибут type */
	@Input() type: string | null = null;

	@ContentChild('contentTemplate') contentTemplate: TemplateRef<unknown> | undefined;

	@HostBinding('attr.type') get typeAttr(): string | null {
		return this.type || (this.elementRef.nativeElement.nodeName?.toLowerCase() === 'button'
			? 'button'
			: null
		);
	}

	constructor(
		public elementRef: ElementRef,
	) {
	}
}
