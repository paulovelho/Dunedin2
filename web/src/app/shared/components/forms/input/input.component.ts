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
	ReactiveFormsModule,
	ValidationErrors,
	Validator,
} from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
	selector: 'app-input',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		TranslocoModule,
	],
	templateUrl: './input.component.html',
	styleUrl: './input.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: InputComponent,
			multi: true,
		},
	],
})
export class InputComponent implements ControlValueAccessor, Validator {
	@Input() type: string = "text";
	@Input() label: string = "";
	@Input() translate: string = "";
	@Input() placeholder: string = "";
	@Input() id: string = "";
	@Input() controlName: string = "";
	@Input() required: boolean = false;

	@Input() value?: any;
	@Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

	@Input() error: boolean = false;

	public valueEmit(): void {
		this.valueChange.emit(this.value);
		this.onChange(this.value);
	}

	writeValue(delta: any): void {
		this.value = delta;
	}

	onChange = (delta: any) => { };
	onTouched = () => {
	};
	registerOnChange(fn: (v: any) => void): void {
		this.onChange = fn;
	}
	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

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
