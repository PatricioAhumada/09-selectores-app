import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country.interfaces';
import { Observable, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})

//https://restcountries.com/v3.1/region/europe?fields=cca3,name,borders

export class CountriesService {

  private baseUrl = 'https://restcountries.com/v3.1';
  constructor( private http : HttpClient) { }

  private _regions:Region[]=[Region.Africa,Region.Americas,Region.Asia,Region.Europe, Region.Oceania];

  get regions():Region[]{
    return [...this._regions];
  }

  getCountriesByRegion( region : Region): Observable<SmallCountry[]>{



    if( !region ) return of([]);

    const url: string =`${ this.baseUrl}/region/${ region }?fields=cca3,name,borders`;

    return this.http.get<Country[]>(url)
    .pipe(
      map( countries => countries.map(country => ({
        name:country.name.common,
        cca3:country.cca3,
        borders:country.borders ?? []
      }))),
      //tap( response => console.log({response}))
    );



  }


}