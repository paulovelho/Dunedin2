import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '@app/shared/components/nav-bar/navbar.component';
import { SharedModule } from '@app/shared/shared.module';
import { iGag } from '../gag.interface';
import { GagsApi } from '../gags.api';
import { GagsService } from '../gags.service';
import { GagItemComponent } from '../gag-item/gag-item.component';

@Component({
  selector: 'app-shared-gag',
  standalone: true,
  imports: [
		SharedModule,
		GagItemComponent,
		NavbarComponent,
	],
	providers: [ GagsService, GagsApi ],
  templateUrl: './shared-gag.component.html',
  styleUrl: './shared-gag.component.scss'
})
export class SharedGagComponent implements OnInit {

	public hash?: string;
	public loading: boolean = true;
	public gags: iGag[] = [];

	constructor(
		private route: ActivatedRoute,
		private service: GagsService,
	) { }

	ngOnInit(): void {
		this.route.queryParams.subscribe(params => {
			this.hash = params["q"];
			this.getGag();
		});
	}

	private getGag(): void {
		this.service.getShared(this.hash!)
			.subscribe(rs => {
				this.gags = rs;
				this.loading = false;
			});
	}


}
