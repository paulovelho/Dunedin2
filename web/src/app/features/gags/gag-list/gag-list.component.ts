import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { iGag } from '../gag.interface';
import { GagItemComponent } from '../gag-item/gag-item.component';

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

}
