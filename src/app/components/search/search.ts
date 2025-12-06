import { Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {
  searchControl = new FormControl('');
  
  apiSearchPrefix = `${environment.apiUrl}/foods/search?api_key=${environment.apiKey}&query=`;
  apiSearchUrl = signal(this.apiSearchPrefix);
  
  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.apiSearchUrl.set(this.apiSearchPrefix + value)
      });
  }
}
