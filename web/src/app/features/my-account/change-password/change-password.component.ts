import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UsersApi } from '@app/features/users/users.api';
import { UsersService } from '@app/features/users/users.service';
import { FormService } from '@app/services/form/form.service';
import { Toaster } from '@app/services/toaster/toaster.service';
import { SharedModule } from '@app/shared/shared.module';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [SharedModule],
	providers: [
		UsersApi,
		UsersService,
	],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {
	constructor(
		private transloco: TranslocoService,
		private formService: FormService,
		private toaster: Toaster,
		private service: UsersService,
	) { }

	public loading: boolean = false;
	public form?: FormGroup;

	ngOnInit(): void {
		this.buildForm();
	}

	private buildForm() {
		this.form = new FormGroup({
			password: new FormControl(null, [Validators.required, Validators.minLength(10)]),
			match_password: new FormControl(null, [Validators.required]),
		}, { validators: this.passwordMatchingValidator });
	}
	passwordMatchingValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
		const password = control.get('password');
		const confirmPassword = control.get('match_password');
		return password?.value === confirmPassword?.value ? null : { notmatched: true };
	};

	public genPassword() {
		let password: string = Math.random().toString(36).slice(-10);
		this.form?.controls['password'].setValue(password);
		this.form?.controls['match_password'].setValue(password);
	}

	public save() {
		let rs = this.formService.validate(this.form!);
		if(!rs.valid) {
			this.toaster.error(rs.errorString);
			return;
		}
		this.loading = true;
		let password = this.form?.controls['password'].value;
		this.service.changePassword(password)
			.subscribe({
				next: (rs) => {
					console.info("rs", rs);
					if(rs) {
						this.toaster.success(this.transloco.translate("save-success-general"));
					}
					this.loading = false;
				},
				error: (err) => { 
					this.toaster.error(this.transloco.translate('error-general'));
					this.loading = false;
				},
			})
	}

}
