import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { UsersService } from '../users.service';
import { UsersApi } from '../users.api';
import { TranslocoService } from '@ngneat/transloco';
import { NavigationService } from '@services/navigation/navigation.service';
import { iUser } from '../user.interface';

@Component({
  selector: 'app-users-list',
  standalone: true,
	encapsulation: ViewEncapsulation.None,
  imports: [ SharedModule ],
	providers: [ UsersService, UsersApi ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
	public loading: boolean = false;
	public users: iUser[] = [];
	public items: any[] = [];
	public keys: string[] = [];
	public titles: any = {};

	constructor(
		private transloco: TranslocoService,
		private nav: NavigationService,
		private userService: UsersService,
	) {
	}

	ngOnInit(): void {
		this.loading = true;
		this.setKeys();
		this.userService.GetUsers()
			.subscribe(data => {
				this.users = data;
				this.loading = false;
				this.manageUsers();
			});
	}

	private setKeys(): void {
		this.keys = ["id_display", "name", "email", "roleName", "last_login"];
		this.keys.forEach(k => this.titles[k] = this.transloco.translate('users.title-'+k));
	}

	private manageUsers(): void {
		this.users.forEach((u) => {
			this.items.push(Object.assign({}, u, { 'id_display': "#"+u.id }));
		});
	}

	public userClick(user: any): void {
		let userId = user?.id;
		if(!userId) return;
		this.nav.userView(userId);
	}

	public addUser(): void {
		this.nav.userNew();
	}

}
