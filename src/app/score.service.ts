import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Teams } from './models/teams';
import { IGameResults } from './models/game-results';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  public headers = new HttpHeaders({
    'X-RapidAPI-Key': '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
    'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
  });
  public requestOptions = { headers: this.headers };

  constructor(private http: HttpClient) { }


  getData(): Observable<Teams> {
    return this.http.get<Teams>('https://free-nba.p.rapidapi.com/teams', this.requestOptions);
  }

  getTeamResults(id: number): Observable<IGameResults> {
    return this.http.get<IGameResults>('https://free-nba.p.rapidapi.com/games?page=0&dates[]=2023-02-19&dates[]=2023-02-18&dates[]=2023-02-17&dates[]=2023-02-16&dates[]=2023-02-15&dates[]=2023-02-14&dates[]=2023-02-13&dates[]=2023-02-12&dates[]=2023-02-11&dates[]=2023-02-10&dates[]=2023-02-09&dates[]=2023-02-08&per_page=12&team_ids[]=' + id, this.requestOptions)
  }
}
