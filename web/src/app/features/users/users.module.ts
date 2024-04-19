import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersApi } from './users.api';
import { UsersService } from './users.service';
import { UsersFormComponent } from './users-form/users-form.component';
import { routes } from './users.routes';

export const components = [
	UsersComponent,
	UsersListComponent,
	UsersFormComponent,
];
export const userProviders = [
	UsersApi,
	UsersService,
];

@NgModule({
  imports: [
		...components,
    RouterModule.forChild(routes),
  ],
})
export class UsersModule { }
