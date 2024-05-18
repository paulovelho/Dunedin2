import { Injectable } from '@angular/core';
import { GagsApi } from './gags.api';
import { Observable, map } from 'rxjs';
import { iGag } from './gag.interface';

@Injectable({
  providedIn: 'root'
})
export class GagsService {

	public query?: string;
	public author?: string;
	public page?: number = 0;
	public total?: number;

  constructor(
		private api: GagsApi
	) { }

	public getObjFromData(k: any): iGag {
		let gag: iGag = {
			id: k['id'],
			content: k['content'],
			author: k['author'],
			location: k['location'],
			origin: k['origin'],
			gag_hash: k['gag_hash'],
			highlight_date: k['highlight_date'],
			used_in: k['used_in'],
			created_at: k['created_at'],
			updated_at: k['updated_at'],
		};
		return gag;
	}

	public searchGag(query: string): Observable<any> {
		this.query = query;
		this.page = 0;
		return this.callSearchGagsApi();
	}
	public getAuthor(author: string): Observable<any> {
		return this.api.author(author);
	}

	public nextPage() {
		this.page = this.page! + 1;
		return this.callSearchGagsApi();
	}

	public callSearchGagsApi(): Observable<any> {
		// console.info("searching page [" + this.page + "]: ", this.query);
		return this.api.search(this.query!, this.page)
			.pipe(
				map( rs => {
					this.total = rs.total;
					let data = rs.data.map((g: any) => this.getObjFromData(g));
					return {
						total: rs.total,
						content: data
					}
				})
			);
	}

	public getShared(value: string) {
		return this.api.shared(value)
			.pipe(
				map( rs => rs.map((g: any) => this.getObjFromData(g)) )
			);
	}

}
