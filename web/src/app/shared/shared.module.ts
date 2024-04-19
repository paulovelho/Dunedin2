import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TranslocoModule } from '@ngneat/transloco';

// services:
import { AppConfig } from '@app/app.config';
import { ApiService } from '@services/api/api.service';
import { AuthService } from '@services/auth/authentication.service';
import { AuthApi } from '@services/auth/auth.api';
import { CacheInterceptor } from '@services/api/cache-interceptor/cache.interceptor';
import { NavigationService } from '@services/navigation/navigation.service';
import { Store } from '@services/store/store.service';
import { Toaster } from '@services/toaster/toaster.service';

import { ApiManager } from '@services/api/api-manager.service';
import { ApiInterceptor } from '@services/api/api.interceptor';
import { ApiDelayerInterceptor } from '@services/api/delayer.interceptor';
import { ErrorHandler } from '@services/error-handler/error-handler.service';

// directives

// components:
import { AppCardComponent } from './components/app-card/app-card.component';
import { AppWindowComponent } from './components/app-window/app-window.component';
import { ApiImageComponent } from './components/api-image/api-image.component';
import { PlatypusLoaderComponent } from './components/platypus-loader/platypus-loader.component';

// form components:
import { ButtonComponent } from './components/forms/button/button.component';
import { GroupComponent } from './components/forms/group/group.component';
import { InputComponent } from './components/forms/input/input.component';
import { SelectComponent } from './components/forms/select/select.component';
import { TableComponent } from './components/table/table.component';
import { TextComponent } from './components/forms/text/text.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,
		RouterModule,
		TranslocoModule,

		ApiImageComponent,
		AppCardComponent,
		AppWindowComponent,
		PlatypusLoaderComponent,
		TableComponent,

		ButtonComponent,
		GroupComponent,
		InputComponent,
		SelectComponent,
		TextComponent,
	],
	declarations: [
	],
	providers: [
		ApiService,
		ApiManager,
		AppConfig,
		AuthService,
		AuthApi,
		DatePipe,
		ErrorHandler,
		NavigationService,
		Store,
		Toaster,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: CacheInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ApiInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ApiDelayerInterceptor,
			multi: true,
		},
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		TranslocoModule,

		ApiImageComponent,
		AppCardComponent,
		AppWindowComponent,
		PlatypusLoaderComponent,
		TableComponent,

		ButtonComponent,
		GroupComponent,
		InputComponent,
		SelectComponent,
		TextComponent,
	]
})
export class SharedModule { }
