import { APP_INITIALIZER, ApplicationConfig } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";
import { provideClientHydration } from "@angular/platform-browser";
import { provideRouter, withDebugTracing, withHashLocation } from "@angular/router";
import { routes } from "@app/routes";

import { TranslocoService } from "@ngneat/transloco";
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { translationProvider, preloadLang } from './translations';

import { environment } from '../environments/environment';
import { Store } from "@services/store/store.service";
import { Toaster } from "@services/toaster/toaster.service";
import { RequestCache } from "@services/api/cache-interceptor/request-cache";
import { RequestCacheWithMap } from "@services/api/cache-interceptor/request-cache-map";

let debug = environment.debug;
let debugRoute = debug;
let routeProvider;
if(debugRoute) {
	routeProvider = provideRouter(routes, withHashLocation(), withDebugTracing());
} else {
	routeProvider = provideRouter(routes, withHashLocation());
}

export const appConfig: ApplicationConfig = {
	providers: [
		Store,
		Toaster,
		provideHttpClient(),
		routeProvider,
		provideAnimations(),
		provideClientHydration(),
		provideToastr(),
		translationProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: preloadLang,
      multi: true,
      deps: [TranslocoService],
    },
    { provide: RequestCache, useClass: RequestCacheWithMap },
	],
}

