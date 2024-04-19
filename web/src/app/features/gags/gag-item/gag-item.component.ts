import { Component, Input } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { iGag } from '../gag.interface';

@Component({
  selector: 'app-gag-item',
  standalone: true,
  imports: [ SharedModule ],
  templateUrl: './gag-item.component.html',
  styleUrl: './gag-item.component.scss'
})
export class GagItemComponent {

	@Input() item?: iGag

}
