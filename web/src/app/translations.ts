import { APP_INITIALIZER, inject, Injectable } from "@angular/core";
import { EnvironmentProviders } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { provideTransloco, Translation, TranslocoLoader, TranslocoService } from '@ngneat/transloco';
import { environment } from '../environments/environment';
import { Observable } from "rxjs";

let prodMode: boolean = environment.production;

@Injectable({ providedIn: 'root' })
class TranslocoHttpLoader implements TranslocoLoader {
	private http = inject(HttpClient);
	getTranslation(lang: string) {
		return this.http.get<Translation>(`../assets/i18n/${lang}.json`);
	}
}

export const availableLanguages: { [key: string]: string; } = {
	'en': "English",
	'pt': "Português",
	'vt': "Vietnamese",
	'ch': "Chinese",
};

export function preloadLang(transloco: TranslocoService) {
  return (): Observable<any> => {
		let defaultLang: string = "en";
		transloco.setActiveLang(defaultLang);
		return transloco.load(defaultLang);
	}
};

export const translationProvider: EnvironmentProviders[] = provideTransloco({
	config: {
		availableLangs: Object.keys(availableLanguages),
		defaultLang: 'en',
		// Remove this option if your application doesn't support changing language in runtime.
		reRenderOnLangChange: true,
		prodMode,
	},
	loader: TranslocoHttpLoader,
});
