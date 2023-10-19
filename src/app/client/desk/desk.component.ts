import {Component, OnDestroy, OnInit} from '@angular/core';
import {DeskService} from '../../shared/services/desk.service';
import {Desk} from '../../shared/interfaces/desk';
import {Observable, Subscription, switchMap} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
	selector: 'app-desk',
	templateUrl: './desk.component.html',
})
export class DeskComponent implements OnInit, OnDestroy {
	desk$!: Observable<Desk>;
	desks!: Desk[];
	subscriptions: Subscription = new Subscription();

	constructor(
		private route: ActivatedRoute,
		private deskService: DeskService,
	) {
	}
	ngOnInit() {
		this.desk$ = this.route.params
			.pipe(
				switchMap((params: Params) => {
					return this.deskService.getDeskById(params['id']);
				})
			)
	}

	ngOnDestroy() {
		this.subscriptions?.unsubscribe();
	}

}
