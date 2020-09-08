import { Injectable } from '@angular/core';
import{ Http,RequestOptions,Headers,Response }  from '@angular/http';
import { Router } from '@angular/router';
import { throwError as observablethrowError,Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthHeaderService } from '../authheader.service';

@Injectable()

export class DashboardService{
    public url: string;
    

    constructor(private http: Http,
        private headerService: AuthHeaderService
    ) {
        this.url = environment.dashboardurl;
    }

    
};