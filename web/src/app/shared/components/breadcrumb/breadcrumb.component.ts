import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterModule, UrlSegment } from '@angular/router';
import { AppConfig } from '@app/app.config';
import { NavigationService } from '@app/services/navigation/navigation.service';

@Component({
	selector: 'app-breadcrumb',
	standalone: true,
	encapsulation: ViewEncapsulation.None,
	imports: [CommonModule, RouterModule],
	providers: [NavigationService],
	templateUrl: './breadcrumb.component.html',
	styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
	public breadcrumbs: {
		name: string;
		url: string
	}[] = [];
	public title?: string;
	public show: boolean = false;

	constructor(
		public router: Router,
		private activateRoute: ActivatedRoute,
		private _title: Title,
		private _config: AppConfig,
		private nav: NavigationService,
	) {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) this.Initialize();
		});
	}

	public Initialize(): void {
		this.breadcrumbs = [];
		this.parseRoute(this.router.routerState.snapshot.root);
		this.title = this._config.getTitle();
		if(this.breadcrumbs.length == 0) {
			this.show = false;
			return;
		}
		this.breadcrumbs.forEach(breadcrumb => {
			this.title += ' > ' + breadcrumb.name;
		});
		this._title.setTitle(this.title);
		this.show = true;
	}

	public goHome() {
		this.nav.goHome();
	}

	private parseRoute(node: ActivatedRouteSnapshot) {
		if (node.data['breadcrumb']) {
			if (node.url.length) {
				let urlSegments: UrlSegment[] = [];
				node.pathFromRoot.forEach(routerState => {
					urlSegments = urlSegments.concat(routerState.url);
				});
				let url = urlSegments.map(urlSegment => {
					return urlSegment.path;
				}).join('/');
				this.breadcrumbs.push({
					name: node.data['breadcrumb'],
					url: '/' + url
				})
			}
		}
		if (node.firstChild) {
			this.parseRoute(node.firstChild);
		}
	}
}
