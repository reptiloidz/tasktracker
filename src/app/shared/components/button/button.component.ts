import {Component, ContentChild, Input, TemplateRef} from '@angular/core';

@Component({
	selector: '[app-shared-button]',
	templateUrl: './button.component.html',
})
export class ButtonComponent {

	/** Классы внутренней обертки */
	@Input() btnInnerClass: string | null = null;

	/** Классы текста */
	@Input() textClass: string | null = null;

	@ContentChild('contentTemplate') contentTemplate: TemplateRef<unknown> | undefined;
}
