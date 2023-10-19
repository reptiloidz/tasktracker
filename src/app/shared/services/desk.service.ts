import {Injectable} from '@angular/core';
import {Desk, FbCreateResponse, Workspace} from '../interfaces/desk';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {WorkspaceService} from './workspace.service';

@Injectable({providedIn: 'root'})
export class DeskService {
	constructor(
		private http: HttpClient,
	) {
	}

	createDesk(desk: Desk): Observable<Desk> {
		return this.http.post<Desk>(`${environment.fbDbUrl}/desk.json`, desk)
			.pipe(map((response: FbCreateResponse | any) => {
				return {
					...desk,
					id: response.name,
				}
			}))
	}

	getAllDesks(): Observable<Desk[] | null> {
		return this.http.get(`${environment.fbDbUrl}/desk.json`)
			.pipe(map((response: {[key: string]: any}) => {
				if (response) {
					return Object
						.keys(response)
						.map(key => ({
							...response[key],
							id: key,
						}))
				}
				return null;
			}))
	}

	getDeskById(id: string): Observable<Desk> {
		return this.http.get<Desk>(`${environment.fbDbUrl}/desk/${id}.json`)
			.pipe(
				map((desk: Desk) => {
					return {
						...desk,
						id,
					};
				})
			);
	}

	remove(id: string | undefined): Observable<void> {
		return this.http.delete<void>(`${environment.fbDbUrl}/desk/${id}.json`);
	}
}
