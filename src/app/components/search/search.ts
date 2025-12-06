import { Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Api } from '../../api';
import { SearchResult, FoodSearchResult } from '../../searchresult.interface';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {
  searchResults: SearchResult = {foods: []};
  searchControl = new FormControl('');
  
  apiQuery = signal('');
  
  constructor(private apiService: Api) {}
  
  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.apiQuery.set(value ?? '');
        this.apiService.searchFoods(value ?? '').subscribe({
          next: (data) => {
            this.searchResults = data;
          }, 
          error: (error) => console.error(error),
          complete: () => console.log('api search completed')
        });
      });
  }
}
