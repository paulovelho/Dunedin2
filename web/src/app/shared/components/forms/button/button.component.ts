import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { PlatypusLoaderComponent } from '../../platypus-loader/platypus-loader.component';

@Component({
	selector: 'app-button',
	standalone: true,
	imports:[
		CommonModule,
		PlatypusLoaderComponent,
		TranslocoModule
	],
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit { 

	@Input() type: string | null = null;
	@Input() caption: string | null = null;
	@Input() translate: string | null = null;
	@Input() subcaption: string | null = null;
	@Input() icon: string = "";
	@Input() extraClass: any;
	@Input() loading: boolean = false;
	@Output() action = new EventEmitter<any>();

	public btclass: string[] = [];
	public loadingClass: string = "";

	constructor() {}

	ngOnInit() {
		this.Initialize();
	}

	private applyCustomClass(): void {
		if(this.extraClass) {
			this.btclass = [].concat( this.extraClass );
		}
	}

	private preFab(): void {
		switch (this.type) {
			case "save":
				this.btclass.push('btn-success');
				this.icon = 'fa-save';
				this.translate = 'save';
				break;
			case "cancel":
				this.btclass.push('btn-danger');
				this.icon = 'fa-times-circle';
				this.translate = 'cancel';
				break;
			case "load-more":
				this.icon = 'fa-plus-square';
				this.btclass.push('btn-primary');
				this.translate = 'load-more';
				break;
			case "search":
				this.icon = 'fa-search';
				this.btclass.push('btn-secondary','btn-rounded');
				this.translate = 'search';
				break;

			// styles:
			case "primary":
				this.btclass.push('btn-primary');
				break;
			case "outline-primary":
				this.btclass.push('btn-outline-primary');
				this.loadingClass = "";
				break;
			case "success":
				this.btclass.push('btn-outline-success');
				break;
			case "danger":
				this.btclass.push('btn-outline-danger');
				break;
			case "primary-outline":
				this.btclass.push('btn-outline-primary');
				this.loadingClass = "";
				break;
			default:
				this.btclass.push('btn-outline-secondary');
				break;
		}
	}

	private Initialize(): void {
		this.applyCustomClass();
		this.preFab();
	}

	public doAction(): void {
		this.action.emit();
	}

}
