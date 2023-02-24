import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IGameResults } from '../models/game-results';
import { Teams } from '../models/teams';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css']
})
export class GameResultsComponent implements OnInit {
  public teamCode: number = 0;
  public teamsSelected: IGameResults[] = [];
  public headerInfo: Teams[] =[];
  constructor(private scoreService: ScoreService, private activatedRoute: ActivatedRoute, private router: Router) {
      this.activatedRoute.params.subscribe((data: Params) => {
        this.teamCode  = data['teamCode'];
      })
   }

  ngOnInit(): void {
    const header = localStorage.getItem('header') || '';
    const headerParse = JSON.parse(header);
    if (headerParse.length > 0) {
      this.headerInfo = headerParse.find((item: Teams) => item.id == this.teamCode) as Teams[];
    }
    this.scoreService.getTeamResults(this.teamCode).subscribe((response: IGameResults) => {
      response['data'].forEach((teams: IGameResults) => {
        if (teams['home_team'].id != this.teamCode) {
          let ht = teams['home_team'];
          let vt = teams['visitor_team'];
          let hts = teams['home_team_score'];
          let vts = teams['visitor_team_score'];
          teams['home_team'] = vt;
          teams['visitor_team'] = ht;
          teams['home_team_score'] = vts;
          teams['visitor_team_score'] = hts;
        }
      });
      this.teamsSelected.push(response.data);      
    })
  }

  goToTeams(){
    this.router.navigate(['/']);
  }

}
