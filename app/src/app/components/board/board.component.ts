import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ContractorService} from '../../services/contractor.service';
import Contractor from '../../models/entities/Contractor';
import {CachedAuthenticationService} from '../../services/cached.authentication.service';
import {Role} from '../../models/enums/RoleEnum';
import {HomeownerManageService} from '../../services/homeowner.manage.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
  public contractors: Contractor[] = [];
  public role: Role;
  public roles = Role;
  public projects: any[] = [];
  public name: string;

  constructor(private router: Router,
              private manager: HomeownerManageService,
              private cachedAuthenticationService: CachedAuthenticationService,
              private contractorService: ContractorService) {}

  async ngOnInit() {
    this.contractors = await this.contractorService.getAll().toPromise();
    const { role, name } = this.cachedAuthenticationService.resolveAuthInfo().profile;
    this.role = role;
    this.name = name;
    if (this.role === Role.Homeowner) {
      const { projects } = await this.manager.get();
      this.projects = projects;
    }
  }
}
