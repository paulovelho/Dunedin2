import { Component, ViewEncapsulation } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
	standalone: true,
	imports: [ SharedModule ],
})
export class HomeComponent {  
}
