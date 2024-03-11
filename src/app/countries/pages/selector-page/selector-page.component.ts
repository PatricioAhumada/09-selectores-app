import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interfaces';
import { log } from 'console';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [

  ]
})
export class SelectorPageComponent implements OnInit {

  public countriesByRegion: SmallCountry[] = [];

  public myForm: FormGroup = this.fb.group({
    region:['', Validators.required],
    country:['', Validators.required],
    borders:['', Validators.required],
  });
  //https://restcountries.com/v3.1/name/costa
  constructor(
    private fb:FormBuilder ,
    private countriesService:CountriesService){}

  get regions() : Region[]{
    return this.countriesService.regions;
  }
  //detectar el cambio de region
  ngOnInit(): void {
    this.onRegionChange();
  }

  onRegionChange(){
    this.myForm.get('region')!.valueChanges
    .pipe(
      tap( () => this.myForm.get('country')!.setValue('')),
      switchMap( region => this.countriesService.getCountriesByRegion(region))
    )
    .subscribe( countries =>
      this.countriesByRegion = countries
    )
  }


}
