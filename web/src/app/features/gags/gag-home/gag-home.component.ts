import { Component } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { SearchInputComponent } from '../search-input/search-input.component';
import { GagsService } from '../gags.service';
import { GagsApi } from '../gags.api';
import { GagListComponent } from '../gag-list/gag-list.component';
import { iGag } from '../gag.interface';

@Component({
  selector: 'app-gag-home',
  standalone: true,
  imports: [
		SharedModule,
		SearchInputComponent,
		GagListComponent,
	],
	providers: [ GagsService, GagsApi ],
  templateUrl: './gag-home.component.html',
  styleUrl: './gag-home.component.scss'
})
export class GagHomeComponent {

	public loading: boolean = false;
	public total?: number;
	public data: iGag[] = [];

	constructor(
		private service: GagsService,
	) { }

	public search(query: string) {
		console.info("searching ", query);
		this.loading = true;
		this.service.searchGag(query)
			.subscribe({
				next: (rs) => {
					this.total = rs.total;
					this.data = rs.content;
					this.loading = false;
				}
			});
	}

	public nextPage() {
		this.service.nextPage()
			.subscribe({
				next: (rs: any) => {
					this.data = this.data.concat(rs.content);
				}
			});
	}

}
