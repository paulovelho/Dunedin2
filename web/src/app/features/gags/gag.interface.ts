import { IObjectKeys } from "@app/_general";

export interface iGag extends IObjectKeys {
	id: string;
	content: string;
	author: string;
	location: string;
	origin?: string;
	gag_hash?: string;
	highlight_date: string;
	used_in: string;
}
