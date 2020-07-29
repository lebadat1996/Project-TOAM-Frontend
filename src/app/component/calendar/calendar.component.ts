import { Component, OnInit } from '@angular/core';
import {BookingService} from '../../_services/booking.service';
import {FormGroup, FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PropertyService} from '../../service/property.service';
import {IAccount} from '../../interface/IAccount';
import {IProperty} from '../../interface/iproperty';
import {TokenStorageService} from '../../_services/token-storage.service';
import {AccountService} from '../../service/account.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  propertyId: number;
  renterId: number;
  properties: IProperty;
  renter: IAccount;
  userInToken: IAccount;
  now = '2020-01-01';
  formBooking: FormGroup = new FormGroup({
    createTime: new FormControl(''),
    beginTime: new FormControl(''),
    endTime: new FormControl(''),
    properties: new FormControl(''),
    renter: new FormControl(''),
  });
  constructor(private bookingService: BookingService,
              private activatedRoute: ActivatedRoute,
              private propertyService: PropertyService,
              private tokenStorage: TokenStorageService,
              private accountService: AccountService
  ) { }

  ngOnInit(): void{
    this.userInToken = this.tokenStorage.getUser();
    this.renterId = this.userInToken.id;
    console.log('renterId:' + this.renterId);
    this.accountService.getAccountById(this.renterId).subscribe( result => {
      this.renter = result;
      console.log(this.renter);
    });
    console.log(this.renter);
    this.activatedRoute.params.subscribe( params => {
      this.propertyId = params.id;
      this.propertyService.getPropertyById(this.propertyId).subscribe( result => {
        this.properties = result;
        console.log(this.properties);
      });
    });
  }

  onSubmit(): any {
    this.bookingService.createBooking(this.formBooking.value).subscribe();
  }
}
