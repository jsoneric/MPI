import { AlertButtonConfigClass } from './../shared/classes/alertConfig.class';
import { PermitTime } from './../shared/interfaces/permitTime.interface';
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {Page} from "ionic-angular/navigation/nav-util";

import {VehicleService} from "../shared/services/vehicle.service";
import {VehiclesDetailsComponent} from "../vehicles-details/vehicles-details.component";
import {Permit} from '../shared/interfaces/permit.interface';
import {CreditCard} from "../shared/interfaces/creditCard.interface";
import {Time} from "../settings/time.model";
import {MessagingService} from "../shared/services/messaging.service";
import {PermitService} from "../shared/services/permit.service";
import {Vehicle} from "../shared/interfaces/vehicle.interface";
import {UserClass} from "../shared/classes/user.class";
import {CreditCardService} from "../shared/services/creditCard.service";
import {AddPaymentusCardComponent} from "../credit-cards/paymentus/add-paymentus-card/add-paymentus-card.component";
import {AddAuthorizedotnetCardComponent} from "../credit-cards/authorizedotnet/add-authorizedotnet-card/add-authorizedotnet-card.component";
import {AddSpreedlyCardComponent} from "../credit-cards/spreedly/add-spreedly-card/add-spreedly-card.component";
import { PermitType } from '../shared/interfaces/permitType.interface';


@IonicPage()
@Component({
  selector: 'pbm-park-purchase',
  templateUrl: 'park-purchase.component.html'
})
export class ParkPurchaseComponent {
    public parkingDetails : FormGroup;
    public vehicles : Vehicle[];
    public cards : CreditCard[];
    public permit: Permit;
    public permitDetails: PermitType;
    public times: PermitTime[];
    public selectedTime: PermitTime;
    public price: number;
    public space: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder : FormBuilder,
    private messagingService: MessagingService,
    private permitService : PermitService,
    private userClass: UserClass,
    private vehicleService: VehicleService,
    private creditCardService: CreditCardService) {
        this.permit = <Permit>this.navParams.get('thePermit');
    
    this.parkingDetails = this.formBuilder.group({
      vehicle: ['', Validators.required],
      card: ['', Validators.required],
      time: ['', Validators.required]
    });

    this.price = 0;
  }

  ionViewWillEnter() {
    this.getPermitDetails();
    this.getVehicles();
    this.getCards();
  }

  getPermitDetails() {
    return this.permitService.permitDetails(this.permit.mpermit_type_id)
      .then((resp) => {
        this.permitDetails = resp;
        this.times = resp.times;            
    })
    .catch((err) => {
      this.messagingService.alertConfig.title = 'Error';
      this.messagingService.raiseAlert('There was a problem loading the permit details: ' + err.msg);
    });
  }

  timeChange() {
    this.price = this.selectedTime.price;
  }  

  //vehicles
  getVehicles() {
    this.userClass.reload()
    .then(() => {
      this.vehicles = this.userClass.vehicleList;
      if(this.vehicles.length > 0) {
        this.parkingDetails.controls['vehicle'].setValue(this.vehicles[0]);
      }
    })
    .catch((err) => {
      this.messagingService.alertConfig.title = 'Error';
      this.messagingService.raiseAlert('There was a problem loading the vehicles list: ' + err.msg);
    });
  }

  addVehicle(){
    this.navCtrl.push(VehiclesDetailsComponent, {'theVehicle': this.vehicleService.newVehicle()});
  }

  //cards
  getCards() {
		return this.creditCardService.cardList()
    .then((resp) => {
      this.cards = resp;
      this.parkingDetails.controls['card'].setValue(this.cards[0]);
    })
    .catch((err) => {
      this.messagingService.alertConfig.title = 'Error';
      this.messagingService.raiseAlert('There was a problem loading the credit card list: ' + err.msg);
    });  
  }

  addCreditCard(){
    switch(this.creditCardService.merchant().name.toLowerCase()){
      case 'authorize.net':
        this.navCtrl.push(AddAuthorizedotnetCardComponent);
        break;
      case 'paymentus':
        this.navCtrl.push(AddPaymentusCardComponent);
        break;
      default: //spreedly
        this.navCtrl.push(AddSpreedlyCardComponent);
        break;
    }
  }  

  purchase() {
    let okButton = new AlertButtonConfigClass();
    okButton.text = 'OK';
    okButton.handler = () => {
        this.navCtrl.pop();
    }

    return this.messagingService.raiseConfirm('Parking purchased successfully.', [okButton]);      
  }  

  selectChange(e) {
    if(e=="Add a credit card") {
      this.addCreditCard();
    }else if(e=="Add a vehicle") {
      this.addVehicle();
    }
  }
}