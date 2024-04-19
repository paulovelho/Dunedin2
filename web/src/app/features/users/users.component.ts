import { Component } from '@angular/core';
import { components } from './users.module';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
	standalone: true,
	imports: [...components],
})
export class UsersComponent {  
}
