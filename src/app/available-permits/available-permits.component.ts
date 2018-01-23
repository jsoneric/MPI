import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Permit} from '../shared/interfaces/permit.interface';
import {PermitService} from "../shared/services/permit.service";
import {MessagingService} from "../shared/services/messaging.service";

@IonicPage()
@Component({
   selector   : 'pbm-available-permits',
   templateUrl: 'available-permits.component.html'
 })
export class AvailablePermitsComponent {
  public availablePermits: Permit[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private messagingService: MessagingService,
    private permitService: PermitService) {
  }

  ionViewWillEnter() {
    this.loadAvailablePermits();
  }

  public loadAvailablePermits() {
    this.permitService.availablePermitsList()
      .then((response) => {
        this.availablePermits = response;
      })
      .catch((err) => {
        this.messagingService.alertConfig.title = 'Error';
        this.messagingService.raiseAlert(err.msg);
      });
  }  
}