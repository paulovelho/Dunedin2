import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';

@Component({
  selector: 'app-dev',
  standalone: true,
  imports: [
		CommonModule,
		RouterOutlet,
		SharedModule,
	],
  templateUrl: './dev.component.html',
  styleUrl: './dev.component.scss'
})
export class DevComponent {
	constructor(
		private router: Router,
	) {}

	private navigate(to: string): void {
		this.router.navigate(["app", "dev", to]);
	}

	build = () => this.navigate("build");
	store = () => this.navigate("store");
	token = () => this.navigate("token");
	cache = () => this.navigate("cache");
	api = () => this.navigate("api");

}
