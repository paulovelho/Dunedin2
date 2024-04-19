import { IObjectKeys } from "@app/_general";

export interface iUser extends IObjectKeys {
	id: string;
	active: boolean;
	name: string;
	email: string;
	language?: string;
	phone_number?: string;
	role: string;
	updated_at: string;
	last_login: string;
}
