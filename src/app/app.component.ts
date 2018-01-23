import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Nav, Platform, Events} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TranslateService} from '@ngx-translate/core';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";

import {LoginComponent} from './login/login.component';
import {UserClass} from "./shared/classes/user.class";
import {CreditCardsComponent} from './credit-cards/credit-cards.component';
import {ParkComponent} from './park/park.component';
import {VehiclesComponent} from './vehicles/vehicles.component';
import {HistoryComponent} from './history/history.component';
import {AddTimeComponent} from "./add-time/add-time.component"

import {ConfigurationService} from "./shared/services/configuration.service";
import {LoggingService} from "./shared/services/logging.service";
import {ListService} from "./shared/services/list.service";

@Component({
	templateUrl: 'app.component.html'
})
export class PayByMobileComponent {
	@ViewChild(Nav) nav: Nav;
	rootComponent: any = LoginComponent;
	Components: Array<{title: string, icon: string, component: any, isPublic: boolean}> = [];
	public owner: Object = {first_name:'', last_name:''};
	private db: SQLiteObject;

	constructor(
		public platform: Platform,
		public statusBar: StatusBar,
		public splashScreen: SplashScreen,
		private configuration: ConfigurationService,
		private loggingService: LoggingService,
		public userClass: UserClass,
		private formBuilder: FormBuilder,
		private translate: TranslateService,
		private listService: ListService,
		private sqlite: SQLite,
		public events: Events
		) {
		
		this.Components = [
			{ title: 'Park', icon: 'home', component: ParkComponent, isPublic:true},
			//{ title: 'Permits', icon: 'pricetags', component: PermitsComponent, isPublic:true},
			{ title: 'Vehicles', icon: 'car', component: VehiclesComponent, isPublic:true},			
			{ title: 'Credit Cards', icon: 'card', component: CreditCardsComponent, isPublic:true},			
			{ title: 'Purchase History', icon: 'paper', component: HistoryComponent, isPublic:true},			
		];

		events.subscribe('user:login', (owner) => {
			this.owner = owner;
		});
		
		this.platform.ready()
			.then(() => {
				this.loggingService.info('platform is ready', true);
				translate.setDefaultLang('en-us');
				translate.use(navigator.language.toLowerCase());
				this.loggingService.info('The device language is ' + this.translate.currentLang, true);
				this.openDatabase();
			});
	}

	openComponent(Component) {
		let page = Component.component; 

		if(Component.title == 'Park') {
			this.nav.setRoot(page);	
		} else {
			this.nav.push(page);	
		}
	}

	private openDatabase(){
		this.loggingService.info('opening database', true);
		this.sqlite.create({name:'mpi.db',location:'default'})
			.then((dbo) => {
				this.db = dbo;
				this.loggingService.info('Database opened successfully', true);
				this.createTables();
			})
			.catch((e) => {
				this.loggingService.info('Attempting to open database threw a database error: ' + JSON.stringify(e), true);
				this.showLogin();
			});
	}

	private createTables(){
		this.loggingService.info('creating database tables if they do not exist', true);
		this.db.executeSql('CREATE TABLE IF NOT EXISTS LogLevel (LogLevelSetting INT)', {})
			.then(() => {
				this.loggingService.info('LogLevelSetting table created successfully', true);
				return this.db.executeSql('CREATE TABLE IF NOT EXISTS Logins (Credentials VARCHAR(2000))', {});
			})
			.then(() => {
				this.loggingService.info('Logins table created successfully', true);
				this.setLogLevel();
			})
			.catch((e) => {
				this.loggingService.info('Attempting to create tables threw a database error: ' + JSON.stringify(e), true);
				this.showLogin();
			});
	}

	private setLogLevel(){
		this.loggingService.info('getting log level', true);
		this.db.executeSql('SELECT LogLevelSetting FROM LogLevel', {})
			.then((results) => {
				console.debug(JSON.stringify(results));
				this.loggingService.info('logLevel search did not throw an error', true);
				if(!results.rows.length){
					this.loggingService.info('no log level, so setting it to 1', true);
					//this should set it in the DB as well
					this.configuration.setLogLevel(1);
				} else {
					this.loggingService.info('logLevel is populated, setting log level to ' + results.rows.item(0), true);
					//this should set it in the DB as well
					this.configuration.setLogLevel(+results);
				}
				this.getStoredLogin();
			})
			.catch((e) => {
				this.loggingService.info('Attempting to get log level threw database error: ' + JSON.stringify(e), true);
				this.showLogin();
			});
	}

	private getStoredLogin(){
		let loginForm: FormGroup;
		let credsArray: string[];

		this.loggingService.info('checking for credentials', true);
		this.db.executeSql('SELECT Credentials FROM Logins', {})
			.then((results) => {
				this.loggingService.info('credentials search did not get rejected', true);
				console.debug(JSON.stringify(results));
				if(!results.rows.length){
					this.loggingService.info('credentials are not present', true);
					this.showLogin();
				} else {
					this.loggingService.info('credentials are present', true);
					credsArray = results.rows.item(0);
					loginForm = this.formBuilder.group({
						j_username:[credsArray[0]],
						j_password:[credsArray[1]]
					});
					this.doLogin(loginForm);
				}
			})
			.catch((e) => {
				this.loggingService.info('Attempting to get stored credentials threw database error: ' + JSON.stringify(e), true);
				this.showLogin();
			});
	}

	private doLogin(loginForm: FormGroup){
		this.loggingService.info('attempting login', true);
		this.userClass.login(loginForm)
			.then(() => {
				this.loggingService.info('Login successful', true);
				this.listService.loadLists();
				this.nav.setRoot(ParkComponent);
			})
			.catch((e) => {
				this.loggingService.info('Attemting login threw login error: ' + JSON.stringify(e), true);
				this.showLogin();
			});
	}

	private showLogin():Promise<any> {
		this.loggingService.info('showLogin called', true);
		this.loggingService.info('setting statusBar style', true);
		this.statusBar.styleDefault();
		this.loggingService.info('hiding splash screen', true);
		this.splashScreen.hide();
		this.loggingService.info('setting root navigation', true);
		return this.nav.setRoot(this.rootComponent);
	}
}
