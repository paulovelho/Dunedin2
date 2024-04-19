import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';

import { UsersService } from '../users.service';
import { UsersApi } from '../users.api';
import { iUser } from '../user.interface';
import { iOption, objToOptions } from '@app/shared/components/forms/select/select.component';
import { availableLanguages } from '@app/translations';
import { availableRoles } from '../roles.enum';

import { Toaster } from '@app/services/toaster/toaster.service';
import { TranslocoService } from '@ngneat/transloco';
import { NavigationService } from '@app/services/navigation/navigation.service';
import { FormService } from '@app/services/form/form.service';

const imports = [
	SharedModule,
];

@Component({
	selector: 'app-users-form',
	standalone: true,
	imports,
	providers: [UsersService, UsersApi],
	templateUrl: './users-form.component.html',
	styleUrl: './users-form.component.scss'
})
export class UsersFormComponent implements OnInit {

	private id: string | null = null;
	public loading: boolean = false;
	public isNew: boolean = false;
	public title: string = "";
	public user?: iUser;
	public name?: string = "...";

	public languages: iOption[] = [];
	public roles: iOption[] = [];

	public form?: FormGroup;

	constructor(
		public fs: FormService,
		private route: ActivatedRoute,
		private transloco: TranslocoService,
		private nav: NavigationService,
		private service: UsersService,
		private toaster: Toaster,
	) { }

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get("id");
		this.loadLanguages();
		this.loadRoles();
		this.loadUser();
		this.buildForm();
	}

	private loadLanguages() {
		this.languages = objToOptions(availableLanguages);
	}

	private loadRoles() {
		this.roles = objToOptions(availableRoles);
	}

	private buildForm(): void {
		let formItems = {
			'name': ['', Validators.required],
			'email': ['', Validators.required],
			'phone_number': [''],
			'language': [''],
			'role': ['', Validators.required],
		};
		if(this.isNew) Object.assign(formItems, { 'password': ['', Validators.required] });
		this.form = this.fs.BuildFromGroup(formItems);
	}
	private setUser(user: iUser): void {
		const keys = Object.keys(this.form?.controls!);
		keys.forEach(key => this.form?.controls[key].setValue(user[key]));
	}

	public getControl(key: string): FormControl {
		let control = this.form!.controls[key];
		return control as FormControl;
	}

	private loadUser() {
		if (!this.id) return this.newUser();
		this.loading = true;
		this.title = "users.edit";
		this.isNew = false;
		this.service.GetUserById(this.id)
			.subscribe({
				next: (u) => {
					this.loading = false;
					this.user = u;
					this.name = this.user?.name;
					this.setUser(u);
				},
			});
	}

	private newUser() {
		this.title = "users.new";
		this.isNew = true;
		this.user = this.service.newUser();
	}

	public save() {
		let valid = this.fs.validate(this.form!);
		if(!valid.valid) {
			this.toaster.error(this.transloco.translate('validation-error'));
			return;
		}
		this.service.Save(Object.assign(this.user!, valid.data))
			.then(rs => {
				if (rs) {
					let successMsg: string = this.transloco.translate('save-success', { object: "User" });
					this.toaster.success(successMsg);
					this.nav.userList();
				} else {
					let errorMsg: string = this.transloco.translate('save-error', { object: "User" });
					this.toaster.error(errorMsg);
				}
			})
			.catch(err => this.toaster.error(err.message));
	}

	public genPassword() {
		let password: string = Math.random().toString(36).slice(-10);
		this.form?.controls['password'].setValue(password);
	}


}
