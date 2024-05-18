import { Injectable, Injector } from "@angular/core";
import { BaseApi } from "@services/api/base.api";
import { Observable } from "rxjs";
import { iGag } from "./gag.interface";

@Injectable()
export class GagsApi extends BaseApi {
	constructor(
		injector: Injector
	) {
		super(injector);
	}

	public getAll(): Observable<any> {
		let url = this.url("/gags");
		return this.get(url).pipe(this.defaultMap);
	}

	public getById(id:string): Observable<any> {
		let url = this.url('/gag/:id').params({ id });
		return this.get(url).pipe(this.defaultMap);
	}

	public update(key: iGag): Observable<any> {
		let id = key.id;
		let url = this.url('/gags/:id').params({ id });
		return this.put(url, key);
	}

	public insert(data: any): Observable<any> {
		let url = this.url('/gags');
		return this.post(url, data);
	}

	public search(query: string, page?: number): Observable<any> {
		return this.post(this.url('/search').queryParams({ page }), { q: query })
			.pipe(this.defaultMap);
	}
	public author(query: string, page?: number): Observable<any> {
		return this.post(this.url('/author').queryParams({ page }), { q: query })
			.pipe(this.defaultMap);
	}

	public shared(hash: string): Observable<any> {
		const url = this.url("/shared").queryParams({ q: hash });
		return this.get(url)
			.pipe(this.defaultMap);
	}

}
