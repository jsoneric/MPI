import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, Content} from 'ionic-angular';
import {FormsModule}   from '@angular/forms';
import {HttpClientModule, HttpClient}    from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {CardIO} from "@ionic-native/card-io";
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {IsDebug} from '@ionic-native/is-debug';
import {AppVersion} from "@ionic-native/app-version";
import {SQLite} from "@ionic-native/sqlite";

import {PayByMobileComponent } from './app.component';
import {LoginComponent } from './login/login.component';
import {ForgotComponent } from './forgot/forgot.component';
import {SignUpComponent } from './sign-up/sign-up.component';
import {CreditCardsComponent} from './credit-cards/credit-cards.component';
import {AddAuthorizedotnetCardComponent} from "./credit-cards/authorizedotnet/add-authorizedotnet-card/add-authorizedotnet-card.component";
import {AddPaymentusCardComponent} from "./credit-cards/paymentus/add-paymentus-card/add-paymentus-card.component";
import {AddSpreedlyCardComponent} from "./credit-cards/spreedly/add-spreedly-card/add-spreedly-card.component";
import {EditAuthorizedotnetCardComponent} from "./credit-cards/authorizedotnet/edit-authorizedotnet-card/edit-authorizedotnet-card.component";
import {EditPaymentusCardComponent} from "./credit-cards/paymentus/edit-paymentus-card/edit-paymentus-card.component";
import {EditSpreedlyCardComponent} from "./credit-cards/spreedly/edit-spreedly-card/edit-spreedly-card.component";
import {HistoryComponent } from './history/history.component';
import {ParkComponent } from './park/park.component';
import {ParkPurchaseComponent } from './park-purchase/park-purchase.component';
import {PermitsComponent } from './permits/permits.component';
import {PermitDetailsComponent } from './permit-details/permit-details.component';
import {VehiclesComponent } from './vehicles/vehicles.component';
import {VehiclesDetailsComponent} from "./vehicles-details/vehicles-details.component";

import {HttpService} from "./shared/services/http.service"
import {LocalStorageService} from "./shared/services/localStorage.service";
import {ConfigurationService} from "./shared/services/configuration.service";
import {LoggingService} from "./shared/services/logging.service";
import {UserClass} from "./shared/classes/user.class";
import {MessagingService} from "./shared/services/messaging.service";
import {ListService} from "./shared/services/list.service";
import {VehicleService} from "./shared/services/vehicle.service";
import {PermitService} from "./shared/services/permit.service";
import {ShowHideContainerComponent} from '../components/show-hide-password/show-hide-container.component';
import {ShowHideInputDirective} from '../components/show-hide-password/show-hide-input.component';
import {UppercaseDirective} from "../components/uppercase/uppercase.directive";
import {AvailablePermitsComponent} from "./available-permits/available-permits.component";
import {CreditCardService} from "./shared/services/creditCard.service";

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	declarations: [
		PayByMobileComponent,
		LoginComponent,
		ForgotComponent,
		SignUpComponent,
		CreditCardsComponent,
		HistoryComponent,
		ParkComponent,
		ParkPurchaseComponent,
		PermitsComponent,
		PermitDetailsComponent,
		VehiclesComponent,
		AddAuthorizedotnetCardComponent,
		AddPaymentusCardComponent,
		AddSpreedlyCardComponent,
		EditAuthorizedotnetCardComponent,
		EditPaymentusCardComponent,
		EditSpreedlyCardComponent,
		VehiclesDetailsComponent,
		ShowHideContainerComponent,
		ShowHideInputDirective,
		UppercaseDirective,
		AvailablePermitsComponent
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(PayByMobileComponent),
		HttpClientModule,
		FormsModule,
		IonicStorageModule.forRoot({name : 'PayByMobile'}),
		TranslateModule.forRoot({loader: {
			provide: TranslateLoader,
			useFactory: HttpLoaderFactory,
			deps: [HttpClient]
		}})
	],
	bootstrap: [IonicApp],
	entryComponents: [
		PayByMobileComponent,
		LoginComponent,
		CreditCardsComponent,
		SignUpComponent,
		ForgotComponent,
		ParkComponent,
		ParkPurchaseComponent,
		PermitsComponent,
		PermitDetailsComponent,
		VehiclesComponent,
		HistoryComponent,
		AddAuthorizedotnetCardComponent,
		AddPaymentusCardComponent,
		AddSpreedlyCardComponent,
		EditAuthorizedotnetCardComponent,
		EditPaymentusCardComponent,
		EditSpreedlyCardComponent,
		VehiclesDetailsComponent,
		AvailablePermitsComponent
	],
	providers: [
		AppVersion,
		StatusBar,
		SplashScreen,
		SQLite,
		IsDebug,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		HttpService,
		LocalStorageService,
		ConfigurationService,
		LoggingService,
		UserClass,
		MessagingService,
		ListService,
		VehicleService,
		BarcodeScanner,
		CardIO,
		Content,
		PermitService,
		CreditCardService
	],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
