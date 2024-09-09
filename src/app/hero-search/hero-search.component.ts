import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.css',
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;

  // subject is both a source of observable and observable itself. 
  // we can subscribe to subject like we do with observable and push value to it using next
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}
  ngOnInit(): void {

    // pipe search terms through a sequence of rxjs operators.
    // reduce the number of api calls
    // each time it returns a Hero[]
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after user finishes pressing a key
      debounceTime(300),

      // ignore new term if it is not different from previous search term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      // discard previous observables. return latest observable 
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }

  // push search term into observable stream.
  search(term: string) {
    this.searchTerms.next(term);
  }
}
