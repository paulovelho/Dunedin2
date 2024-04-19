import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, from, throwError } from "rxjs";
import { catchError, map, timeout, switchMap } from 'rxjs/operators';

import { ApiManager } from './api-manager.service';
import { Store } from '@services/store/store.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

	private timeout = 5000 // in ms

	constructor(
		private Manager: ApiManager,
		private Store: Store
	){ }

	private async SetHeaders(req: HttpRequest<any>): Promise<HttpRequest<any>> {
		let token = await this.Store.getToken();
		if(token == null) {
			console.info('not logged');
			return req;
		}
		return req.clone({
			headers: req.headers
				.append('Authorization', 'Bearer ' + token)
		});
	}

	private GetResponse(event: HttpEvent<any>): HttpEvent<any> {
		if(event instanceof HttpResponse) {
			this.Manager.StatusManage(event);
		}
		return event;
	}

	private CatchError(err: any) {
		this.Manager.StatusManage(err);
		let error = err.error 
							? err.error.data ? err.error.data : err.error
							: err.error;
		console.info(error);
		return throwError(() => error);
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
		if(!this.isValidRequestForInterceptor(req)) return next.handle(req);
		return from(this.SetHeaders(req))
			.pipe(
				switchMap(request => {
					return next.handle(request)
						.pipe( timeout(this.timeout) )
						.pipe( map((ev: any) => this.GetResponse(ev)) )
						.pipe( catchError((err: any) => this.CatchError(err)) );
				})
			);
	}

  private isValidRequestForInterceptor(req: HttpRequest<any>): boolean {
		let url: string = req.url;
		return(!url.endsWith('/login'))
  }


}
