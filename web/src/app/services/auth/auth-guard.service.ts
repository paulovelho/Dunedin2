import { inject } from '@angular/core';
import { Store } from '../store/store.service';
import { Toaster } from '../toaster/toaster.service';

export const IsLogged = async (): Promise<boolean> => {
	const store = inject(Store);
	const toaster = inject(Toaster);
	let logged = await store.isLogged();
	if (!logged) {
		toaster.error("ERROR: User not logged");
		return false;
	}
	return true;
}

export const IsAdmin = async (): Promise<boolean> => {
	const store = inject(Store);
	const toaster = inject(Toaster);
	const user = await store.loadUserFromStorage();
	if (!user) { toaster.error("user is null"); return false; }
	if (user?.role == "ADMIN") {
		return true;
	}
	toaster.error("ERROR: Not authorized - [" + user?.role + "]");
	return false;
}

export const IsManager = async (): Promise<boolean> => {
	const store = inject(Store);
	const toaster = inject(Toaster);
	const user = await store.loadUserFromStorage();
	if (!user) { toaster.error("user is null"); return false; }
	if (user?.role == "ADMIN" || user?.role == "MANAGER") {
		return true;
	}
	toaster.error("ERROR: Not authorized - [" + user?.role + "]");
	return false;
}
