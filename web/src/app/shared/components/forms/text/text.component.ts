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
  selector: 'app-text',
  standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		TranslocoModule,
	],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TextComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: TextComponent,
			multi: true,
		},
	],
})
export class TextComponent implements ControlValueAccessor, Validator {
	@Input() label: string = "";
	@Input() id: string = "";
	@Input() controlName: string = "";
	@Input() required: boolean = false;

	@Input() value?: any;
	@Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

	public error: boolean = false;

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
