import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGameResults } from '../models/game-results';
import { Teams } from '../models/teams';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  public teams: Teams[] = [];
  public teamsSelected: IGameResults[] = [];
  public dropdownSelected: number = 0;
  public headerInfo: Teams[] = [];
  constructor(private scoreService: ScoreService, private router: Router) { }

  ngOnInit(): void {
    this.scoreService.getData().subscribe((data) => {
      this.teams = data.data;
    });
    const data = localStorage.getItem('teams') || '';
    const header = localStorage.getItem('header') || '';
    const headerParse = JSON.parse(header);
    const parseData = JSON.parse(data);
    if (parseData.length > 0) {
      this.teamsSelected = parseData;
      this.headerInfo = headerParse;
    }
  }

  public track() {
    this.scoreService.getTeamResults(this.dropdownSelected).subscribe((response: IGameResults) => {
      const obj = this.teams.find((item: Teams) => item.id == this.dropdownSelected) as Teams;
      this.headerInfo.push(obj);
      response['data'].forEach((teams) => {
        if (teams['home_team'].id != this.dropdownSelected) {
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

  public delete(index: number) {
    this.teamsSelected.splice(index, 1);
    this.headerInfo.splice(index, 1);
    localStorage.setItem('teams', JSON.stringify(this.teamsSelected));
    localStorage.setItem('header', JSON.stringify(this.headerInfo));
  }



  getAverage(item: IGameResults[], property: string) {
    let sum = 0;
    item.forEach((key) => {
      sum += Number(key[property]);
    });
    return Math.round(sum / (item.length));
  }

  goToResults(id: number) {
    localStorage.setItem('teams', JSON.stringify(this.teamsSelected));
    localStorage.setItem('header', JSON.stringify(this.headerInfo));
    this.router.navigate(['/results/' + id]);
  }

}
