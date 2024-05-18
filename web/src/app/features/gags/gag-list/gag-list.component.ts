import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { SharedModule } from '@app/shared/shared.module';
import { iGag } from '../gag.interface';
import { GagItemComponent } from '../gag-item/gag-item.component';
import { Toaster } from '@app/services/toaster/toaster.service';

@Component({
  selector: 'app-gag-list',
  standalone: true,
  imports: [
		SharedModule,
		GagItemComponent,
	],
  templateUrl: './gag-list.component.html',
  styleUrl: './gag-list.component.scss'
})
export class GagListComponent {

	@Input() loading: boolean = false;
	@Input() list: iGag[] = [];
	@Input() total?: number;
	@Output() nextPage: EventEmitter<void> = new EventEmitter<void>();

	constructor(
		private clipboard: Clipboard,
		private toaster: Toaster,
	) { }

	public share() {
		const link = this.getLink();
		this.clipboard.copy(link);
		this.toaster.success("link copied to clipboard with "+this.list.length+" gags");
	}

	public getHashes() {
		let hash = this.list.map(gag => gag.id + "-" + gag.gag_hash);
		return hash.join(',');
	}

	public getLink() {
		const path = location.origin + "/#";
		const link = path + "/shared?q="+this.getHashes();
		return link;
	}

}
