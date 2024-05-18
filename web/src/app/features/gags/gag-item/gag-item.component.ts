import { Component, Input } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { SharedModule } from '@app/shared/shared.module';
import { iGag } from '../gag.interface';
import { Toaster } from '@app/services/toaster/toaster.service';

@Component({
  selector: 'app-gag-item',
  standalone: true,
  imports: [ SharedModule ],
  templateUrl: './gag-item.component.html',
  styleUrl: './gag-item.component.scss'
})
export class GagItemComponent {

	constructor(
		private clipboard: Clipboard,
		private toaster: Toaster,
	) {
		console.log(location.origin);
		console.log(location.href);
		console.log(location.pathname);		
	}

	@Input() item?: iGag

	public share() {
		const hash = this.item?.id + "-" + this.item?.gag_hash;
		const path = location.origin + "/#";
		const link = path + "/shared?q="+hash;
		this.clipboard.copy(link);
		this.toaster.success("link copied to clipboard: [" + hash + "]");
	}

}
