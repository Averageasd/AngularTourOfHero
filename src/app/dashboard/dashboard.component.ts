import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  ngOnInit(): void {}

  constructor(private heroService: HeroService) {
    this.getHeros();  
  }

  getHeros(): void {
    this.heroService.getHeroes().subscribe((heros) => {
      this.heroes = heros.slice(1, 5);
    });
  }
}
