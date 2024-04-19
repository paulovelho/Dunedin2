import { CommonModule } from '@angular/common';
import {
	Component,
	EventEmitter,
	Input,
	Output,
	forwardRef
} from '@angular/core';
import {
	AbstractControl,
	ControlValueAccessor,
	FormsModule,
	NG_VALIDATORS,
	NG_VALUE_ACCESSOR,
	ValidationErrors,
	Validator
} from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { PlatypusLoaderComponent } from '../../platypus-loader/platypus-loader.component';

export interface iOption {
	value: string;
	caption: string;
}

export const objToOptions = (obj: { [key: string]: string; }): iOption[] => 
	Object.keys(obj).map((k: any) => {
		return {
		'caption': obj[k],
		'value': k,
		};
	});

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
		PlatypusLoaderComponent,
		CommonModule,
		FormsModule,
		TranslocoModule
	],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: SelectComponent,
			multi: true,
		},
	],
})
export class SelectComponent implements ControlValueAccessor, Validator {
	@Input() label?: string;
	@Input() id?: string;
	@Input() options: iOption[] = [];
	@Input() required: boolean = false;
	@Input() loading: boolean = false;
	@Input() placeholder?: string;

	@Input() value?: any;
	@Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

	public error: boolean = false;

	public valueEmit(): void {
		this.valueChange.emit(this.value);
		this.onChange(this.value);
	}

	onChange = (delta: any) => {};

	writeValue(delta: any): void {
		this.value = delta;
	}

	registerOnChange(fn: (v: any) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void { }

	validate(control: AbstractControl): ValidationErrors | null {
		if (!this.required) return null;
		if (!control.value) {
			this.error = true;
			return { required: true };
		}
		this.error = false;
		return null;
	}

}
