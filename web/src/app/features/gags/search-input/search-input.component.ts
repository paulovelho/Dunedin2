import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { Subject, debounceTime } from 'rxjs';

@Component({
	selector: 'app-search-input',
	standalone: true,
	imports: [ SharedModule ],
	templateUrl: './search-input.component.html',
	styleUrl: './search-input.component.scss'
})
export class SearchInputComponent implements OnInit, OnDestroy {

	private readonly debounceTimeMs = 500;
	private readonly minCharacters = 4;

	private searchSubject = new Subject<string>();
	public query?: string;

	@Input() loading: boolean = false;
	@Output() updateQuery = new EventEmitter<string>();

	ngOnInit() {
		this.searchSubject
			.pipe(debounceTime(this.debounceTimeMs))
			.subscribe((searchValue: string) => {
				this.updateQuery.emit(searchValue);
			});
	}

	ngOnDestroy() {
		this.searchSubject.complete();
	}
	
	public queryChanged() {
		if (!this.query) return;
		if (this.query!.length > this.minCharacters) {
			this.searchSubject.next(this.query);
		}
	}

	public refresh() {
		this.updateQuery.emit(this.query);
	}

}
