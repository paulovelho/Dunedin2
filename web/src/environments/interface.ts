import { IObjectKeys } from "@app/_general";

export interface iEnv extends IObjectKeys {
	envName: string;
	dev: boolean;
  production: boolean;
	debug: boolean;
  api: any;
}

export interface ClientData {
	name: string;
	title: string;
	description: string;
	project: string;
	active: boolean;
}
