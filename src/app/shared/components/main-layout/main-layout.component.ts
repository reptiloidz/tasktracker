import {Component, HostBinding} from '@angular/core';

@Component({
	selector: 'app-main-layout',
	templateUrl: './main-layout.component.html',
	styles: []
})
export class MainLayoutComponent {
	@HostBinding('class') class = 'd-flex flex-column flex-grow-1';
}
