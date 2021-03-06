import {Component, OnInit} from '@angular/core';
import {IAccount} from '../interface/IAccount';
import {AccountService} from '../service/account.service';


@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  accounts: IAccount[] = [];
  host: IAccount[] = [];
  renter: IAccount[] = [];

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.getALL();
    this.accountService.shouldRefresh.subscribe(result => this.getALL());
    this.accountService.getListHost().subscribe(result => {
      this.host = result;
    });
  }

  getALL(): void {
    this.accountService.getListAccount()
      .subscribe(result => (this.accounts = result), error => (this.accounts = []));
  }

  getAccountHost(): void {
    this.accountService.getHostList().subscribe(result => {
      this.accounts = result;
    });
  }

  getAccountRenter(): void {
    this.accountService.getListRenter().subscribe(result => {
      this.accounts = result;
    });
  }

  deleteAccount(id: number): void {
    if (confirm('Are you sure to delete?')) {
      this.accountService.deleteAccount(id).subscribe(result => {
        this.accountService.shouldRefresh.next();
      });
    }
  }

  affectStatusAccount(id: number): void {
    if (confirm('Are you sure?')) {
      this.accountService.affectStatusAccountById(id).subscribe(result => {
        this.accountService.shouldRefresh.next();
      }, error1 => {
        alert('sai roi');
      });
    }
  }
}
