import { Routes } from "@angular/router";
import { AccountHomeComponent } from "./account-home/account-home.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";

export const routes: Routes = [
	{
		path: '',
		component: AccountHomeComponent,
		data: { breadcrumb: "me" },
	},
	{
		path: 'change-password',
		component: ChangePasswordComponent,
		data: { breadcrumb: "change password" },
	},
];
