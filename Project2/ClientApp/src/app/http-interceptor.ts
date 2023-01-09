import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { LoaderService } from "./services/loader.service";
import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

     constructor(private loaderService: LoaderService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.loaderService.show();

        return next.handle(req)
             .pipe(tap(
                (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        this.loaderService.hide();
                    }
                }, 
                (error) => {
                    this.loaderService.hide();
                }));
    }
}