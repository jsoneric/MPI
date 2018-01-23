import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PermitDetailsComponent} from "../permit-details/permit-details.component";
import {Permit} from '../shared/interfaces/permit.interface';
import {PermitService} from '../shared/services/permit.service';
import {MessagingService} from '../shared/services/messaging.service';
import {AvailablePermitsComponent} from '../available-permits/available-permits.component';

@IonicPage()
@Component({
   selector   : 'pbm-permits',
   templateUrl: 'permits.component.html'
 })
export class PermitsComponent {
  public permits: Permit[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private messagingService: MessagingService,
    private permitService: PermitService) {
      
  }

  ionViewWillEnter() {
    this.loadActivePermits();
  }

  public loadActivePermits() {
    this.permitService.activePermitsList()
      .then((response) => {
        this.permits = response;
      })
      .catch((err) => {
        this.messagingService.alertConfig.title = 'Error';
        this.messagingService.raiseAlert(err.msg);
      });
  }  

  public addNewPermit() {
    this.navCtrl.push(AvailablePermitsComponent);
  }

  public editPermit(thePermit:Permit) {
    this.navCtrl.push(PermitDetailsComponent, {'thePermit': thePermit});
  }
}