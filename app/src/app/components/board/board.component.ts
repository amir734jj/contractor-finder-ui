import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ContractorService} from '../../services/contractor.service';
import {CachedAuthenticationService} from '../../services/cached.authentication.service';
import Contractor from '../../models/entities/Contractor';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
  public contractors: Contractor[] = [];
  flag: boolean;


  constructor(private router: Router, private contractorService: ContractorService, private cachedAuthenticationService: CachedAuthenticationService) { }

  ngOnInit() {
    // this.getContractors();m
    this.flag = this.cachedAuthenticationService.isAuthenticated();
  }

  getContractors() {

  }
}
