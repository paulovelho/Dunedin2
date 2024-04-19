import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlatypusLoaderComponent } from '../platypus-loader/platypus-loader.component';

@Component({
	selector: 'app-window',
	standalone: true,
	encapsulation: ViewEncapsulation.None,
	imports: [CommonModule, NgbModule, PlatypusLoaderComponent],
	providers: [NgbActiveModal],
	templateUrl: './app-window.component.html',
	styleUrl: './app-window.component.scss',
	animations: [
		trigger('slideUpDown', [
			transition('void => *', [
				style({ height: 0, margin: 0, padding: 0, opacity: 0, overflow: 'hidden' }),
				animate(500, style({ height: '*', margin: '*', padding: '*', opacity: 1, overflow: 'visible' }))
			]),
			transition('* => void', [
				style({ height: '*', margin: '*', padding: '*', opacity: 1, overflow: 'visible' }),
				animate(500, style({ height: 0, margin: 0, padding: 0, opacity: 0, overflow: 'hidden' }))
			])
		])
	],
})
export class AppWindowComponent {
	@Input() title: string = "";
	@Input() icon: string = "";
	@Input() modal: boolean = false;

	@Input() showClose: boolean = true;
	@Input() collapsable: boolean = true;
	@Input() loading: boolean = false;
	@Input() hidden: boolean = false;
	@Input() hideContent: boolean = false;

	@Output() onClose = new EventEmitter<any>();


	constructor(
		private activeModal: NgbActiveModal,
	) {
	}

	public expand = () => this.hideContent = false;
	public collapse = () => this.hideContent = true;

	public open() {
		this.hidden = false;
	}

	public close() {
		if (this.modal) {
			this.activeModal.close();
		} else {
			this.hidden = true;
		}
		this.onClose.emit(true);
	}
}
