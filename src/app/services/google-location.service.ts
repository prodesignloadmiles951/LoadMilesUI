import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';


@Injectable()

export class GooglePinSearch{
    constructor(private https: Http) {
    }

    getAddress(pin: number) {
        return this.https.get('https://maps.googleapis.com/maps/api/geocode/json?address='+pin+'&key=AIzaSyBzdZGACgOjSVOeQq23NnjUd4Mpxhihw1U')
        .pipe(map(response => response.json().data ? [] : response.json()), catchError((error: Response) => { return observableThrowError(error); }));
    }
}