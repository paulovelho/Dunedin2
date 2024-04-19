import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { iUser } from '@app/features/users/user.interface';
import { UsersApi } from '@app/features/users/users.api';
import { UsersService } from '@app/features/users/users.service';
import { FormService } from '@services/form/form.service';
import { iOption, objToOptions } from '@app/shared/components/forms/select/select.component';
import { SharedModule } from '@app/shared/shared.module';
import { availableLanguages } from '@app/translations';
import { NavigationService } from '@app/services/navigation/navigation.service';
import { Toaster } from '@app/services/toaster/toaster.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-account-home',
  standalone: true,
  imports: [SharedModule],
	providers: [
		UsersApi,
		UsersService,
	],
  templateUrl: './account-home.component.html',
  styleUrl: './account-home.component.scss'
})
export class AccountHomeComponent implements OnInit {
	constructor(
		private transloco: TranslocoService,
		private formService: FormService,
		private toaster: Toaster,
		private nav: NavigationService,
		private service: UsersService,
	) { }
	public loading: boolean = false;
	public user?: iUser;

	public languages: iOption[] = [];

	public form?: FormGroup;

	ngOnInit(): void {
		this.loadLanguages();
		this.buildForm();
		this.getMyself();
	}

	private getMyself() {
		this.loading = true;
		this.service.getMyAccount()
			.subscribe({
				next: (u) => {
					this.user = u;
					this.loading = false;
					this.setUser(u);
				}
			});
	}

	private loadLanguages() {
		this.languages = objToOptions(availableLanguages);
	}

	private buildForm(): void {
		this.form = this.formService.Build(
			["name", "email", "phone_number", "language"],
			["name", "email", "language"]
		);
	}
	private setUser(u: iUser): void {
		this.formService.setObject(this.form!, u);
	}

	public goToPasswordChange(): void {
		this.nav.changePassword();
	}
	public save(): void {
		this.loading = true;
		let formData = this.formService.validate(this.form!);
		if(!formData.valid) {
			this.toaster.error(formData.errorString);
		} else {
			let data = formData.data;
			if(!data) {
				this.toaster.warning("Nothing to save");
				return;
			}
			data.id = this.user?.id;
			this.service.saveMyData(data)
				.subscribe({
					next: (rs) => {
						if(rs) {
							this.toaster.success(this.transloco.translate("save-success-general"));
						}
					},
					error: (err) => {
						console.error(err);
						this.toaster.error("ERROR SAVING DATA");
					},
					complete: () => this.loading = false,
				})
		}
	}

}
