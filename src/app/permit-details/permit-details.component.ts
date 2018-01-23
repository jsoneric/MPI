import {Vehicle} from '../shared/interfaces/vehicle.interface';
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {AlertButtonConfigClass} from "../shared/classes/alertConfig.class";
import {MessagingService} from "../shared/services/messaging.service";
import {PermitService} from "../shared/services/permit.service";
import {Permit} from '../shared/interfaces/permit.interface';
import {UserClass} from "../shared/classes/user.class";

@IonicPage()
@Component({
    selector: 'pbm-permit-details',
    templateUrl: 'permit-details.component.html'
})
export class PermitDetailsComponent {
    public userVehicles: Vehicle[];
    public permitVehicles: any[];
    public permit: Permit;
    public maxVehiclesSelected: boolean;

    constructor(
        private navCtrl: NavController,
        private messagingService: MessagingService,
        private navParams: NavParams,
        private permitService: PermitService,
        private userClass: UserClass
    ) {
        this.permit = <Permit>this.navParams.get('thePermit');
    }

    ionViewWillEnter() {
        this.loadVehicles();
    }  
    
    loadVehicles() {
        this.userClass.reload()
        .then(() => {
            this.userVehicles = this.userClass.vehicleList;
            let currentPermitVehicles = this.permit.vehicles;

            this.permitVehicles = this.userVehicles.map(function(vechicle){
                let isPermitVehicle = currentPermitVehicles.some(obj => {return obj.vehicle_id === vechicle.vehicle_id});
                return {'vehicle_id': vechicle.vehicle_id, 'alias': vechicle.alias, 'checked': isPermitVehicle};
            });

            this.maxVehiclesSelected = this.getMaxVehiclesSelected();
        });
    }

    checkboxClicked() {
        this.maxVehiclesSelected = this.getMaxVehiclesSelected();
    }

    getMaxVehiclesSelected() {
        let maxVehicles = this.permit.type.max_vehicles,
        totalSelected = this.permitVehicles.filter(obj => obj.checked).length;

        return (totalSelected >= maxVehicles);
    }

    saveEdits() {
        let params = {
            mpermit_id: this.permit.mpermit_id,
            vehicles: []
        };

        params.vehicles = this.permitVehicles
            .filter(obj => obj.checked === true)
            .map(obj => obj.vehicle_id);

        this.permitService.updatePermit(params)
            .then(() => {
                this.navCtrl.pop();
            });
    }
    
    cancel() {
        this.navCtrl.pop();
    }
    
    /*
    //TODO Endpoint is needed to delete permits
    deletePermit() {
        let yesButton = new AlertButtonConfigClass();
		let noButton = new AlertButtonConfigClass();
		yesButton.text = 'Yes';
		yesButton.handler = () => {
			this.permitService.removePermit(this.permit)
				.then((resp) => {
					if(resp.success){
                        this.navCtrl.pop();
					}
				})
				.catch((err) => {
					this.messagingService.alertConfig.title = 'Error';
					this.messagingService.raiseAlert(err.msg);
				});
		};
		noButton.text = 'No';
		this.messagingService.raiseConfirm('Are you sure you want to delete this permit?', [yesButton, noButton])
    }
    */	  
}