import { Route, Routes } from '@angular/router';
import { ErrorComponent } from './shared/error/error.component';
import { MainComponent } from './shared/layout/main.component';
import { IsAdmin, IsLogged, IsManager } from './services/auth/auth-guard.service';
import { SharedGagComponent } from './features/gags/shared-gag/shared-gag.component';

const devRoute = {
	path: 'dev',
	canActivate: [IsLogged],
	loadChildren: () => import("./features/dev/dev.module").then(m => m.DevModule),
};
const loginRoute =	{
	path: 'login',
	loadChildren: () => import("./features/login/login.module").then(m => m.LoginModule),
};


export const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	loginRoute,
	{
		path: 'single',
		children: [
			devRoute,
		],
	},
	{
		path: 'shared',
		component: SharedGagComponent,
	},
	{
		path: 'app',
		component: MainComponent,
		children: [
			{
				path: '',
				redirectTo: 'home',
				pathMatch: 'full'
			},
			{
				path: 'home',
				canActivate: [IsLogged],
				loadChildren: () => import("./features/gags/gags.module").then(m => m.GagsModule),
			},
			{
				path: 'my-account',
				canActivate: [IsLogged],
				loadChildren: () => import("./features/my-account/my-account.module").then(m => m.MyAccountModule),
			},
			{
				path: 'users',
				canActivate: [IsAdmin],
				loadChildren: () => import("./features/users/users.module").then(m => m.UsersModule),
			},
			devRoute,
		],
	},
	{ path: '**', component: ErrorComponent }
];
