import { Routes } from "@angular/router";
import { UsersComponent } from "./users.component";
import { UsersFormComponent } from "./users-form/users-form.component";

export const routes: Routes = [
	{
		path: '',
		component: UsersComponent,
	},
	{
		path: 'view/:id',
		component: UsersFormComponent,
		data: { breadcrumb: "view" },
	},
	{
		path: 'new',
		component: UsersFormComponent,
		data: { breadcrumb: "new" },
	},
];

