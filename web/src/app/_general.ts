export interface IObjectKeys {
  [key: string]: string|number|boolean|Date|null|undefined;
}

export interface iObject extends IObjectKeys {
	id: string;
	created_at?: Date;
	updated_at?: Date;
}
