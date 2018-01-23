import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Content} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";

import {MessagingService} from "../shared/services/messaging.service";
import {VehiclesDetailsComponent} from "../vehicles-details/vehicles-details.component";
import {VehicleService} from "../shared/services/vehicle.service";
import {Vehicle} from "../shared/interfaces/vehicle.interface";
import {AlertButtonConfigClass} from "../shared/classes/alertConfig.class";
import {UserClass} from "../shared/classes/user.class";
import {List} from 'ionic-angular/components/list/list';

@IonicPage()
@Component({
  selector: 'pbm-vehicles',
  templateUrl: 'vehicles.component.html'
})
export class VehiclesComponent {
  @ViewChild(Content) content: Content;
  @ViewChild(List) list: List;
  public vehicles: Vehicle[] = [];

    constructor(
    	public navCtrl: NavController,
	    public navParams: NavParams,
	    private messagingService: MessagingService,
	    private vehicleService: VehicleService,
	    private userClass: UserClass,
	    private translationService: TranslateService
    ) {}

	ionViewWillEnter(){
    	this.vehicles = this.userClass.vehicleList;
    	//TODO: When ionic fixes the refresh problem that happens after adding an item to a list we should probably remove this.
		//See this issue: https://github.com/ionic-team/ionic/issues/13028
    	this.content.resize();
	}

  public addNewVehicle(){
    this.navCtrl.push(VehiclesDetailsComponent, {'theVehicle': this.vehicleService.newVehicle()});
  }

  editVehicle(theVehicle:Vehicle) {
    this.navCtrl.push(VehiclesDetailsComponent, {'theVehicle': theVehicle});
  }

	deleteVehicle(theVehicle:Vehicle):Promise<any> {
		let yesButton = new AlertButtonConfigClass();
		let noButton = new AlertButtonConfigClass();
        yesButton.text = this.translationService.instant('VEHICLES.BUTTONS.CONFIRMS.DELETEVEHICLECONFIRM.YES');
        noButton.text = this.translationService.instant('VEHICLES.BUTTONS.CONFIRMS.DELETEVEHICLECONFIRM.NO');
		yesButton.handler = () => {
			return this.vehicleService.removeVehicle(theVehicle)
				.then((resp) => {
					if(resp.success){
            return this.vehicleService.vehicleList()
              .then((resp) => {
                this.vehicles = resp;
              })
          }
				})
				.then(() => {
          this.content.resize();
				})
				.catch((err) => {
					this.messagingService.alertConfig.title = this.translationService.instant('VEHICLES.ERRORTITLE');
					return this.messagingService.raiseAlert(err.msg);
				});
    };

    return this.messagingService.raiseConfirm(this.translationService.instant('VEHICLES.CONFIRMS.DELETEVEHICLE') + theVehicle.alias + '?', [yesButton, noButton])
      .then((resp) => {
        this.list.closeSlidingItems();
      });
	}	  
}