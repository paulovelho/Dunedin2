import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from '@app/app.state';
import { AuthService } from '@app/services/auth/authentication.service';
import { NavigationService } from '@app/services/navigation/navigation.service';
import { Toaster } from '@app/services/toaster/toaster.service';
import { SharedModule } from '@app/shared/shared.module';
import { iStoreUser } from '@services/store/store.interface';
import { Store } from '@services/store/store.service';

@Component({
	selector: 'app-navbar',
	standalone: true,
	encapsulation: ViewEncapsulation.None,
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	imports: [ SharedModule ],
})

export class NavbarComponent implements OnInit {
	@Input() showUser: boolean = true;
	public isMenuCollapsed: boolean = false;
	public navTitle?: string = "...";
	public user: iStoreUser|null = null;
	public keyVal: string = "-";
	public keyFolder: string = "";

	constructor(
		private _state: AppState,
		private Store: Store,
		private toaster: Toaster,
		private auth: AuthService,
		private nav: NavigationService,
	) {
	}

	ngOnInit(): void {
		this.loadUser();
	}

	public toggleMenu() {
		console.info("toggling menu");
		this._state.toggle('menu.isCollapsed');
	}

	public async loadUser() {
		this.user = await this.Store.getLoggedUser();
		this.navTitle = this.user?.email;
		let tag = this.user?.name ?? this.user?.email;
	}

	public copyKey() {
		let val = this.keyVal;
		const selBox = document.createElement('textarea');
		selBox.style.position = 'fixed';
		selBox.style.left = '0';
		selBox.style.top = '0';
		selBox.style.opacity = '0';
		selBox.value = val;
		document.body.appendChild(selBox);
		selBox.focus();
		selBox.select();
		document.execCommand('copy');
		document.body.removeChild(selBox);
		this.toaster.success(`key [${val}] copied to clipboard`);
	}

	public goHome() {
		this.nav.goHome();
	}

	public navMyData() {
		this.nav.myAccount();
	}

	public navDev() {
		this.nav.goDev();
	}

	public navKeys() {
		this.nav.keyHome();
	}

	public viewKey() {
		this.nav.keyView();
	}

	public logout() {
		this.auth.logout();
	}

}
