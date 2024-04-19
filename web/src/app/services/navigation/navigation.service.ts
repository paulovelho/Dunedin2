import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class NavigationService {

	private pagesUrl: string = "app";

	constructor(
		private router: Router
	) { }

	public Login(): void {
		this.router.navigate(['login']);
	}

	public goHome(): void {
		this.router.navigate([this.pagesUrl]);
	}

	public explore(): void {
		this.router.navigate([this.pagesUrl, "explore"]);
	}

	public goDev(): void {
		this.router.navigate([this.pagesUrl, "dev"]);
	}

	public myAccount(): void {
		this.router.navigate([this.pagesUrl, "my-account"]);
	}
	public changePassword(): void {
		this.router.navigate([this.pagesUrl, "my-account", "change-password"]);
	}

	public userList(): void {
		this.router.navigate([this.pagesUrl, 'users']);
	}
	public userView(userId: string): void {
		this.router.navigate([this.pagesUrl, 'users', 'view', userId]);
	}
	public userNew(): void {
		this.router.navigate([this.pagesUrl, 'users', 'new']);
	}

	public keyHome(): void {
		this.router.navigate([this.pagesUrl, "keys"]);
	}
	public keyView(): void {
		this.router.navigate([this.pagesUrl, "keys", "view"]);
	}
	public keyNew(): void {
		this.router.navigate([this.pagesUrl, "keys", "new"]);
	}

}
