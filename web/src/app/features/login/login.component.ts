import { Component, ViewEncapsulation } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { AuthService } from '@services/auth/authentication.service';
import { Toaster } from '@services/toaster/toaster.service';
import { NavigationService } from '@services/navigation/navigation.service';
import { SharedModule } from '@app/shared/shared.module';
import { TranslocoService } from '@ngneat/transloco';

@Component({
	selector: 'login-form',
	encapsulation: ViewEncapsulation.None,
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	standalone: true,
	imports: [ SharedModule ],
})
export class LoginComponent {
	public form: FormGroup;
	public email: FormControl;
	public password: FormControl;
	public loading: boolean = false;

	constructor(
		fb: FormBuilder,
		private nav: NavigationService,
		private translate: TranslocoService,
		private Toaster: Toaster,
		private AuthService: AuthService,
	) {
		this.form = fb.group({
			'email': ['', Validators.compose([Validators.required])],
			'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});
		this.email = this.form.controls['email'] as FormControl;
		this.password = this.form.controls['password'] as FormControl;
	}

	public onSubmit(values: Object): void {
		if (this.form.valid) {
			this.loading = true;
			this.AuthService.login(this.email.value, this.password.value)
				.then((result: any) => {
					if(result.success) {
						this.Toaster.success(this.translate.translate("login.success"));
						this.nav.goHome();
					} else {
						this.Toaster.warning(this.translate.translate("errors.login-error"));
					}
				}).catch((err: any) => {
					let message = err["message"] || this.translate.translate("errors.unknown-error");
					this.Toaster.error(message);
					console.error("error catch: ", err);
				})
				.finally(() => this.loading = false);
		}
	}
}
