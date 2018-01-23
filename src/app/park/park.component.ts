import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {Content} from 'ionic-angular/components/content/content';

import {Permit} from '../shared/interfaces/permit.interface';
import {MessagingService} from "../shared/services/messaging.service";
import {PermitService} from "../shared/services/permit.service";
import {ParkPurchaseComponent} from '../park-purchase/park-purchase.component';
import {AlertButtonConfigClass} from "../shared/classes/alertConfig.class";

@IonicPage()
@Component({
  selector: 'pbm-park',
  templateUrl: 'park.component.html'
})
export class ParkComponent {
  public parkingSpaceSearchForm : FormGroup;
  public space: number;
  public permits: Permit[];
  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder : FormBuilder,
    private messagingService: MessagingService,
    private permitService : PermitService,
    private translationService: TranslateService
    ) {
    
    this.parkingSpaceSearchForm = this.formBuilder.group({
      space: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(10),
        Validators.required])
      ]
    });
  }

  ionViewWillEnter() {
    this.space = null;
    this.getActivePermits();
    this.content.resize();
  } 

  getPermit() {
    return this.permitService.meteredPermit(this.space)
      .then((resp) => {
        if(resp != undefined) {
          this.navCtrl.push(ParkPurchaseComponent, {'thePermit': resp})
        }else{
          this.invalidLocationNumber();
        }
    })
    .catch(() => {
      this.invalidLocationNumber();
    });
  }

  invalidLocationNumber() {
    let okButton = new AlertButtonConfigClass();
    okButton.text = this.translationService.instant('PARK.OKBUTTON');
    return this.messagingService.raiseConfirm(this.translationService.instant('PARK.INVALIDLOCATION'), [okButton]);
  }

  getActivePermits() {
    return this.permitService.availablePermitsList()
      .then((resp) => {
        this.permits = resp;
      })
      .catch(() => {
        })
  }
}