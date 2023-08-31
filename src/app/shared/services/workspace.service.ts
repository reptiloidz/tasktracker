import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {FbCreateResponse, Workspace} from '../interfaces/desk';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class WorkspaceService {
	constructor(
		private http: HttpClient,
	) {
	}

	createDesk(workspace: Workspace): Observable<Workspace> {
		return this.http.post<Workspace>(`${environment.fbDbUrl}/workspace.json`, workspace)
			.pipe(map((response: FbCreateResponse | any) => {
				return {
					...workspace,
					id: response.name
				}
			}))
	}

	getAllWorkspaces(): Observable<Workspace[] | null> {
		return this.http.get(`${environment.fbDbUrl}/workspace.json`)
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
}
