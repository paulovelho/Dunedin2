import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'api-image',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './api-image.component.html',
	styleUrls: ['./api-image.component.scss'],
})

export class ApiImageComponent implements OnInit {

	@Input() id: any|null = null;
	@Input() extraClass: string = "";
	@Input() alt: string = "";
	@Input() width: number = 0;
	@Input() height: number = 0;
	@Input() mock: boolean = true;

	public imageUrl: string = "";

	constructor() {
	}

	ngOnInit(): void {
		if(this.mock) this.getMockImageUrl();
	}

	public getAlt(): string {
		if(this.alt) return this.alt;
		else return "image "+this.id;
	}

	public getMockImageUrl() {
		let txt: string = this.id == null ? "noid" :  "id-"+this.id;
		let w: number = this.width != 0 ? this.width : 100;
		let h: number = this.height != 0 ? this.height : 100;
		let dimensions: string = w.toString()+"x"+h.toString();
		let bgColor = "8f7000";
		let textColor = "0f095e";
		this.imageUrl = `https://dummyimage.com/${dimensions}/${bgColor}/${textColor}&text=${txt}`;
		return this.imageUrl;
	}

}
