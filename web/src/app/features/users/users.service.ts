import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UsersApi } from './users.api';
import { iUser } from './user.interface';
import { DatePipe } from '@angular/common';
import { TranslocoService } from '@ngneat/transloco';

@Injectable()
export class UsersService {

	constructor(
		private transloco: TranslocoService,
		private datePipe: DatePipe,
		private api: UsersApi,
	) { }

	public getObjFromData(u: any): iUser {
		let loginUser: any = u['loginUser'];
		let dateFormat: string = this.transloco.translate("date-format");
		let user: iUser = {
			id: u['id'],
			active: u['active'],
			name: u['name'],
			email: loginUser['email'],
			phone_number: u['phone_number'],
			role: u['role'],
			roleName: u['roleName'],
			language: u['language'],
			updated_at: u['updated_at'],
			last_login: this.datePipe.transform(loginUser['last_login'], dateFormat)!
		};
		return user;
	}

	public newUser(): iUser {
		return this.getObjFromData({ loginUser: {} });
	}

	public GetUsers(): Observable<iUser[]> {
		return this.api.getUsers()
			.pipe(
				map((rs: any[]) => {
					return rs.map(u => this.getObjFromData(u));
				})
			);
	}

	public GetUserById(id: string): Observable<iUser> {
		return this.api.getById(id)
			.pipe(map(rs => this.getObjFromData(rs)));
	}

	public Save(user: iUser): Promise<boolean> {
		return new Promise((resolve, reject) => {
			if (user.id != null) {
				this.api.update(user)
					.subscribe(rs => resolve(rs.success));
			} else {
				this.api.insert(user)
					.subscribe(rs => {
						if(rs.success) resolve(true);
						else reject(rs);
					});
			}
		});
	}

	public getMyAccount(): Observable<iUser> { 
		return this.api.getMe()
			.pipe(map(rs => this.getObjFromData(rs)));
	}
	public saveMyData(data: iUser): Observable<boolean> {
		return this.api.saveMe(data);
	}
	public changePassword(pass: string): Observable<boolean> {
		return this.api.changePassword(pass);
	}

}
