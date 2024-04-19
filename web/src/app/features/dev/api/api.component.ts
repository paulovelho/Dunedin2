import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api/api.service';
import { SharedModule } from '@app/shared/shared.module';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-api',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './api.component.html',
  styleUrl: './api.component.scss'
})
export class ApiComponent implements OnInit {
	constructor(
		private apiService: ApiService
	) {
		this.env = environment['envName'];
		this.api = environment['api'];
	}
	public loading: boolean = true;
	public env: string;
	public api: string;
	public apiResponse?: string;

	ngOnInit(): void {
		this.loadApiInfo();
	}

	public loadApiInfo() {
		let apiInfoUrl = this.api;
		this.apiService.getApi(apiInfoUrl, null, false)
			.subscribe(a => {
				this.loading = false;
				this.apiResponse = a;
			});
	}

}
