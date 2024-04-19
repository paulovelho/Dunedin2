import { Component, OnInit, ViewEncapsulation  } from '@angular/core';

import { CommonModule, Location } from '@angular/common';
import { BreadcrumbComponent } from '@app/shared/components/breadcrumb/breadcrumb.component';
import { NavbarComponent } from '@app/shared/components/nav-bar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { AppState } from '@app/app.state';

const imports = [
	BreadcrumbComponent,
	CommonModule,
	RouterOutlet,
	NavbarComponent,
];
const providers = [ AppState ];

@Component({
	selector: 'app-layout-main',
	standalone: true,
	encapsulation: ViewEncapsulation.None,
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
	imports, providers,
})
export class MainComponent implements OnInit {

	public isMenuCollapsed:boolean = true;

	constructor(
		private _state: AppState,
		private _location: Location
	) {
		this.isMenuCollapsed = this._state.getState('menu.isCollapsed');
		this._state.subscribe('menu.isCollapsed', (isCollapsed: boolean) => {
			this.isMenuCollapsed = isCollapsed;
		});
	}

	ngOnInit() {
		this.getCurrentPageName();
	}

	public getCurrentPageName():void{       
		let url = this._location.path();
		let hash = (window.location.hash) ? '#' : '';    
	}

	public ngAfterViewInit(): void {
	}

}
