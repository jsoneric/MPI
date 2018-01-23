import {Component, Renderer} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {TranslateService} from "@ngx-translate/core";

import {MessagingService} from "../shared/services/messaging.service";
import {ListService} from "../shared/services/list.service";
import {State} from "../shared/interfaces/state.interface";
import {VehicleService} from "../shared/services/vehicle.service";
import {VehicleType} from "../shared/interfaces/vehicleType.interface";
import {Vehicle} from "../shared/interfaces/vehicle.interface";
import {AlertButtonConfigClass} from "../shared/classes/alertConfig.class";

@IonicPage()
@Component({
  selector: 'pbm-vehicles-details',
  templateUrl: 'vehicles-details.component.html'
})
export class VehiclesDetailsComponent {
	public vehicleDetails: FormGroup;
	public states: State[];
	public vehicleTypes: VehicleType[];
	public thisVehicle: Vehicle;
	public pageTitle: string;

  constructor(
  	private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder : FormBuilder,
    private messagingService: MessagingService,
    private listService: ListService,
    private vehicleService: VehicleService,
    private barcodeScanner: BarcodeScanner,
	private translateService: TranslateService,
	private renderer: Renderer) {
		this.thisVehicle = <Vehicle>this.navParams.get('theVehicle');
		this.pageTitle = this.thisVehicle.vehicle_id === 0 ? this.translateService.instant('VEHICLEDETAILS.PAGETITLES.ADDVEHICLE') : this.translateService.instant('VEHICLEDETAILS.PAGETITLES.EDITVEHICLE');

  	    //TODO: Add the rest of the vehicle fields to the form for editing, but keep it simple/quick for creation
		this.vehicleDetails = this.formBuilder.group({
          alias: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
          license: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
          vin:['',Validators.compose([Validators.pattern('[a-zA-Z0-9]*')])],
          state:['',Validators.compose([Validators.required])],
          type:['', Validators.compose([Validators.required])]
          });
      this.states = this.listService.states;
      this.vehicleTypes = this.listService.vehicleTypes;
	  }
	  
	setAsTouched() {
		for (var controlName in this.vehicleDetails.controls) {
			let elem = document.querySelector('[formControlName="'+controlName+'"]');

			if(elem) {
				this.renderer.setElementClass(elem.parentElement.parentElement.parentElement, 'ng-touched', this.vehicleDetails.controls[controlName].touched);
			}
		}
	}	  

  	save():Promise<any> {
  		if(this.vehicleDetails.pristine){
  			return this.navCtrl.pop();
    	} else if(this.vehicleDetails.valid) {
  			this.thisVehicle.alias = this.vehicleDetails.get('alias').value;
  			this.thisVehicle.license = this.vehicleDetails.get('license').value;
  			this.thisVehicle.state_id = this.vehicleDetails.get('state').value;
  			this.thisVehicle.vin = this.vehicleDetails.get('vin').value;
  			this.thisVehicle.type = this.vehicleDetails.get('type').value;
  			return this.vehicleService.saveVehicle(this.thisVehicle)
		    	.then((resp) => {
  				    if(resp.success){
				        return this.navCtrl.pop();
		    	    } else {
  				    	this.messagingService.alertConfig.title = this.translateService.instant('ALERTS.TITLES.ERROR');
  				    	return this.messagingService.raiseAlert(resp.msg);
		    	    }
		    	})
		    	.catch((err) => {
				    this.messagingService.alertConfig.title = this.translateService.instant('ALERTS.TITLES.ERROR');
				    return this.messagingService.raiseAlert(err);
				});
    		}
	}
  
	deleteVehicle():Promise<any> {
		let yesButton = new AlertButtonConfigClass();
		let noButton = new AlertButtonConfigClass();
		yesButton.text = this.translateService.instant('VEHICLEDETAILS.BUTTONS.DELETEVEHICLECONFIRM.YES');
		yesButton.handler = () => {
			return this.vehicleService.removeVehicle(this.thisVehicle)
				.then((resp) => {
					if(resp.success){
					  return this.vehicleService.vehicleList();
					}
				})
				.then(() => {
					return this.navCtrl.pop();
				})
				.catch((err) => {
					this.messagingService.alertConfig.title = this.translateService.instant('ALERTS.TITLES.ERROR');
					return this.messagingService.raiseAlert(err.msg);
				});
		};
		noButton.text = this.translateService.instant('VEHICLEDETAILS.BUTTONS.DELETEVEHICLECONFIRM.NO');
		return this.messagingService.raiseConfirm(this.translateService.instant('VEHICLEDETAILS.CONFIRMS.DELETEVEHICLECONFIRM'), [yesButton, noButton])
	}	  

	cancel():Promise<any> {
  		let yesButton = new AlertButtonConfigClass();
		let noButton = new AlertButtonConfigClass();
		  
		yesButton.text = this.translateService.instant('VEHICLEDETAILS.BUTTONS.CANCELCONFIRM.YES');
		yesButton.handler = () => {
  			return this.navCtrl.pop();
  		};
		  
		noButton.text = this.translateService.instant('VEHICLEDETAILS.BUTTONS.CANCELCONFIRM.NO');
		if(this.vehicleDetails.dirty){
			this.messagingService.alertConfig.title = this.translateService.instant('VEHICLEDETAILS.CONFIRMS.CANCELCONFIRM.TITLE');
			return this.messagingService.raiseConfirm(this.translateService.instant('VEHICLEDETAILS.CONFIRMS.CANCELCONFIRM.MESSAGE'), [yesButton, noButton]);
		} else {
			return this.navCtrl.pop();
		}
	}

	scan():Promise<any> {
		return this.barcodeScanner.scan({showTorchButton:true})
			.then((data) => {
				this.thisVehicle.vin = data.text;
			});
	}
}