import {Component, ViewEncapsulation} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class AppComponent {

	mainTitle = 'Task Tracker';
	constructor(
		private title: Title,
	) {
		title.setTitle(this.mainTitle);
	}
}
