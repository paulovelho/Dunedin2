import { Injectable, Injector } from "@angular/core";
import { BaseApi } from "@services/api/base.api";
import { Observable } from "rxjs";
import { iUser } from "./user.interface";

@Injectable()
export class UsersApi extends BaseApi {
	constructor(
		injector: Injector
	) {
		super(injector);
	}

	public getUsers(): Observable<any> {
		let url = this.url("/users");
		return this.get(url).pipe(this.defaultMap);
	}

	public getById(id:string): Observable<any> {
		let url = this.url('/user/:id').params({ id });
		return this.get(url).pipe(this.defaultMap);
	}

	public update(user: any): Observable<any> {
		let id = user.id;
		let url = this.url('/user/:id').params({ id });
		return this.put(url, user);
	}

	public insert(user: any): Observable<any> {
		let url = this.url('/users');
		return this.post(url, user);
	}

	public getMe(): Observable<iUser> {
		let url = this.url("/me");
		return this.get(url).pipe(this.defaultMap);		
	}
	public saveMe(data: iUser): Observable<boolean> {
		let url = this.url("/me");
		return this.put(url, data).pipe(this.defaultMap);
	}
	public changePassword(password: string): Observable<boolean> {
		let url = this.url("/change-password");
		return this.put(url, { password }).pipe(this.defaultMap);
	}

}
