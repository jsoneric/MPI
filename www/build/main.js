webpackJsonp([12],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddPaymentusCardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_card_io__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_creditCard_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_services_messaging_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__assets_constants__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_classes_alertConfig_class__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









let AddPaymentusCardComponent = class AddPaymentusCardComponent {
    constructor(navCtrl, formBuilder, creditCardService, messagingService, cardIO, translationService) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.creditCardService = creditCardService;
        this.messagingService = messagingService;
        this.cardIO = cardIO;
        this.translationService = translationService;
        this.cardTypes = __WEBPACK_IMPORTED_MODULE_7__assets_constants__["a" /* CreditCardTypes */];
        this.ccExpirationDate = { 'month': 0, 'year': 0 };
        this.creditCard = this.creditCardService.newCard();
        this.creditCardForm = this.formBuilder.group({
            'alias': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(50), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z ]*')])],
            'billing_first_name': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(50), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z]*')])],
            'billing_last_name': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(50), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z ]*')])],
            'billing_zip': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(5), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(5), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9]*')])],
            'cc_mask': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(15), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(16), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[0-9]*')])],
            'cc_exp_date': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])],
            'cvv': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(3), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(4), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[0-9]*')])]
        });
    }
    showCVVInfo() {
        let toastConfig = {
            message: this.cardTypes[this.creditCard.cc_type_id - 1].cvvMessage,
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: 'Ok',
            dismissOnPageChange: true
        };
        return this.messagingService.raiseToast(toastConfig);
    }
    setExpirationDate(e) {
        this.ccExpirationDate = e;
    }
    save() {
        console.debug('Form is valid: ' + this.creditCardForm.valid);
        if (this.creditCardForm.pristine) {
            console.debug('add credit card form is pristine');
            return this.navCtrl.pop();
        }
        else if (this.creditCardForm.valid) {
            this.creditCard.alias = this.creditCardForm.get('alias').value;
            this.creditCard.billing_first_name = this.creditCardForm.get('billing_first_name').value;
            this.creditCard.billing_last_name = this.creditCardForm.get('billing_last_name').value;
            this.creditCard.card_mask = this.creditCardForm.get('cc_mask').value;
            this.creditCard.billing_zip = this.creditCardForm.get('billing_zip').value;
            this.creditCard.cc_exp_month = this.ccExpirationDate.month;
            this.creditCard.cc_exp_year = this.ccExpirationDate.year;
            console.debug('passing to service');
            return this.creditCardService.saveCard(this.creditCard)
                .then((resp) => {
                if (resp.success) {
                    return this.navCtrl.pop();
                }
                else {
                    this.messagingService.alertConfig.title = this.translationService.instant('ALERTS.TITLES.ERROR');
                    return this.messagingService.raiseAlert(resp.msg);
                }
            })
                .catch((err) => {
                this.messagingService.alertConfig.title = this.translationService.instant('ALERTS.TITLES.ERROR');
                return this.messagingService.raiseAlert(err);
            });
        }
        else {
            console.debug('validity of alias: ' + this.creditCardForm.get('alias').valid);
            console.debug('validity of billing_first_name: ' + this.creditCardForm.get('billing_first_name').valid);
            console.debug('validity of billing_last_name: ' + this.creditCardForm.get('billing_last_name').valid);
            console.debug('validity of billing_zip: ' + this.creditCardForm.get('billing_zip').valid);
            console.debug('validity of cc_type: ' + this.creditCardForm.get('cc_type').valid);
            console.debug('validity of cc_exp_date: ' + this.creditCardForm.get('cc_exp_date').valid);
            console.debug('validity of cc_mask: ' + this.creditCardForm.get('cc_mask').valid);
            console.debug('validity of cvv: ' + this.creditCardForm.get('cvv').valid);
            //console.debug('validity of : ' + this.creditCardForm.get('').valid);
        }
    }
    cancel() {
        let yesButton = new __WEBPACK_IMPORTED_MODULE_8__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        let noButton = new __WEBPACK_IMPORTED_MODULE_8__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        yesButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.YES');
        yesButton.handler = () => {
            return this.navCtrl.pop();
        };
        noButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.NO');
        if (this.creditCardForm.dirty) {
            this.messagingService.alertConfig.title = this.translationService.instant('CREDITCARDS.ALERTS.DISCARD');
            return this.messagingService.raiseConfirm(this.translationService.instant('CREDITCARDS.PROMPTS.DISCARD'), [yesButton, noButton]);
        }
        else {
            return this.navCtrl.pop();
        }
    }
    scan() {
        let options = {
            requireExpiry: true,
            requirePostalCode: true,
            scanExpiry: true
        };
        return this.cardIO.canScan()
            .then((resp) => {
            if (resp) {
                return this.cardIO.scan(options)
                    .then((resp) => {
                    this.creditCard.card_mask = resp.cardNumber;
                    this.creditCard.cc_exp_month = resp.expiryMonth;
                    this.creditCard.cc_exp_year = resp.expiryYear;
                    let thisCardType = this.creditCardService.getCardType(resp.cardType);
                    this.creditCard.cc_type_id = thisCardType.cc_type_id;
                    // this.creditCard.billing_first_name = resp.cardholderName.substring(0, resp.cardholderName.indexOf(' '));
                    // this.creditCard.billing_last_name = resp.cardholderName.substring(resp.cardholderName.indexOf(' ') + 1);
                    this.creditCard.billing_zip = resp.postalCode;
                    this.creditCardForm.markAsDirty();
                });
            }
        });
    }
};
AddPaymentusCardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'pbm-add-paymentus-card',template:/*ion-inline-start:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/credit-cards/paymentus/add-paymentus-card/add-paymentus-card.component.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{ \'CREDITCARDS.PAGETITLES.ADDCARD\' | translate }}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <form [formGroup]="creditCardForm">\n    <!-- Paymentus -->\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.ALIAS\' | translate }}</ion-label>\n      <ion-input type="text" formControlName="alias" [(ngModel)]="creditCard.alias"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.FIRSTNAME\' | translate }}</ion-label>\n      <ion-input type="text" formControlName="billing_first_name" [(ngModel)]="creditCard.billing_first_name" placeholder=""></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.LASTNAME\' | translate }}</ion-label>\n      <ion-input type="text" formControlName="billing_last_name" [(ngModel)]="creditCard.billing_last_name" placeholder=""></ion-input>\n    </ion-item>\n    \n    <!-- credit card number -->\n    <div class="wrapper">\n      <ion-item>\n        <ion-label floating>{{ \'CREDITCARDS.LABELS.CARDNUMBER\' | translate }}</ion-label>\n        <ion-input type="text" formControlName="cc_mask" [(ngModel)]="creditCard.cc_mask"></ion-input>\n      </ion-item>\n      <a class="icon-button" (click)="scan()">\n        <ion-icon name="camera"></ion-icon>\n      </a>\n    </div>\n\n    <!-- expiration date -->\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.EXPIRATIONDATE\' | translate }}</ion-label>\n      <ion-datetime \n        displayFormat="MM/YY"\n        pickerFormat="MM/YYYY"\n        min="2017"\n        max="2031" \n        formControlName="cc_exp_date"\n        (ionChange)="setExpirationDate($event)">\n      </ion-datetime>\n    </ion-item>\n        \n    <!-- cvv -->\n    <div class="wrapper">\n      <ion-item>\n        <ion-label floating>{{ \'CREDITCARDS.LABELS.SECURITYCODE\' | translate }}</ion-label>\n          <ion-input type="password" formControlName="cvv" [(ngModel)]="creditCard.cvv"></ion-input>\n      </ion-item>\n      <a class="icon-button" (click)="showCVVInfo()">\n        <ion-icon name="help-circle"></ion-icon>\n      </a>\n    </div>\n\n    <!-- zip code -->\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.ZIPCODE\' | translate }}</ion-label>\n      <ion-input type="text" formControlName="billing_zip" [(ngModel)]="creditCard.billing_zip"></ion-input>\n    </ion-item>\n  </form>\n</ion-content>\n\n<ion-footer no-border>\n  <ion-toolbar>\n    <button ion-button round (click)="cancel()" color="danger">{{ \'CREDITCARDS.BUTTONS.CANCEL\' | translate }}</button>\n    <button ion-button round (click)="save()">{{ \'CREDITCARDS.BUTTONS.SAVE\' | translate }}</button>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/credit-cards/paymentus/add-paymentus-card/add-paymentus-card.component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_5__shared_services_creditCard_service__["a" /* CreditCardService */],
        __WEBPACK_IMPORTED_MODULE_6__shared_services_messaging_service__["a" /* MessagingService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_card_io__["a" /* CardIO */],
        __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */]])
], AddPaymentusCardComponent);

//# sourceMappingURL=add-paymentus-card.component.js.map

/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddSpreedlyCardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_creditCard_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_messaging_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_constants__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_classes_alertConfig_class__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








let AddSpreedlyCardComponent = class AddSpreedlyCardComponent {
    constructor(navCtrl, formBuilder, creditCardService, messagingService, translationService) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.creditCardService = creditCardService;
        this.messagingService = messagingService;
        this.translationService = translationService;
        this.cardTypes = __WEBPACK_IMPORTED_MODULE_6__assets_constants__["a" /* CreditCardTypes */];
        this.ccExpirationDate = { 'month': 0, 'year': 0 };
        this.additionalFields = {};
        this.creditCard = this.creditCardService.newCard();
        this.creditCardForm = this.formBuilder.group({
            'alias': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(50), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z ]*')])],
            'billing_first_name': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(50), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z]*')])],
            'billing_last_name': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(50), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z ]*')])],
            'billing_zip': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(5), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(5), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9]*')])],
            'cc_exp_date': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])]
        });
    }
    ionViewDidLoad() {
        //console.debug('initializing Spreedly with environment key:' + this.creditCardService.merchant().environmentKey);
        Spreedly.init(this.creditCardService.merchant().environmentKey, {
            'numberEl': 'spreedlyNumber',
            'cvvEl': 'spreedlyCvv'
        });
        Spreedly.on('ready', function () {
            //console.log('Spreedly is ready for battle');
        });
        Spreedly.on('errors', function (errors) {
            for (var e = 0; e < errors.length; e++) {
                console.error(errors[e]);
            }
        });
        Spreedly.on('validation', (inputProperties) => {
            //console.debug('Spreedly validation event handler');
            if (inputProperties.validNumber && inputProperties.validCvv) {
                //console.debug('card is valid, cvv is valid, sending to tokenization');
                this.additionalFields.first_name = this.creditCardForm.get('billing_first_name').value;
                this.additionalFields.last_name = this.creditCardForm.get('billing_last_name').value;
                this.additionalFields.month = this.ccExpirationDate.month;
                this.additionalFields.year = this.ccExpirationDate.year;
                this.additionalFields.zip = this.creditCardForm.get('billing_zip').value;
                Spreedly.tokenizeCreditCard(this.additionalFields);
            }
            else {
                //console.debug('card or cvv not valid, returning error');
                let errMsg = '';
                if (!inputProperties.validNumber) {
                    errMsg += this.translationService.instant('CREDITCARDS.ALERTS.INVALIDCARDNUMBER');
                }
                if (!inputProperties.validCvv) {
                    errMsg += this.translationService.instant('CREDITCARDS.ALERTS.INVALIDCVV');
                }
                this.messagingService.alertConfig.title = this.translationService.instant('ALERTS.TITLES.ERROR');
                this.messagingService.raiseAlert(errMsg);
            }
        });
        Spreedly.on('paymentMethod', (token, paymentMethod) => {
            //console.debug('Spreedly paymentMethod handler');
            this.creditCard.payment_method_token = token;
            this.creditCard.card_mask = `${paymentMethod.first_six_digits}******${paymentMethod.last_four_digits}`;
            this.creditCard.payment_method_fingerprint = paymentMethod.fingerprint;
            //console.debug('tokenization complete, sending the card to our server');
            this.sendToServer();
        });
    }
    showCVVInfo() {
        let toastConfig = {
            message: this.cardTypes[this.creditCard.cc_type_id - 1].cvvMessage,
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: this.translationService.instant('CREDITCARDS.BUTTONS.OK'),
            dismissOnPageChange: true
        };
        return this.messagingService.raiseToast(toastConfig);
    }
    setExpirationDate(monthYear) {
        this.ccExpirationDate = monthYear;
    }
    save() {
        // console.debug('validity of alias: ' + this.creditCardForm.get('alias').valid);
        // console.debug('validity of billing_first_name: ' + this.creditCardForm.get('billing_first_name').valid);
        // console.debug('validity of billing_last_name: ' + this.creditCardForm.get('billing_last_name').valid);
        // console.debug('validity of billing_zip: ' + this.creditCardForm.get('billing_zip').valid);
        // console.debug('validity of cc_exp_date: ' + this.creditCardForm.get('cc_exp_date').valid);
        if (this.creditCardForm.pristine) {
            //console.debug('add credit card form is pristine');
            return this.navCtrl.pop();
        }
        else if (this.creditCardForm.valid) {
            //console.debug('Form is valid: ' + this.creditCardForm.valid);
            Spreedly.validate();
        }
    }
    cancel() {
        let yesButton = new __WEBPACK_IMPORTED_MODULE_7__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        let noButton = new __WEBPACK_IMPORTED_MODULE_7__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        yesButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.YES');
        yesButton.handler = () => {
            return this.navCtrl.pop();
        };
        noButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.NO');
        if (this.creditCardForm.dirty) {
            this.messagingService.alertConfig.title = this.translationService.instant('CREDITCARDS.ALERTS.DISCARD');
            return this.messagingService.raiseConfirm(this.translationService.instant('CREDITCARDS.PROMPTS.DISCARD'), [yesButton, noButton]);
        }
        else {
            return this.navCtrl.pop();
        }
    }
    sendToServer() {
        this.creditCard.alias = this.creditCardForm.get('alias').value;
        this.creditCard.billing_first_name = this.creditCardForm.get('billing_first_name').value;
        this.creditCard.billing_last_name = this.creditCardForm.get('billing_last_name').value;
        this.creditCard.billing_zip = this.creditCardForm.get('billing_zip').value;
        this.creditCard.cc_exp_month = this.ccExpirationDate.month;
        this.creditCard.cc_exp_year = this.ccExpirationDate.year;
        //console.debug('passing to service');
        return this.creditCardService.saveCard(this.creditCard)
            .then((resp) => {
            if (resp.success) {
                //console.debug('back from server with success');
                return this.navCtrl.pop();
            }
            else {
                this.messagingService.alertConfig.title = this.translationService.instant('ALERTS.TITLES.ERROR');
                return this.messagingService.raiseAlert(resp.msg);
            }
        })
            .catch((err) => {
            this.messagingService.alertConfig.title = this.translationService.instant('ALERTS.TITLES.ERROR');
            return this.messagingService.raiseAlert(err);
        });
    }
};
AddSpreedlyCardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'pbm-add-spreedly-card',template:/*ion-inline-start:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/credit-cards/spreedly/add-spreedly-card/add-spreedly-card.component.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{ \'CREDITCARDS.PAGETITLES.ADDCARD\' | translate }}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <form [formGroup]="creditCardForm">\n    <!-- Spreedly -->\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.ALIAS\' | translate }}</ion-label>\n      <ion-input type="text" formControlName="alias" [(ngModel)]="creditCard.alias"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.FIRSTNAME\' | translate }}</ion-label>\n      <ion-input type="text" formControlName="billing_first_name" [(ngModel)]="creditCard.billing_first_name" placeholder=""></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.LASTNAME\' | translate }}</ion-label>\n      <ion-input type="text" formControlName="billing_last_name" [(ngModel)]="creditCard.billing_last_name" placeholder=""></ion-input>\n    </ion-item>\n    \n    <!-- credit card number -->\n    <div class="wrapper">\n      <ion-item>\n        <ion-label floating>{{ \'CREDITCARDS.LABELS.CARDNUMBER\' | translate }}</ion-label>\n	      <ion-label>\n		      <div id="spreedlyNumber"></div>\n	      </ion-label>\n      </ion-item>\n    </div>\n\n    <!-- expiration date -->\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.EXPIRATIONDATE\' | translate }}</ion-label>\n      <ion-datetime \n        displayFormat="MM/YY"\n        pickerFormat="MM/YYYY"\n        min="2017"\n        max="2031" \n        formControlName="cc_exp_date"\n        (ionChange)="setExpirationDate($event)">\n      </ion-datetime>\n    </ion-item>\n        \n    <!-- cvv -->\n    <div class="wrapper">\n      <ion-item>\n        <ion-label floating>{{ \'CREDITCARDS.LABELS.SECURITYCODE\' | translate }}</ion-label>\n	      <ion-label>\n		      <div id="spreedlyCvv"></div>\n	      </ion-label>\n      </ion-item>\n      <a class="icon-button" (click)="showCVVInfo()">\n        <ion-icon name="help-circle"></ion-icon>\n      </a>\n    </div>\n\n    <!-- zip code -->\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.ZIPCODE\' | translate }}</ion-label>\n      <ion-input type="text" formControlName="billing_zip" [(ngModel)]="creditCard.billing_zip"></ion-input>\n    </ion-item>\n  </form>\n</ion-content>\n\n<ion-footer no-border>\n  <ion-toolbar>\n    <button ion-button round (click)="cancel()" color="danger">{{ \'CREDITCARDS.BUTTONS.CANCEL\' | translate }}</button>\n    <button ion-button round (click)="save()">{{ \'CREDITCARDS.BUTTONS.SAVE\' | translate }}</button>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/credit-cards/spreedly/add-spreedly-card/add-spreedly-card.component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_4__shared_services_creditCard_service__["a" /* CreditCardService */],
        __WEBPACK_IMPORTED_MODULE_5__shared_services_messaging_service__["a" /* MessagingService */],
        __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */]])
], AddSpreedlyCardComponent);

//# sourceMappingURL=add-spreedly-card.component.js.map

/***/ }),

/***/ 12:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_toastConfig_class__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classes_alertConfig_class__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let MessagingService = class MessagingService {
    constructor(toastController, alertController) {
        this.toastController = toastController;
        this.alertController = alertController;
        this.dismissButton = new __WEBPACK_IMPORTED_MODULE_3__classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        this.toastConfig = new __WEBPACK_IMPORTED_MODULE_2__classes_toastConfig_class__["a" /* ToastConfigClass */]();
        this.alertConfig = new __WEBPACK_IMPORTED_MODULE_3__classes_alertConfig_class__["b" /* AlertConfigClass */]();
        this.dismissButton.text = 'Dismiss';
    }
    raiseToast(config, dismissFunction) {
        if (typeof config == 'string') {
            this.toastConfig.message = config;
            this.toast = this.toastController.create(this.toastConfig);
        }
        else {
            this.toast = this.toastController.create(config);
        }
        if (dismissFunction) {
            this.toast.onDidDismiss(dismissFunction);
        }
        return this.toast.present();
    }
    raiseAlert(config) {
        if (typeof config == 'string') {
            this.alertConfig.message = config;
            this.alert = this.alertController.create(this.alertConfig);
        }
        else {
            this.alert = this.alertController.create(config);
        }
        return this.alert.present();
    }
    raiseConfirm(config, buttons) {
        this.alertConfig.buttons = buttons;
        if (typeof config == 'string') {
            this.alertConfig.message = config;
            this.alert = this.alertController.create(this.alertConfig);
        }
        else {
            this.alert = this.alertController.create(config);
        }
        return this.alert.present();
    }
};
MessagingService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], MessagingService);

//# sourceMappingURL=messaging.service.js.map

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_classes_user_class__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_logging_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_services_messaging_service__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







let ForgotComponent = class ForgotComponent {
    constructor(navCtrl, formBuilder, messagingService, userClass, loggingService, translationService) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.messagingService = messagingService;
        this.userClass = userClass;
        this.loggingService = loggingService;
        this.translationService = translationService;
        this.dismissFunction = () => {
            this.backToLogin();
        };
        this.forgot = this.formBuilder.group({
            username: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(4), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('[a-zA-Z0-9]*'), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])]
        });
    }
    resetPassword() {
        return this.userClass.resetPassword(this.forgot)
            .then((result) => {
            if (result.success) {
                this.loggingService.info('Successful password reset');
                return this.messagingService.raiseToast(result.msg, this.dismissFunction);
            }
            else {
                this.loggingService.info('Unsuccessful password reset');
                this.messagingService.alertConfig.title = this.translationService.instant('ALERTS.TITLES.ERROR');
                return this.messagingService.raiseAlert(this.translationService.instant('FORGOT.ERRORMESSAGES.RESETERROR') + result.msg);
            }
        })
            .catch((err) => {
            this.messagingService.alertConfig.title = this.translationService.instant('ALERTS.TITLES.ERROR');
            return this.messagingService.raiseAlert(this.translationService.instant('FORGOT.ERRORMESSAGES.RESETFATALERROR') + err.msg);
        });
    }
    backToLogin() {
        this.navCtrl.pop();
    }
};
ForgotComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'pbm-forgot',template:/*ion-inline-start:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/forgot/forgot.component.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>{{ \'FORGOT.TITLE\' | translate }}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n    \n\n<ion-content padding class="auth-content">\n\n  <form class="auth-form" [formGroup]="forgot">\n\n    <p translate>FORGOT.PAGETEXT</p>\n\n    <ion-list>\n\n      <ion-item>\n\n        <ion-label floating>{{ \'FORGOT.LABEL\' | translate }}</ion-label>\n\n        <ion-input type="text" formControlName="username" placeholder="{{ \'FORGOT.PLACEHOLDER\' | translate }}"></ion-input>\n\n      </ion-item>\n\n      <div class="form-error-message" *ngIf="forgot.controls.username.errors && forgot.controls.username.value">\n\n        Must be between 4 and 30 characters.\n\n      </div>      \n\n    </ion-list>\n\n  </form>\n\n</ion-content>\n\n\n\n<ion-footer no-border>\n\n    <ion-toolbar>\n\n        <button ion-button round block (click)="resetPassword()" [disabled]="!forgot.valid">{{ \'FORGOT.BUTTON\' | translate }}</button>\n\n    </ion-toolbar>\n\n</ion-footer>\n\n'/*ion-inline-end:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/forgot/forgot.component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_6__shared_services_messaging_service__["a" /* MessagingService */], __WEBPACK_IMPORTED_MODULE_4__shared_classes_user_class__["a" /* UserClass */], __WEBPACK_IMPORTED_MODULE_5__shared_services_logging_service__["a" /* LoggingService */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */]])
], ForgotComponent);

//# sourceMappingURL=forgot.component.js.map

/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_classes_user_class__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_logging_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_services_messaging_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_services_list_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__park_park_component__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









let SignUpComponent = class SignUpComponent {
    constructor(navCtrl, formBuilder, messagingService, userClass, loggingService, listService, translateService, renderer) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.messagingService = messagingService;
        this.userClass = userClass;
        this.loggingService = loggingService;
        this.listService = listService;
        this.translateService = translateService;
        this.renderer = renderer;
        this.signup = this.formBuilder.group({
            first_name: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('[a-zA-Z ]*'), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])],
            last_name: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('[a-zA-Z]*'), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])],
            email: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(4), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern("[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*(.[a-zA-Z0-9]{2,3})+"), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])],
            username: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(4), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('[a-zA-Z0-9]*'), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])],
            password: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('[a-zA-Z0-9 ]*'), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])],
            confirm_password: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
        }, { validator: this.confirmPasswordMatch('password', 'confirm_password') });
    }
    setAsTouched() {
        for (var controlName in this.signup.controls) {
            let elem = document.querySelector('[formControlName="' + controlName + '"]');
            if (elem) {
                this.renderer.setElementClass(elem.parentElement.parentElement.parentElement, 'ng-touched', this.signup.controls[controlName].touched);
            }
        }
    }
    confirmPasswordMatch(passwordKey, confirmPasswordKey) {
        return (group) => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];
            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        };
    }
    signUpAccount() {
        if (this.signup.get('password').value !== this.signup.get('confirm_password').value) {
            this.presentAlert(this.translateService.instant('SIGNUP.ALERTS.MESSAGES.PASSWORDMATCH'));
            return;
        }
        return this.userClass.signUp(this.signup)
            .then((resp) => {
            if (resp.success) {
                this.loggingService.info('Successful signup');
                this.messagingService.raiseToast(this.translateService.instant('SIGNUP.ALERTS.MESSAGES.SIGNUPSUCCESS'))
                    .then(() => {
                    this.listService.loadLists();
                    this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__park_park_component__["a" /* ParkComponent */]);
                });
            }
            else {
                this.loggingService.info('Unsuccessful signup');
                this.presentAlert(this.translateService.instant('SIGNUP.ALERTS.MESSAGES.SIGHUPPROBLEM') + resp.msg);
            }
        })
            .catch((resp) => {
            this.presentAlert(this.translateService.instant('SIGNUP.ALERTS.MESSAGES.SIGNUPSERVERPROBLEM') + resp.msg);
        });
    }
    presentAlert(message) {
        this.messagingService.alertConfig.title = this.translateService.instant('ALERTS.TITLES.ERROR');
        this.messagingService.raiseAlert(message);
    }
};
SignUpComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'pbm-sign-up',template:/*ion-inline-start:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/sign-up/sign-up.component.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{ \'SIGNUP.TITLE\' | translate }}</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding class="auth-content">\n  <form class="auth-form" [formGroup]="signup">\n    <ion-list>\n      <ion-item id="ionItem">\n        <ion-label floating>{{ \'SIGNUP.LABELS.FIRSTNAME\' | translate }}</ion-label>\n        <ion-input id="foo" type="text" formControlName="first_name" placeholder="" [(ngModel)]="signup.first_name" (blur)="setAsTouched()"></ion-input>\n      </ion-item>\n      <div class="form-error-message" *ngIf="signup.controls.first_name.errors && signup.controls.first_name.value">\n        Must be between 2 and 30 characters.\n      </div>\n\n      <ion-item>\n        <ion-label floating>{{ \'SIGNUP.LABELS.LASTNAME\' | translate }}</ion-label>\n        <ion-input type="text" formControlName="last_name" placeholder="" [(ngModel)]="signup.last_name" (blur)="setAsTouched()"></ion-input>\n      </ion-item>\n      <div class="form-error-message" *ngIf="signup.controls.last_name.errors && signup.controls.last_name.value">\n        Must be between 2 and 30 characters.\n      </div>\n\n      <ion-item>\n        <ion-label floating>{{ \'SIGNUP.LABELS.EMAIL\' | translate }}</ion-label>\n        <ion-input type="email" formControlName="email" placeholder="" [(ngModel)]="signup.email" (blur)="setAsTouched()"></ion-input>\n      </ion-item>\n      <div class="form-error-message" *ngIf="signup.controls.email.errors && signup.controls.email.value">\n        Not a valid email address.\n      </div>\n\n      <ion-item>\n        <ion-label floating>{{ \'SIGNUP.LABELS.USERNAME\' | translate }}</ion-label>\n        <ion-input type="text" formControlName="username" placeholder="" [(ngModel)]="signup.username" (blur)="setAsTouched()"></ion-input>\n      </ion-item>\n      <div class="form-error-message" *ngIf="signup.controls.username.errors && signup.controls.username.value">\n        Must be between 4 and 30 characters.\n      </div>\n\n      <pbm-show-hide-container>\n        <ion-item>\n          <ion-label floating>{{ \'SIGNUP.LABELS.PASSWORD\' | translate }}</ion-label>\n          <ion-input type="password" formControlName="password" placeholder="" [(ngModel)]="signup.password" pbmShowHideInput (blur)="setAsTouched()"></ion-input>\n        </ion-item>\n      </pbm-show-hide-container>   \n      <div class="form-error-message" *ngIf="signup.controls.password.errors && signup.controls.password.value">\n        Must be between 6 and 30 characters.\n      </div>\n\n      <pbm-show-hide-container>\n        <ion-item>\n          <ion-label floating>{{ \'SIGNUP.LABELS.CONFIRM\' | translate }}</ion-label>\n          <ion-input type="password" formControlName="confirm_password" placeholder="" [(ngModel)]="signup.confirm_password" pbmShowHideInput (blur)="setAsTouched()"></ion-input>\n        </ion-item>\n      </pbm-show-hide-container>   \n      <div class="form-error-message" *ngIf="signup.hasError(\'mismatchedPasswords\') && signup.controls.confirm_password.dirty">\n        Does not match password.\n      </div>\n\n    </ion-list>\n  </form>\n</ion-content>\n\n<ion-footer no-border>\n    <ion-toolbar>\n        <button ion-button round block [disabled]="!signup.valid" (click)="signUpAccount()">{{ \'SIGNUP.BUTTON\' | translate }}</button>\n    </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/sign-up/sign-up.component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_6__shared_services_messaging_service__["a" /* MessagingService */],
        __WEBPACK_IMPORTED_MODULE_4__shared_classes_user_class__["a" /* UserClass */],
        __WEBPACK_IMPORTED_MODULE_5__shared_services_logging_service__["a" /* LoggingService */],
        __WEBPACK_IMPORTED_MODULE_7__shared_services_list_service__["a" /* ListService */],
        __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer */]])
], SignUpComponent);

//# sourceMappingURL=sign-up.component.js.map

/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VehiclesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_messaging_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vehicles_details_vehicles_details_component__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_vehicle_service__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_classes_alertConfig_class__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_classes_user_class__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular_components_list_list__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









let VehiclesComponent = class VehiclesComponent {
    constructor(navCtrl, navParams, messagingService, vehicleService, userClass, translationService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.messagingService = messagingService;
        this.vehicleService = vehicleService;
        this.userClass = userClass;
        this.translationService = translationService;
        this.vehicles = [];
    }
    ionViewWillEnter() {
        this.vehicles = this.userClass.vehicleList;
        //TODO: When ionic fixes the refresh problem that happens after adding an item to a list we should probably remove this.
        //See this issue: https://github.com/ionic-team/ionic/issues/13028
        this.content.resize();
    }
    addNewVehicle() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__vehicles_details_vehicles_details_component__["a" /* VehiclesDetailsComponent */], { 'theVehicle': this.vehicleService.newVehicle() });
    }
    editVehicle(theVehicle) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__vehicles_details_vehicles_details_component__["a" /* VehiclesDetailsComponent */], { 'theVehicle': theVehicle });
    }
    deleteVehicle(theVehicle) {
        let yesButton = new __WEBPACK_IMPORTED_MODULE_6__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        let noButton = new __WEBPACK_IMPORTED_MODULE_6__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        yesButton.text = this.translationService.instant('VEHICLES.BUTTONS.CONFIRMS.DELETEVEHICLECONFIRM.YES');
        noButton.text = this.translationService.instant('VEHICLES.BUTTONS.CONFIRMS.DELETEVEHICLECONFIRM.NO');
        yesButton.handler = () => {
            return this.vehicleService.removeVehicle(theVehicle)
                .then((resp) => {
                if (resp.success) {
                    return this.vehicleService.vehicleList()
                        .then((resp) => {
                        this.vehicles = resp;
                    });
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
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
], VehiclesComponent.prototype, "content", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_8_ionic_angular_components_list_list__["a" /* List */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_8_ionic_angular_components_list_list__["a" /* List */])
], VehiclesComponent.prototype, "list", void 0);
VehiclesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'pbm-vehicles',template:/*ion-inline-start:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/vehicles/vehicles.component.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{ \'VEHICLES.PAGETITLE\' | translate }}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="content">\n  <div class="empty-state-wrapper" *ngIf="vehicles.length == 0">\n    <ion-icon name="car"></ion-icon>\n    <p>{{ \'VEHICLES.NOVEHICLES\' | translate }}</p>\n  </div>\n\n  <ion-list>\n    <ion-item-sliding *ngFor="let vehicle of vehicles">\n      <ion-item no-lines class="item-text-wrap" (click)="editVehicle(vehicle)">\n        <ion-icon name="car" item-start></ion-icon>\n        <h2 class="item-title">{{ vehicle.alias }}</h2>\n        <div class="item-description">\n          <span>{{ vehicle.state_id }}</span>—<span>{{ vehicle.license }}</span>\n        </div>  \n      </ion-item>    \n      \n      <ion-item-options side="right">\n        <button ion-button color="danger" (click)="deleteVehicle(vehicle)">\n          <ion-icon name="trash"></ion-icon>\n          <span>{{ \'VEHICLES.BUTTONS.DELETEVEHICLE\' | translate }}</span>\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>      \n\n</ion-content>\n\n<ion-fab right bottom>\n  <button ion-fab (click)="addNewVehicle()">\n    <ion-icon name="add"></ion-icon>\n  </button>\n</ion-fab>'/*ion-inline-end:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/vehicles/vehicles.component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__shared_services_messaging_service__["a" /* MessagingService */],
        __WEBPACK_IMPORTED_MODULE_5__shared_services_vehicle_service__["a" /* VehicleService */],
        __WEBPACK_IMPORTED_MODULE_7__shared_classes_user_class__["a" /* UserClass */],
        __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */]])
], VehiclesComponent);

//# sourceMappingURL=vehicles.component.js.map

/***/ }),

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AvailablePermitsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_permit_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_messaging_service__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let AvailablePermitsComponent = class AvailablePermitsComponent {
    constructor(navCtrl, navParams, messagingService, permitService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.messagingService = messagingService;
        this.permitService = permitService;
        this.availablePermits = [];
    }
    ionViewWillEnter() {
        this.loadAvailablePermits();
    }
    loadAvailablePermits() {
        this.permitService.availablePermitsList()
            .then((response) => {
            this.availablePermits = response;
        })
            .catch((err) => {
            this.messagingService.alertConfig.title = 'Error';
            this.messagingService.raiseAlert(err.msg);
        });
    }
};
AvailablePermitsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'pbm-available-permits',template:/*ion-inline-start:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/available-permits/available-permits.component.html"*/'<ion-header>\n    <ion-navbar>\n      <ion-title>Available Permits</ion-title>\n    </ion-navbar>\n  </ion-header>\n  \n  <ion-content class="content">\n    <div class="list-wrapper">\n      <ion-list *ngFor="let permit of availablePermits">\n        <button class="list-item item item-block item-md">\n          <ion-row no-padding class="content-row one-line">\n           \n            <ion-col no-padding>\n              <ion-icon name="pricetag"></ion-icon>\n            </ion-col>\n            \n            <ion-col no-padding class="item-content">\n              <h3 class="item-title">{{ permit.name }}</h3>\n              <div class="item-description">\n                <span>{{ permit.description }}</span>\n              </div>\n              <div class="item-description" *ngIf="permit.period_start_date">\n                <span>{{ permit.period_start_date | date: "M/dd/yy" }}</span>—<span>{{ permit.period_end_date | date: "M/dd/yy" }}</span>  \n              </div>  \n            </ion-col>\n          \n          </ion-row>\n        </button>\n      </ion-list>\n    </div>\n  </ion-content>'/*ion-inline-end:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/available-permits/available-permits.component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__shared_services_messaging_service__["a" /* MessagingService */],
        __WEBPACK_IMPORTED_MODULE_2__shared_services_permit_service__["a" /* PermitService */]])
], AvailablePermitsComponent);

//# sourceMappingURL=available-permits.component.js.map

/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreditCardsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_list_list__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__authorizedotnet_add_authorizedotnet_card_add_authorizedotnet_card_component__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__paymentus_add_paymentus_card_add_paymentus_card_component__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__spreedly_add_spreedly_card_add_spreedly_card_component__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__authorizedotnet_edit_authorizedotnet_card_edit_authorizedotnet_card_component__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__paymentus_edit_paymentus_card_edit_paymentus_card_component__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__spreedly_edit_spreedly_card_edit_spreedly_card_component__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_services_messaging_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_services_creditCard_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__shared_classes_alertConfig_class__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













let CreditCardsComponent = class CreditCardsComponent {
    constructor(navCtrl, navParams, messagingService, creditCardService, translationService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.messagingService = messagingService;
        this.creditCardService = creditCardService;
        this.translationService = translationService;
        this.cards = [];
    }
    ionViewWillEnter() {
        return this.creditCardService.cardList()
            .then((resp) => {
            this.cards = resp;
            //TODO: When ionic fixes the refresh problem that happens after adding an item to a list we should probably remove this.
            //See this issue: https://github.com/ionic-team/ionic/issues/13028
            this.content.resize();
        })
            .catch((err) => {
            this.messagingService.alertConfig.title = this.translationService.instant('ALERTS.TITLES.ERROR');
            this.messagingService.raiseAlert(this.translationService.instant('CREDITCARDS.ALERTS.LOADPROBLEM') + err.msg);
        });
    }
    addNewCard() {
        switch (this.creditCardService.merchant().name.toLowerCase()) {
            case 'authorize.net':
                this.navigateTo(__WEBPACK_IMPORTED_MODULE_4__authorizedotnet_add_authorizedotnet_card_add_authorizedotnet_card_component__["a" /* AddAuthorizedotnetCardComponent */]);
                break;
            case 'paymentus':
                this.navigateTo(__WEBPACK_IMPORTED_MODULE_5__paymentus_add_paymentus_card_add_paymentus_card_component__["a" /* AddPaymentusCardComponent */]);
                break;
            default://spreedly
                this.navigateTo(__WEBPACK_IMPORTED_MODULE_6__spreedly_add_spreedly_card_add_spreedly_card_component__["a" /* AddSpreedlyCardComponent */]);
                break;
        }
    }
    editCard(theCard) {
        switch (this.creditCardService.merchant().name.toLowerCase()) {
            case 'authorize.net':
                this.navigateTo(__WEBPACK_IMPORTED_MODULE_7__authorizedotnet_edit_authorizedotnet_card_edit_authorizedotnet_card_component__["a" /* EditAuthorizedotnetCardComponent */], { 'theCard': theCard });
                break;
            case 'paymentus':
                this.navigateTo(__WEBPACK_IMPORTED_MODULE_8__paymentus_edit_paymentus_card_edit_paymentus_card_component__["a" /* EditPaymentusCardComponent */], { 'theCard': theCard });
                break;
            default://spreedly
                this.navigateTo(__WEBPACK_IMPORTED_MODULE_9__spreedly_edit_spreedly_card_edit_spreedly_card_component__["a" /* EditSpreedlyCardComponent */], { 'theCard': theCard });
                break;
        }
    }
    navigateTo(gatewayPage, args) {
        this.navCtrl.push(gatewayPage, args);
    }
    deleteCard(theCard) {
        let yesButton = new __WEBPACK_IMPORTED_MODULE_12__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        let noButton = new __WEBPACK_IMPORTED_MODULE_12__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        yesButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.YES');
        noButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.NO');
        yesButton.handler = () => {
            return this.creditCardService.removeCard(theCard)
                .then((resp) => {
                if (resp.success) {
                    return this.creditCardService.cardList()
                        .then((resp) => {
                        this.cards = resp;
                        this.content.resize();
                    });
                }
            })
                .catch((err) => {
                let okButton = new __WEBPACK_IMPORTED_MODULE_12__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
                okButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.OK');
                return this.messagingService.raiseConfirm(this.translationService.instant('CREDITCARDS.ALERTS.DELETEPROBLEM'), [okButton]);
            });
        };
        return this.messagingService.raiseConfirm(this.translationService.instant('CREDITCARDS.ALERTS.DELETEPROMPT') + theCard.alias + '?', [yesButton, noButton])
            .then((resp) => {
            this.list.closeSlidingItems();
        });
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
], CreditCardsComponent.prototype, "content", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_list_list__["a" /* List */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_list_list__["a" /* List */])
], CreditCardsComponent.prototype, "list", void 0);
CreditCardsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'pbm-credit-cards',template:/*ion-inline-start:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/credit-cards/credit-cards.component.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{ \'CREDITCARDS.PAGETITLES.MAINTITLE\' | translate }}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="content">\n	<div class="empty-state-wrapper" *ngIf="cards.length == 0">\n		<ion-icon name="car"></ion-icon>\n		<p>{{ \'CREDITCARDS.NOCARDS\' | translate }}</p>\n	</div>	\n  <ion-list>\n		<ion-item-sliding *ngFor="let card of cards">\n			<ion-item no-lines class="item-text-wrap" (click)="editCard(card)">\n				<ion-icon [name]="\'custom-icon-\'+card.cc_type.image_name" item-start></ion-icon>\n				<h2 class="item-title">{{ card.alias }}</h2>\n				<div class="item-description">\n					<span>{{ card.cc_number }}</span>\n				</div>  \n			</ion-item>    \n			\n			<ion-item-options side="right">\n				<button ion-button color="danger" (click)="deleteCard(card)">\n					<ion-icon name="trash"></ion-icon>\n					<span>{{ \'CREDITCARDS.BUTTONS.DELETEBUTTON\' | translate }}</span>\n				</button>\n			</ion-item-options>\n		</ion-item-sliding>\n	</ion-list> \n</ion-content>\n\n<ion-fab right bottom>\n	<button ion-fab (click)="addNewCard()">\n		<ion-icon name="add"></ion-icon>\n	</button>\n</ion-fab>\n'/*ion-inline-end:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/credit-cards/credit-cards.component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_10__shared_services_messaging_service__["a" /* MessagingService */], __WEBPACK_IMPORTED_MODULE_11__shared_services_creditCard_service__["a" /* CreditCardService */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */]])
], CreditCardsComponent);

//# sourceMappingURL=credit-cards.component.js.map

/***/ }),

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let HistoryComponent = class HistoryComponent {
    constructor(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad HistoryComponent');
    }
};
HistoryComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'pbm-history',template:/*ion-inline-start:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/history/history.component.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Purchase History</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="content">\n  <div class="empty-state-wrapper">\n    <ion-icon name="paper"></ion-icon>\n    <p>You have no purchase history yet.</p>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/history/history.component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
], HistoryComponent);

//# sourceMappingURL=history.component.js.map

/***/ }),

/***/ 129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_classes_user_class__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_logging_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_services_messaging_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_services_list_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_services_creditCard_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__forgot_forgot_component__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__sign_up_sign_up_component__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__park_park_component__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












let LoginComponent = class LoginComponent {
    constructor(navCtrl, formBuilder, userClass, loggingService, messagingService, listService, creditCardService, translateService, events) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.userClass = userClass;
        this.loggingService = loggingService;
        this.messagingService = messagingService;
        this.listService = listService;
        this.creditCardService = creditCardService;
        this.translateService = translateService;
        this.events = events;
        this.login = this.formBuilder.group({
            j_username: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(4), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('[a-zA-Z0-9]*'), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])],
            j_password: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(4), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('[a-zA-Z0-9!@#$%^&*() ]*'), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])]
        });
    }
    attemptLogin() {
        return this.userClass.login(this.login)
            .then((resp) => {
            if (resp.success) {
                this.loggingService.info('Login successful');
                this.events.publish('user:login', resp.owner);
                this.listService.loadLists();
                this.creditCardService.loadMerchantInfo()
                    .catch((err) => {
                    this.messagingService.alertConfig.title = this.translateService.instant('LOGIN.MERCHANTERROR');
                    this.messagingService.raiseAlert(err);
                });
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_11__park_park_component__["a" /* ParkComponent */]);
            }
            else {
                this.loggingService.info('Login failed: ' + this.userClass.message);
                this.messagingService.alertConfig.title = this.translateService.instant('ALERTS.TITLES.ERROR');
                this.messagingService.raiseAlert(this.userClass.message);
            }
        })
            .catch(() => {
            this.loggingService.info('Login failed: ' + this.userClass.message);
            this.messagingService.alertConfig.title = this.translateService.instant('ALERTS.TITLES.ERROR');
            this.messagingService.raiseAlert(this.userClass.message);
        });
    }
    forgotPassword() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__forgot_forgot_component__["a" /* ForgotComponent */]);
    }
    signUpAccount() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__sign_up_sign_up_component__["a" /* SignUpComponent */]);
    }
};
LoginComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'pbm-login',template:/*ion-inline-start:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/login/login.component.html"*/'<ion-content class="login-content auth-content">\n\n  <form class="login-form auth-form" [formGroup]="login">\n\n    <ion-item>\n\n        <ion-label floating>{{ \'LOGIN.PLACEHOLDERS.USERNAME\' | translate }}</ion-label>\n\n        <ion-input type="url" formControlName="j_username"></ion-input>\n\n    </ion-item>\n\n    <pbm-show-hide-container>\n\n      <ion-item>\n\n        <ion-label floating>{{ \'LOGIN.PLACEHOLDERS.PASSWORD\' | translate }}</ion-label>\n\n        <ion-input type="password" formControlName="j_password" pbmShowHideInput></ion-input>\n\n      </ion-item>\n\n    </pbm-show-hide-container>\n\n    <button ion-button block class="auth-action-button login-button" type="submit" (click)="attemptLogin()">{{ \'LOGIN.LOGINLINK\' | translate }}</button>\n\n  </form>\n\n  <ion-row class="alt-options">\n\n    <ion-col no-padding width-50>\n\n      <button ion-button block clear class="forgot-button" (click)="forgotPassword()">{{ \'LOGIN.FORGOTLINK\' | translate }}</button>\n\n    </ion-col>\n\n    <ion-col no-padding widith-50>\n\n      <button ion-button block clear class="signup-button" (click)="signUpAccount()">{{ \'LOGIN.SIGNUPLINK\' | translate }}</button>\n\n    </ion-col>\n\n  </ion-row>            \n\n</ion-content>\n\n'/*ion-inline-end:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/login/login.component.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_4__shared_classes_user_class__["a" /* UserClass */],
        __WEBPACK_IMPORTED_MODULE_5__shared_services_logging_service__["a" /* LoggingService */],
        __WEBPACK_IMPORTED_MODULE_6__shared_services_messaging_service__["a" /* MessagingService */],
        __WEBPACK_IMPORTED_MODULE_7__shared_services_list_service__["a" /* ListService */],
        __WEBPACK_IMPORTED_MODULE_8__shared_services_creditCard_service__["a" /* CreditCardService */],
        __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* Events */]])
], LoginComponent);

//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParkPurchaseComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_classes_alertConfig_class__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_vehicle_service__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__vehicles_details_vehicles_details_component__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_services_messaging_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_services_permit_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_classes_user_class__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_services_creditCard_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__credit_cards_paymentus_add_paymentus_card_add_paymentus_card_component__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__credit_cards_authorizedotnet_add_authorizedotnet_card_add_authorizedotnet_card_component__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__credit_cards_spreedly_add_spreedly_card_add_spreedly_card_component__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













let ParkPurchaseComponent = class ParkPurchaseComponent {
    constructor(navCtrl, navParams, formBuilder, messagingService, permitService, userClass, vehicleService, creditCardService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.messagingService = messagingService;
        this.permitService = permitService;
        this.userClass = userClass;
        this.vehicleService = vehicleService;
        this.creditCardService = creditCardService;
        this.permit = this.navParams.get('thePermit');
        this.parkingDetails = this.formBuilder.group({
            vehicle: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            card: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            time: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required]
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
            if (this.vehicles.length > 0) {
                this.parkingDetails.controls['vehicle'].setValue(this.vehicles[0]);
            }
        })
            .catch((err) => {
            this.messagingService.alertConfig.title = 'Error';
            this.messagingService.raiseAlert('There was a problem loading the vehicles list: ' + err.msg);
        });
    }
    addVehicle() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__vehicles_details_vehicles_details_component__["a" /* VehiclesDetailsComponent */], { 'theVehicle': this.vehicleService.newVehicle() });
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
    addCreditCard() {
        switch (this.creditCardService.merchant().name.toLowerCase()) {
            case 'authorize.net':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__credit_cards_authorizedotnet_add_authorizedotnet_card_add_authorizedotnet_card_component__["a" /* AddAuthorizedotnetCardComponent */]);
                break;
            case 'paymentus':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__credit_cards_paymentus_add_paymentus_card_add_paymentus_card_component__["a" /* AddPaymentusCardComponent */]);
                break;
            default://spreedly
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_12__credit_cards_spreedly_add_spreedly_card_add_spreedly_card_component__["a" /* AddSpreedlyCardComponent */]);
                break;
        }
    }
    purchase() {
        let okButton = new __WEBPACK_IMPORTED_MODULE_0__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        okButton.text = 'OK';
        okButton.handler = () => {
            this.navCtrl.pop();
        };
        return this.messagingService.raiseConfirm('Parking purchased successfully.', [okButton]);
    }
    selectChange(e) {
        if (e == "Add a credit card") {
            this.addCreditCard();
        }
        else if (e == "Add a vehicle") {
            this.addVehicle();
        }
    }
};
ParkPurchaseComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'pbm-park-purchase',template:/*ion-inline-start:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/park-purchase/park-purchase.component.html"*/'<ion-header>\n    <ion-navbar>\n      <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      <ion-title>Purchase Parking Time</ion-title>\n    </ion-navbar>\n  </ion-header>\n  \n  <ion-content padding>\n    <div class="title-wrapper">\n        <div class="permit-title">{{ permit.name }}</div>\n        <span class="permit-type">{{ permit.description }}</span>        \n    </div>  \n  \n    <form [formGroup]="parkingDetails">\n  \n      <!--Vehicle-->\n      <ion-item>\n        <ion-label floating>Vehicle</ion-label>\n        <ion-select \n          formControlName=\'vehicle\' \n          (ionChange)="selectChange($event)" \n          interface="popover">\n          \n          <ion-option *ngFor="let v of vehicles" [value]="v">{{ v.alias }}</ion-option>\n          <ion-option>Add a vehicle</ion-option>\n        </ion-select>\n      </ion-item>  \n  \n      <ion-row *ngIf="permit.mpermit_id != 0">\n        <ion-col col-7 no-padding>\n            <ion-item>\n                <ion-label floating>Time</ion-label>\n                <ion-select \n                  formControlName=\'time\'\n                  [(ngModel)]=\'selectedTime\'\n                  interface="popover"\n                  (ionChange)="timeChange()">\n                  \n                  <ion-option *ngFor="let t of times" [value]="t">{{ t.name }}</ion-option>\n                </ion-select>\n            </ion-item>\n        </ion-col>\n        <ion-col col-5 no-padding>\n            <ion-item class="cost">\n                <ion-label floating>Cost</ion-label>\n                <ion-input [readonly]="true" [value]="\'$ \'+price"></ion-input>\n            </ion-item>\n        </ion-col>\n      </ion-row>\n          \n      <!--Payment-->\n      <ion-item *ngIf="permit.mpermit_id != 0">\n        <ion-label floating>Credit Card</ion-label>\n        <ion-select \n          formControlName=\'card\' \n          (ionChange)="selectChange($event)" \n          interface="popover">\n  \n          <ion-option *ngFor="let c of cards" [value]="c">{{ c.alias }}</ion-option>\n          <ion-option>Add a credit card</ion-option>\n        </ion-select>\n      </ion-item> \n    </form>\n  </ion-content>\n  \n  <ion-footer no-border>\n      <ion-toolbar>\n          <button ion-button round block [disabled]="!parkingDetails.valid" (click)="purchase()">Purchase Parking</button>\n        </ion-toolbar>\n  </ion-footer>'/*ion-inline-end:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/park-purchase/park-purchase.component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_6__shared_services_messaging_service__["a" /* MessagingService */],
        __WEBPACK_IMPORTED_MODULE_7__shared_services_permit_service__["a" /* PermitService */],
        __WEBPACK_IMPORTED_MODULE_8__shared_classes_user_class__["a" /* UserClass */],
        __WEBPACK_IMPORTED_MODULE_4__shared_services_vehicle_service__["a" /* VehicleService */],
        __WEBPACK_IMPORTED_MODULE_9__shared_services_creditCard_service__["a" /* CreditCardService */]])
], ParkPurchaseComponent);

//# sourceMappingURL=park-purchase.component.js.map

/***/ }),

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PermitDetailsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_messaging_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_permit_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_classes_user_class__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let PermitDetailsComponent = class PermitDetailsComponent {
    constructor(navCtrl, messagingService, navParams, permitService, userClass) {
        this.navCtrl = navCtrl;
        this.messagingService = messagingService;
        this.navParams = navParams;
        this.permitService = permitService;
        this.userClass = userClass;
        this.permit = this.navParams.get('thePermit');
    }
    ionViewWillEnter() {
        this.loadVehicles();
    }
    loadVehicles() {
        this.userClass.reload()
            .then(() => {
            this.userVehicles = this.userClass.vehicleList;
            let currentPermitVehicles = this.permit.vehicles;
            this.permitVehicles = this.userVehicles.map(function (vechicle) {
                let isPermitVehicle = currentPermitVehicles.some(obj => { return obj.vehicle_id === vechicle.vehicle_id; });
                return { 'vehicle_id': vechicle.vehicle_id, 'alias': vechicle.alias, 'checked': isPermitVehicle };
            });
            this.maxVehiclesSelected = this.getMaxVehiclesSelected();
        });
    }
    checkboxClicked() {
        this.maxVehiclesSelected = this.getMaxVehiclesSelected();
    }
    getMaxVehiclesSelected() {
        let maxVehicles = this.permit.type.max_vehicles, totalSelected = this.permitVehicles.filter(obj => obj.checked).length;
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
};
PermitDetailsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'pbm-permit-details',template:/*ion-inline-start:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/permit-details/permit-details.component.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Permit Details</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <div class="wrapper">\n        <span class="cost">\n            ${{ permit.type.cost }}.00\n        </span>\n        <div class="title">\n            {{ permit.type.name }}\n        </div>\n        <div class="dates">\n            {{ permit.create_date | date: "M/dd/yy" }}—{{ permit.valid_end_date | date: "M/dd/yy" }}\n        </div>\n        <ion-badge>{{ permit.type.max_vehicles }}</ion-badge> vehicle(s) allowed\n    </div>  \n\n    <h2>Vehicles</h2>\n\n    <ion-list>\n        <ion-item no-lines *ngFor="let vehicle of permitVehicles">\n            <ion-label>{{ vehicle.alias }}</ion-label>\n            <ion-checkbox \n                [disabled]="(maxVehiclesSelected && !vehicle.checked)"\n                (click)="checkboxClicked()"\n                [(ngModel)]="vehicle.checked"\n                value="vehicle.checked">\n            </ion-checkbox>\n        </ion-item>\n    </ion-list>\n</ion-content>\n\n<ion-footer no-border>\n    <ion-toolbar>\n        <button ion-button round color="danger" (click)="cancel()">Cancel</button>\n        <button ion-button round (click)="saveEdits()">Save Edits</button>\n    </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/permit-details/permit-details.component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__shared_services_messaging_service__["a" /* MessagingService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__shared_services_permit_service__["a" /* PermitService */],
        __WEBPACK_IMPORTED_MODULE_4__shared_classes_user_class__["a" /* UserClass */]])
], PermitDetailsComponent);

//# sourceMappingURL=permit-details.component.js.map

/***/ }),

/***/ 143:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 143;

/***/ }),

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AlertConfigClass {
    constructor() {
        this.inputs = [];
        this.buttons = [];
        this.enableBackdropDismiss = true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = AlertConfigClass;

class AlertInputConfigClass {
    constructor() {
        this.checked = false;
    }
}
/* unused harmony export AlertInputConfigClass */

class AlertButtonConfigClass {
    constructor() {
        this.role = 'null';
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AlertButtonConfigClass;

//# sourceMappingURL=alertConfig.class.js.map

/***/ }),

/***/ 185:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"available-permits/available-permits.component.module": [
		334,
		11
	],
	"credit-cards/credit-cards.component.module": [
		335,
		10
	],
	"forgot/forgot.component.module": [
		336,
		9
	],
	"history/history.component.module": [
		337,
		8
	],
	"login/login.component.module": [
		338,
		7
	],
	"park-purchase/park-purchase.component.module": [
		339,
		6
	],
	"park/park.component.module": [
		340,
		5
	],
	"permit-details/permit-details.component.module": [
		341,
		4
	],
	"permits/permits.component.module": [
		342,
		3
	],
	"sign-up/sign-up.component.module": [
		343,
		2
	],
	"vehicles-details/vehicles-details.component.module": [
		344,
		1
	],
	"vehicles/vehicles.component.module": [
		345,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 185;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 191:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalStorageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(192);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let LocalStorageService = class LocalStorageService {
    constructor(storage) {
        this.storage = storage;
    }
    setValue(key, value) {
        return this.storage.ready()
            .then(() => {
            return this.storage.set(key, value)
                .then(() => {
                return true;
            })
                .catch(() => {
                return false;
            });
        })
            .catch(() => {
            return false;
        });
    }
    getValue(key) {
        return this.storage.ready()
            .then(() => {
            return this.storage.get(key)
                .catch(() => {
                return false;
            });
        })
            .catch(() => {
            return false;
        });
    }
};
LocalStorageService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
], LocalStorageService);

//# sourceMappingURL=localStorage.service.js.map

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditAuthorizedotnetCardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_creditCard_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_messaging_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_constants__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_classes_alertConfig_class__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








let EditAuthorizedotnetCardComponent = class EditAuthorizedotnetCardComponent {
    constructor(navCtrl, navParams, formBuilder, creditCardService, messagingService, translationService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.creditCardService = creditCardService;
        this.messagingService = messagingService;
        this.translationService = translationService;
        this.cardTypes = __WEBPACK_IMPORTED_MODULE_6__assets_constants__["a" /* CreditCardTypes */];
        this.ccExpirationDate = { 'month': 0, 'year': 0 };
        this.creditCard = this.navParams.get('theCard');
        this.creditCardForm = this.formBuilder.group({
            'alias': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(50), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z ]*')])],
            'billing_first_name': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(50), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z]*')])],
            'billing_last_name': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(50), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z ]*')])],
            'billing_zip': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(5), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(5), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9]*')])],
            'cc_exp_date': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])],
            'cvv': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(3), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(4), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[0-9]*')])]
        });
    }
    showCVVInfo() {
        let toastConfig = {
            message: this.cardTypes[this.creditCard.cc_type_id - 1].cvvMessage,
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: this.translationService.instant('CREDITCARDS.BUTTONS.OK'),
            dismissOnPageChange: true
        };
        return this.messagingService.raiseToast(toastConfig);
    }
    setExpirationDate(e) {
        this.ccExpirationDate = e;
    }
    save() {
        if (this.creditCardForm.pristine) {
            return this.navCtrl.pop();
        }
        else if (this.creditCardForm.valid) {
            this.creditCard.alias = this.creditCardForm.get('alias').value;
            this.creditCard.billing_zip = this.creditCardForm.get('billing_zip').value;
            this.creditCard.cc_type_id = this.creditCardForm.get('cc_type').value;
            this.creditCard.card_mask = this.creditCardForm.get('cc_mask').value;
            this.creditCard.cc_exp_month = this.ccExpirationDate.month;
            this.creditCard.cc_exp_year = this.ccExpirationDate.year;
            this.creditCard.billing_first_name = this.creditCardForm.get('billing_first_name').value;
            this.creditCard.billing_last_name = this.creditCardForm.get('billing_last_name').value;
            this.creditCardService.saveCard(this.creditCard)
                .then((resp) => {
                if (resp.success) {
                    return this.navCtrl.pop();
                }
                else {
                    this.messagingService.alertConfig.title = this.translationService.instant('ALERTS.TITLES.ERROR');
                    return this.messagingService.raiseAlert(resp.msg);
                }
            })
                .catch((err) => {
                this.messagingService.alertConfig.title = this.translationService.instant('ALERTS.TITLES.ERROR');
                return this.messagingService.raiseAlert(err);
            });
        }
    }
    deleteCard() {
        let yesButton = new __WEBPACK_IMPORTED_MODULE_7__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        let noButton = new __WEBPACK_IMPORTED_MODULE_7__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        yesButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.YES');
        yesButton.handler = () => {
            return this.creditCardService.removeCard(this.creditCard)
                .then((resp) => {
                if (resp.success) {
                    return this.creditCardService.cardList();
                }
            })
                .then(() => {
                return this.navCtrl.pop();
            })
                .catch((err) => {
                this.messagingService.alertConfig.title = this.translationService.instant('ALERTS.TITLES.ERROR');
                return this.messagingService.raiseAlert(err.msg);
            });
        };
        noButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.NO');
        return this.messagingService.raiseConfirm(this.translationService.instant('CREDITCARDS.ALERTS.DELETEPROMPT'), [yesButton, noButton]);
    }
    cancel() {
        let yesButton = new __WEBPACK_IMPORTED_MODULE_7__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        let noButton = new __WEBPACK_IMPORTED_MODULE_7__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        yesButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.YES');
        yesButton.handler = () => {
            return this.navCtrl.pop();
        };
        noButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.NO');
        if (this.creditCardForm.dirty) {
            this.messagingService.alertConfig.title = this.translationService.instant('CREDITCARDS.ALERTS.DISCARD');
            return this.messagingService.raiseConfirm(this.translationService.instant('CREDITCARDS.PROMPTS.DISCARD'), [yesButton, noButton]);
        }
        else {
            return this.navCtrl.pop();
        }
    }
};
EditAuthorizedotnetCardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'pbm-edit-authorizedotnet-card',template:/*ion-inline-start:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/credit-cards/authorizedotnet/edit-authorizedotnet-card/edit-authorizedotnet-card.component.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{ \'CREDITCARDS.PAGETITLES.EDITCARD\' | translate }}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <form [formGroup]="creditCardForm">\n    <!-- Authorize.net -->\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.ALIAS\' | translate }}</ion-label>\n      <ion-input type="text" formControlName="alias" [(ngModel)]="creditCard.alias"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.FIRSTNAME\' | translate }}</ion-label>\n      <ion-input type="text" formControlName="billing_first_name" [(ngModel)]="creditCard.billing_first_name" placeholder=""></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.LASTNAME\' | translate }}</ion-label>\n      <ion-input type="text" formControlName="billing_last_name" [(ngModel)]="creditCard.billing_last_name" placeholder=""></ion-input>\n    </ion-item>\n   \n    <!-- credit card number -->\n    <div class="wrapper">\n      <ion-item>\n        <ion-label floating>{{ \'CREDITCARDS.LABELS.CARDNUMBER\' | translate }}</ion-label>\n        <ion-input type="text" formControlName="cc_number" [(ngModel)]="creditCard.cc_mask" [readonly]="true"></ion-input>\n      </ion-item>\n    </div>\n\n    <!-- expiration date -->\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.EXPIRATIONDATE\' | translate }}</ion-label>\n      <ion-datetime \n        displayFormat="MM/YY"\n        pickerFormat="MM/YYYY"\n        min="2017"\n        max="2031" \n        formControlName="cc_exp_date"\n        (ionChange)="setExpirationDate($event)">\n      </ion-datetime>\n    </ion-item>\n        \n    <!-- cvv -->\n    <div class="wrapper">\n      <ion-item>\n        <ion-label floating>{{ \'CREDITCARDS.LABELS.SECURITYCODE\' | translate }}</ion-label>\n        <ion-input type="password" formControlName="cvv" [(ngModel)]="creditCard.cvv"></ion-input>\n	    <ion-label>\n		    <div id="spreedlyCvv"></div>\n	    </ion-label>\n      </ion-item>\n      <a class="icon-button" (click)="showCVVInfo()">\n        <ion-icon name="help-circle"></ion-icon>\n      </a>\n    </div>\n\n    <!-- zip code -->\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.ZIPCODE\' | translate }}</ion-label>\n      <ion-input type="text" formControlName="billing_zip" [(ngModel)]="creditCard.billing_zip"></ion-input>\n    </ion-item>\n  </form>\n</ion-content>\n\n<ion-footer no-border>\n  <ion-toolbar>\n    <button ion-button round (click)="deleteCard()" color="danger">{{ \'CREDITCARDS.BUTTONS.DELETEBUTTON\' | translate }}</button>\n    <button ion-button round (click)="cancel()" color="danger">{{ \'CREDITCARDS.BUTTONS.CANCEL\' | translate }}</button>\n    <button ion-button round (click)="save()">{{ \'CREDITCARDS.BUTTONS.SAVE\' | translate }}</button>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/credit-cards/authorizedotnet/edit-authorizedotnet-card/edit-authorizedotnet-card.component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_4__shared_services_creditCard_service__["a" /* CreditCardService */],
        __WEBPACK_IMPORTED_MODULE_5__shared_services_messaging_service__["a" /* MessagingService */],
        __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */]])
], EditAuthorizedotnetCardComponent);

//# sourceMappingURL=edit-authorizedotnet-card.component.js.map

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditPaymentusCardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_creditCard_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_messaging_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_constants__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_classes_alertConfig_class__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








let EditPaymentusCardComponent = class EditPaymentusCardComponent {
    constructor(navCtrl, navParams, formBuilder, creditCardService, messagingService, translationService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.creditCardService = creditCardService;
        this.messagingService = messagingService;
        this.translationService = translationService;
        this.cardTypes = __WEBPACK_IMPORTED_MODULE_6__assets_constants__["a" /* CreditCardTypes */];
        this.ccExpirationDate = { 'month': 0, 'year': 0 };
        this.creditCard = this.navParams.get('theCard');
        this.creditCardForm = this.formBuilder.group({
            'alias': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(50), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z ]*')])],
            'billing_first_name': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(50), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z]*')])],
            'billing_last_name': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(50), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z ]*')])],
            'billing_zip': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(5), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(5), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9]*')])],
            'cc_exp_date': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])],
            'cvv': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(3), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(4), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[0-9]*')])]
        });
    }
    showCVVInfo() {
        let toastConfig = {
            message: this.cardTypes[this.creditCard.cc_type_id - 1].cvvMessage,
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: this.translationService.instant('CREDITCARDS.BUTTONS.OK'),
            dismissOnPageChange: true
        };
        return this.messagingService.raiseToast(toastConfig);
    }
    setExpirationDate(e) {
        this.ccExpirationDate = e;
    }
    save() {
        if (this.creditCardForm.pristine) {
            return this.navCtrl.pop();
        }
        else if (this.creditCardForm.valid) {
            this.creditCard.alias = this.creditCardForm.get('alias').value;
            this.creditCard.billing_zip = this.creditCardForm.get('billing_zip').value;
            this.creditCard.cc_type_id = this.creditCardForm.get('cc_type').value;
            this.creditCard.card_mask = this.creditCardForm.get('cc_mask').value;
            this.creditCard.cc_exp_month = this.ccExpirationDate.month;
            this.creditCard.cc_exp_year = this.ccExpirationDate.year;
            this.creditCard.billing_first_name = this.creditCardForm.get('billing_first_name').value;
            this.creditCard.billing_last_name = this.creditCardForm.get('billing_last_name').value;
            this.creditCardService.saveCard(this.creditCard)
                .then((resp) => {
                if (resp.success) {
                    return this.navCtrl.pop();
                }
                else {
                    this.messagingService.alertConfig.title = this.translationService.instant('ALERTS.TITLES.ERROR');
                    return this.messagingService.raiseAlert(resp.msg);
                }
            })
                .catch((err) => {
                this.messagingService.alertConfig.title = this.translationService.instant('ALERTS.TITLES.ERROR');
                return this.messagingService.raiseAlert(err);
            });
        }
    }
    deleteCard() {
        let yesButton = new __WEBPACK_IMPORTED_MODULE_7__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        let noButton = new __WEBPACK_IMPORTED_MODULE_7__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        yesButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.YES');
        yesButton.handler = () => {
            return this.creditCardService.removeCard(this.creditCard)
                .then((resp) => {
                if (resp.success) {
                    return this.creditCardService.cardList();
                }
            })
                .then(() => {
                return this.navCtrl.pop();
            })
                .catch((err) => {
                this.messagingService.alertConfig.title = this.translationService.instant('ALERTS.TITLES.ERROR');
                return this.messagingService.raiseAlert(err.msg);
            });
        };
        noButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.NO');
        return this.messagingService.raiseConfirm(this.translationService.instant('CREDITCARDS.ALERTS.DELETEPROMPT'), [yesButton, noButton]);
    }
    cancel() {
        let yesButton = new __WEBPACK_IMPORTED_MODULE_7__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        let noButton = new __WEBPACK_IMPORTED_MODULE_7__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        yesButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.YES');
        yesButton.handler = () => {
            return this.navCtrl.pop();
        };
        noButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.NO');
        if (this.creditCardForm.dirty) {
            this.messagingService.alertConfig.title = this.translationService.instant('CREDITCARDS.ALERTS.DISCARD');
            return this.messagingService.raiseConfirm(this.translationService.instant('CREDITCARDS.PROMPTS.DISCARD'), [yesButton, noButton]);
        }
        else {
            return this.navCtrl.pop();
        }
    }
};
EditPaymentusCardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'pbm-edit-paymentus-card',template:/*ion-inline-start:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/credit-cards/paymentus/edit-paymentus-card/edit-paymentus-card.component.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{ \'CREDITCARDS.PAGETITLES.EDITCARD\' | translate }}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <form [formGroup]="creditCardForm">\n    <!-- Paymentus -->\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.ALIAS\' | translate }}</ion-label>\n      <ion-input type="text" formControlName="alias" [(ngModel)]="creditCard.alias"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.FIRSTNAME\' | translate }}</ion-label>\n      <ion-input type="text" formControlName="billing_first_name" [(ngModel)]="creditCard.billing_first_name" placeholder=""></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.LASTNAME\' | translate }}</ion-label>\n      <ion-input type="text" formControlName="billing_last_name" [(ngModel)]="creditCard.billing_last_name" placeholder=""></ion-input>\n    </ion-item>\n   \n    <!-- credit card number -->\n    <div class="wrapper">\n      <ion-item>\n        <ion-label floating>{{ \'CREDITCARDS.LABELS.CARDNUMBER\' | translate }}</ion-label>\n        <ion-input type="text" formControlName="cc_number" [(ngModel)]="creditCard.cc_mask" [readonly]="true"></ion-input>\n      </ion-item>\n    </div>\n\n    <!-- expiration date -->\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.EXPIRATIONDATE\' | translate }}</ion-label>\n      <ion-datetime \n        displayFormat="MM/YY"\n        pickerFormat="MM/YYYY"\n        min="2017"\n        max="2031" \n        formControlName="cc_exp_date"\n        (ionChange)="setExpirationDate($event)">\n      </ion-datetime>\n    </ion-item>\n        \n    <!-- cvv -->\n    <div class="wrapper">\n      <ion-item>\n        <ion-label floating>{{ \'CREDITCARDS.LABELS.SECURITYCODE\' | translate }}</ion-label>\n        <ion-input type="password" formControlName="cvv" [(ngModel)]="creditCard.cvv"></ion-input>\n	    <ion-label>\n		    <div id="spreedlyCvv"></div>\n	    </ion-label>\n      </ion-item>\n      <a class="icon-button" (click)="showCVVInfo()">\n        <ion-icon name="help-circle"></ion-icon>\n      </a>\n    </div>\n\n    <!-- zip code -->\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.ZIPCODE\' | translate }}</ion-label>\n      <ion-input type="text" formControlName="billing_zip" [(ngModel)]="creditCard.billing_zip"></ion-input>\n    </ion-item>\n  </form>\n</ion-content>\n\n<ion-footer no-border>\n  <ion-toolbar>\n    <button ion-button round (click)="deleteCard()" color="danger">{{ \'CREDITCARDS.BUTTONS.DELETEBUTTON\' | translate }}</button>\n    <button ion-button round (click)="cancel()" color="danger">{{ \'CREDITCARDS.BUTTONS.CANCEL\' | translate }}</button>\n    <button ion-button round (click)="save()">{{ \'CREDITCARDS.BUTTONS.SAVE\' | translate }}</button>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/credit-cards/paymentus/edit-paymentus-card/edit-paymentus-card.component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_4__shared_services_creditCard_service__["a" /* CreditCardService */],
        __WEBPACK_IMPORTED_MODULE_5__shared_services_messaging_service__["a" /* MessagingService */],
        __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */]])
], EditPaymentusCardComponent);

//# sourceMappingURL=edit-paymentus-card.component.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditSpreedlyCardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_creditCard_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_messaging_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_constants__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_classes_alertConfig_class__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








let EditSpreedlyCardComponent = class EditSpreedlyCardComponent {
    constructor(navCtrl, navParams, formBuilder, creditCardService, messagingService, translationService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.creditCardService = creditCardService;
        this.messagingService = messagingService;
        this.translationService = translationService;
        this.cardTypes = __WEBPACK_IMPORTED_MODULE_6__assets_constants__["a" /* CreditCardTypes */];
        this.ccExpirationDate = '';
        console.debug('edit spreedly card component constructor');
        this.creditCard = this.navParams.get('theCard');
        console.debug('card assignment complete');
        this.creditCardForm = this.formBuilder.group({
            'alias': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(50), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z ]*')])]
        });
        console.debug('card form assignment complete');
        this.ccExpirationDate = this.creditCard.cc_exp_month + '/' + this.creditCard.cc_exp_year;
    }
    save() {
        if (this.creditCardForm.pristine) {
            return this.navCtrl.pop();
        }
        else if (this.creditCardForm.valid) {
            this.creditCard.alias = this.creditCardForm.get('alias').value;
            this.creditCardService.saveCard(this.creditCard)
                .then((resp) => {
                if (resp.success) {
                    return this.navCtrl.pop();
                }
                else {
                    this.messagingService.alertConfig.title = this.translationService.instant('ALERTS.TITLES.ERROR');
                    return this.messagingService.raiseAlert(resp.msg);
                }
            })
                .catch((err) => {
                this.messagingService.alertConfig.title = this.translationService.instant('ALERTS.TITLES.ERROR');
                return this.messagingService.raiseAlert(err);
            });
        }
    }
    deleteCard() {
        let yesButton = new __WEBPACK_IMPORTED_MODULE_7__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        let noButton = new __WEBPACK_IMPORTED_MODULE_7__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        yesButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.YES');
        yesButton.handler = () => {
            return this.creditCardService.removeCard(this.creditCard)
                .then((resp) => {
                if (resp.success) {
                    return this.creditCardService.cardList();
                }
            })
                .then(() => {
                return this.navCtrl.pop();
            })
                .catch((err) => {
                this.messagingService.alertConfig.title = this.translationService.instant('ALERTS.TITLES.ERROR');
                return this.messagingService.raiseAlert(err.msg);
            });
        };
        noButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.NO');
        return this.messagingService.raiseConfirm(this.translationService.instant('CREDITCARDS.ALERTS.DELETEPROMPT') + this.creditCard.alias + "?", [yesButton, noButton]);
    }
    cancel() {
        let yesButton = new __WEBPACK_IMPORTED_MODULE_7__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        let noButton = new __WEBPACK_IMPORTED_MODULE_7__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        yesButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.YES');
        yesButton.handler = () => {
            return this.navCtrl.pop();
        };
        noButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.NO');
        if (this.creditCardForm.dirty) {
            this.messagingService.alertConfig.title = this.translationService.instant('CREDITCARDS.ALERTS.DISCARD');
            return this.messagingService.raiseConfirm(this.translationService.instant('CREDITCARDS.PROMPTS.DISCARD'), [yesButton, noButton]);
        }
        else {
            return this.navCtrl.pop();
        }
    }
};
EditSpreedlyCardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'pbm-edit-spreedly-card',template:/*ion-inline-start:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/credit-cards/spreedly/edit-spreedly-card/edit-spreedly-card.component.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{ \'CREDITCARDS.PAGETITLES.EDITCARD\' | translate }}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <form [formGroup]="creditCardForm">\n    <!-- Spreedly -->\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.ALIAS\' | translate }}</ion-label>\n      <ion-input type="text" formControlName="alias" [(ngModel)]="creditCard.alias"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.FIRSTNAME\' | translate }}</ion-label>\n      <ion-input [readonly]="true" [value]="creditCard.billing_first_name"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.LASTNAME\' | translate }}</ion-label>\n      <ion-input [readonly]="true" [value]="creditCard.billing_last_name"></ion-input>\n    </ion-item>\n   \n    <!-- credit card number -->\n    <div class="wrapper">\n      <ion-item>\n        <ion-label floating>{{ \'CREDITCARDS.LABELS.CARDNUMBER\' | translate }}</ion-label>\n        <ion-input [readonly]="true" [value]="creditCard.cc_number"></ion-input>\n      </ion-item>\n    </div>\n\n    <ion-row>\n      <!-- expiration date -->\n      <ion-col col-6 no-padding>\n        <ion-item>\n          <ion-label floating>{{ \'CREDITCARDS.LABELS.EXPIRATIONDATE\' | translate }}</ion-label>\n          <ion-input [readonly]="true" [value]="ccExpirationDate"></ion-input>\n        </ion-item>\n      </ion-col>\n\n      <!-- zip code -->\n      <ion-col col-6 no-padding>\n        <ion-item class="zip-code">\n          <ion-label floating>{{ \'CREDITCARDS.LABELS.ZIPCODE\' | translate }}</ion-label>\n          <ion-input [readonly]="true" [value]="creditCard.billing_zip"></ion-input>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n\n  </form>\n</ion-content>\n\n<ion-footer no-border>\n  <ion-toolbar>\n    <button ion-button round (click)="deleteCard()" color="danger">{{ \'CREDITCARDS.BUTTONS.DELETEBUTTON\' | translate }}</button>\n    <button ion-button round (click)="save()">{{ \'CREDITCARDS.BUTTONS.SAVE\' | translate }}</button>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/credit-cards/spreedly/edit-spreedly-card/edit-spreedly-card.component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_4__shared_services_creditCard_service__["a" /* CreditCardService */],
        __WEBPACK_IMPORTED_MODULE_5__shared_services_messaging_service__["a" /* MessagingService */],
        __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */]])
], EditSpreedlyCardComponent);

//# sourceMappingURL=edit-spreedly-card.component.js.map

/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoggingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_app_version__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__http_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__configuration_service__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__classes_httpRequest_class__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







let LoggingService = class LoggingService {
    constructor(httpService, configuration, platform, app, formBuilder) {
        this.httpService = httpService;
        this.configuration = configuration;
        this.platform = platform;
        this.app = app;
        this.formBuilder = formBuilder;
        this.logglyToken = "6f7be5c8-12f1-4cb2-af9d-3548110ba846";
        this.logglyTag = '/tag/MobilePay';
        this.logglyURL = 'http://logs-01.loggly.com/inputs/' + this.logglyToken + this.logglyTag;
        this.infoLog = [];
        //For the Logging Messages
        this.body = {
            message: '',
            info: {},
            debug: {},
            verbose: {}
        };
    }
    info(message, logMessageToConsole) {
        this.body.message = message;
        this.body.info = {
            window: this.platform.win(),
            document: this.platform.doc(),
            location: this.platform.win().location,
            url: this.platform.doc().URL,
            title: this.platform.doc().title,
            referrer: this.platform.doc().referrer,
            userAgent: this.platform.win().navigator.userAgent,
            language: this.platform.win().navigator.language,
            version: this.app.getVersionNumber(),
            characterSet: this.platform.doc().characterSet
        };
        if (this.configuration.getLogLevel() > 0) {
            this.infoLog.push(this.body);
        }
        if (logMessageToConsole) {
            console.debug(message);
        }
    }
    debug(message, parameters, skipTransmit) {
        let log = new __WEBPACK_IMPORTED_MODULE_6__classes_httpRequest_class__["a" /* HttpRequestObject */]();
        this.info(message);
        this.body.debug = {
            params: parameters
        };
        if (!skipTransmit) {
            log.url = this.logglyURL;
            log.overrideBaseUrl = true;
            log.data = this.formBuilder.group({ 'debug': [this.body] });
            this.httpService.create(log);
            console.debug('***** DEBUG *****');
            console.debug(log);
        }
    }
    verbose(message, parameters, dump) {
        let log = new __WEBPACK_IMPORTED_MODULE_6__classes_httpRequest_class__["a" /* HttpRequestObject */]();
        this.debug(message, parameters, true);
        this.body.verbose = {
            stackDump: dump
        };
        log.url = this.logglyURL;
        log.overrideBaseUrl = true;
        log.data = this.formBuilder.group({ 'verbose': [this.body] });
        this.httpService.create(log);
        console.debug('***** VERBOSE *****');
        console.debug(log);
    }
};
LoggingService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__http_service__["a" /* HttpService */],
        __WEBPACK_IMPORTED_MODULE_5__configuration_service__["a" /* ConfigurationService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_app_version__["a" /* AppVersion */],
        __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */]])
], LoggingService);

//# sourceMappingURL=logging.service.js.map

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowHideInputDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let ShowHideInputDirective = class ShowHideInputDirective {
    constructor(el) {
        this.el = el;
        this.type = 'password';
    }
    changeType(type) {
        this.type = type;
        this.el.nativeElement.children[0].type = this.type;
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* HostBinding */])(),
    __metadata("design:type", String)
], ShowHideInputDirective.prototype, "type", void 0);
ShowHideInputDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Directive */])({
        selector: '[pbmShowHideInput]'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]])
], ShowHideInputDirective);

//# sourceMappingURL=show-hide-input.component.js.map

/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PermitsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__permit_details_permit_details_component__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_permit_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_messaging_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__available_permits_available_permits_component__ = __webpack_require__(126);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let PermitsComponent = class PermitsComponent {
    constructor(navCtrl, navParams, messagingService, permitService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.messagingService = messagingService;
        this.permitService = permitService;
        this.permits = [];
    }
    ionViewWillEnter() {
        this.loadActivePermits();
    }
    loadActivePermits() {
        this.permitService.activePermitsList()
            .then((response) => {
            this.permits = response;
        })
            .catch((err) => {
            this.messagingService.alertConfig.title = 'Error';
            this.messagingService.raiseAlert(err.msg);
        });
    }
    addNewPermit() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__available_permits_available_permits_component__["a" /* AvailablePermitsComponent */]);
    }
    editPermit(thePermit) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__permit_details_permit_details_component__["a" /* PermitDetailsComponent */], { 'thePermit': thePermit });
    }
};
PermitsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'pbm-permits',template:/*ion-inline-start:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/permits/permits.component.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Permits</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="content">\n  <div class="list-wrapper">\n    <ion-list *ngFor="let permit of permits">\n      <button \n        (click)="editPermit(permit)"\n        class="list-item item item-block item-md">\n        <ion-row no-padding class="content-row one-line">\n         \n          <ion-col no-padding>\n            <ion-icon name="pricetag"></ion-icon>\n          </ion-col>\n          \n          <ion-col no-padding class="item-content">\n            <h3 class="item-title">{{ permit.type.name }}</h3>\n            <p class="item-description">\n              <span>{{ permit.valid_start_date | date: "M/dd/yy" }}</span>—<span>{{ permit.valid_end_date | date: "M/dd/yy" }}</span>\n            </p>  \n          </ion-col>\n        \n        </ion-row>\n      </button>\n    </ion-list>\n  </div>\n</ion-content>\n\n<ion-fab right bottom>\n  <button ion-fab (click)="addNewPermit()">\n    <ion-icon name="add"></ion-icon>\n  </button>\n</ion-fab>'/*ion-inline-end:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/permits/permits.component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__shared_services_messaging_service__["a" /* MessagingService */],
        __WEBPACK_IMPORTED_MODULE_3__shared_services_permit_service__["a" /* PermitService */]])
], PermitsComponent);

//# sourceMappingURL=permits.component.js.map

/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_module__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(333);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_15" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreditCardService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_httpRequest_class__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__http_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logging_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_constants__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let CreditCardService = class CreditCardService {
    constructor(httpService, loggingService) {
        this.httpService = httpService;
        this.loggingService = loggingService;
        this.body = new __WEBPACK_IMPORTED_MODULE_1__classes_httpRequest_class__["a" /* HttpRequestObject */]();
        this.cards = [];
        this.baseUrl = '/creditcards';
        this.merchantInfo = {};
    }
    cardList() {
        if (this.cards.length) {
            return Promise.resolve(this.cards);
        }
        else {
            this.body.url = this.baseUrl;
            return this.httpService.load(this.body)
                .then((resp) => {
                this.cards = this.buildCardArray(resp.cards);
                return this.cards;
            })
                .catch((err) => {
                this.loggingService.info('Error loading card list: ' + JSON.stringify(err));
                return err;
            });
        }
    }
    //TODO: The server does not support PUT verb at this time. Once it does, this method will need to be rewritten
    saveCard(theCard) {
        //save it to our server
        //console.debug('CreditCardService.saveCard method');
        this.body.data = theCard;
        this.body.url = `${this.baseUrl}/${theCard.cc_storage_id}`;
        return this.httpService.create(this.body)
            .then((resp) => {
            //console.debug('response from server: ' + JSON.stringify(resp));
            if (resp.success) {
                let checkArray = [];
                checkArray = this.cards.filter((checkMe) => {
                    return checkMe.cc_storage_id == theCard.cc_storage_id;
                });
                if (!checkArray.length) {
                    this.cards.push(resp.card);
                }
                return { success: resp.success, cards: this.cards };
            }
            else {
                return resp;
            }
        })
            .catch((err) => {
            //console.debug('error thrown: ' + JSON.stringify(err));
            this.loggingService.info('Error saving a card: ' + JSON.stringify(err));
        });
    }
    //TODO: The server does not support the DELETE verb at this time. Once it does, this method needs to be rewritten
    removeCard(theCard) {
        this.body.url = `${this.baseUrl}/${theCard.cc_storage_id}/delete`;
        this.body.data = theCard;
        return this.httpService.load(this.body)
            .then((resp) => {
            this.cards = this.cards.filter((thisCard) => {
                return thisCard.cc_storage_id !== theCard.cc_storage_id;
            });
            return resp;
        })
            .catch((err) => {
            this.loggingService.info('Error removing a card: ' + JSON.stringify(err));
            return Promise.reject(err);
        });
    }
    newCard() {
        let newCard = {};
        newCard.cc_storage_id = 0;
        return newCard;
    }
    merchant() {
        return this.merchantInfo;
    }
    loadMerchantInfo() {
        this.body.url = '/cart/merchant';
        return this.httpService.load(this.body)
            .then((resp) => {
            if (resp.success) {
                this.merchantInfo = resp.merchant;
                return Promise.resolve();
            }
            else {
                return Promise.reject(resp.msg);
            }
        })
            .catch((err) => {
            return Promise.reject(err.msg);
        });
    }
    getCardType(cardTypeValue) {
        let result = [];
        if (typeof cardTypeValue == 'string') {
            result = __WEBPACK_IMPORTED_MODULE_4__assets_constants__["a" /* CreditCardTypes */].filter((thisType) => {
                return thisType.name.toLowerCase() == cardTypeValue.toLowerCase();
            });
        }
        else {
            result = __WEBPACK_IMPORTED_MODULE_4__assets_constants__["a" /* CreditCardTypes */].filter((thisType) => {
                return thisType.cc_type_id == cardTypeValue;
            });
        }
        return result[0];
    }
    notInitialized(theCard) {
        return theCard.cc_storage_id === 0;
    }
    buildCardArray(rawData) {
        let retVal = [];
        for (let thisCard in rawData) {
            retVal.push(rawData[thisCard]);
        }
        return retVal;
    }
};
CreditCardService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_3__logging_service__["a" /* LoggingService */]])
], CreditCardService);

//# sourceMappingURL=creditCard.service.js.map

/***/ }),

/***/ 260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export HttpLoaderFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_http_loader__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_barcode_scanner__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_card_io__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_is_debug__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_app_version__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_sqlite__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__app_component__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__login_login_component__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__forgot_forgot_component__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__sign_up_sign_up_component__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__credit_cards_credit_cards_component__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__credit_cards_authorizedotnet_add_authorizedotnet_card_add_authorizedotnet_card_component__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__credit_cards_paymentus_add_paymentus_card_add_paymentus_card_component__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__credit_cards_spreedly_add_spreedly_card_add_spreedly_card_component__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__credit_cards_authorizedotnet_edit_authorizedotnet_card_edit_authorizedotnet_card_component__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__credit_cards_paymentus_edit_paymentus_card_edit_paymentus_card_component__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__credit_cards_spreedly_edit_spreedly_card_edit_spreedly_card_component__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__history_history_component__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__park_park_component__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__park_purchase_park_purchase_component__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__permits_permits_component__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__permit_details_permit_details_component__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__vehicles_vehicles_component__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__vehicles_details_vehicles_details_component__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__shared_services_http_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__shared_services_localStorage_service__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__shared_services_configuration_service__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__shared_services_logging_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__shared_classes_user_class__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__shared_services_messaging_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__shared_services_list_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__shared_services_vehicle_service__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__shared_services_permit_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__components_show_hide_password_show_hide_container_component__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__components_show_hide_password_show_hide_input_component__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__components_uppercase_uppercase_directive__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__available_permits_available_permits_component__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__shared_services_creditCard_service__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















































function HttpLoaderFactory(http) {
    return new __WEBPACK_IMPORTED_MODULE_7__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
let AppModule = class AppModule {
};
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* PayByMobileComponent */],
            __WEBPACK_IMPORTED_MODULE_16__login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_17__forgot_forgot_component__["a" /* ForgotComponent */],
            __WEBPACK_IMPORTED_MODULE_18__sign_up_sign_up_component__["a" /* SignUpComponent */],
            __WEBPACK_IMPORTED_MODULE_19__credit_cards_credit_cards_component__["a" /* CreditCardsComponent */],
            __WEBPACK_IMPORTED_MODULE_26__history_history_component__["a" /* HistoryComponent */],
            __WEBPACK_IMPORTED_MODULE_27__park_park_component__["a" /* ParkComponent */],
            __WEBPACK_IMPORTED_MODULE_28__park_purchase_park_purchase_component__["a" /* ParkPurchaseComponent */],
            __WEBPACK_IMPORTED_MODULE_29__permits_permits_component__["a" /* PermitsComponent */],
            __WEBPACK_IMPORTED_MODULE_30__permit_details_permit_details_component__["a" /* PermitDetailsComponent */],
            __WEBPACK_IMPORTED_MODULE_31__vehicles_vehicles_component__["a" /* VehiclesComponent */],
            __WEBPACK_IMPORTED_MODULE_20__credit_cards_authorizedotnet_add_authorizedotnet_card_add_authorizedotnet_card_component__["a" /* AddAuthorizedotnetCardComponent */],
            __WEBPACK_IMPORTED_MODULE_21__credit_cards_paymentus_add_paymentus_card_add_paymentus_card_component__["a" /* AddPaymentusCardComponent */],
            __WEBPACK_IMPORTED_MODULE_22__credit_cards_spreedly_add_spreedly_card_add_spreedly_card_component__["a" /* AddSpreedlyCardComponent */],
            __WEBPACK_IMPORTED_MODULE_23__credit_cards_authorizedotnet_edit_authorizedotnet_card_edit_authorizedotnet_card_component__["a" /* EditAuthorizedotnetCardComponent */],
            __WEBPACK_IMPORTED_MODULE_24__credit_cards_paymentus_edit_paymentus_card_edit_paymentus_card_component__["a" /* EditPaymentusCardComponent */],
            __WEBPACK_IMPORTED_MODULE_25__credit_cards_spreedly_edit_spreedly_card_edit_spreedly_card_component__["a" /* EditSpreedlyCardComponent */],
            __WEBPACK_IMPORTED_MODULE_32__vehicles_details_vehicles_details_component__["a" /* VehiclesDetailsComponent */],
            __WEBPACK_IMPORTED_MODULE_42__components_show_hide_password_show_hide_container_component__["a" /* ShowHideContainerComponent */],
            __WEBPACK_IMPORTED_MODULE_43__components_show_hide_password_show_hide_input_component__["a" /* ShowHideInputDirective */],
            __WEBPACK_IMPORTED_MODULE_44__components_uppercase_uppercase_directive__["a" /* UppercaseDirective */],
            __WEBPACK_IMPORTED_MODULE_45__available_permits_available_permits_component__["a" /* AvailablePermitsComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* PayByMobileComponent */], {}, {
                links: [
                    { loadChildren: 'available-permits/available-permits.component.module#AvailablePermitsComponentModule', name: 'AvailablePermitsComponent', segment: 'available-permits.component', priority: 'low', defaultHistory: [] },
                    { loadChildren: 'credit-cards/credit-cards.component.module#CreditCardsComponentModule', name: 'CreditCardsComponent', segment: 'credit-cards.component', priority: 'low', defaultHistory: [] },
                    { loadChildren: 'forgot/forgot.component.module#ForgotComponentModule', name: 'ForgotComponent', segment: 'forgot.component', priority: 'low', defaultHistory: [] },
                    { loadChildren: 'history/history.component.module#HistoryComponentModule', name: 'HistoryComponent', segment: 'history.component', priority: 'low', defaultHistory: [] },
                    { loadChildren: 'login/login.component.module#LoginComponentModule', name: 'LoginComponent', segment: 'login.component', priority: 'low', defaultHistory: [] },
                    { loadChildren: 'park-purchase/park-purchase.component.module#ParkPurchaseComponentModule', name: 'ParkPurchaseComponent', segment: 'park-purchase.component', priority: 'low', defaultHistory: [] },
                    { loadChildren: 'park/park.component.module#ParkComponentModule', name: 'ParkComponent', segment: 'park.component', priority: 'low', defaultHistory: [] },
                    { loadChildren: 'permit-details/permit-details.component.module#PermitDetailsComponentModule', name: 'PermitDetailsComponent', segment: 'permit-details.component', priority: 'low', defaultHistory: [] },
                    { loadChildren: 'permits/permits.component.module#PermitsComponentModule', name: 'PermitsComponent', segment: 'permits.component', priority: 'low', defaultHistory: [] },
                    { loadChildren: 'sign-up/sign-up.component.module#SignUpComponentModule', name: 'SignUpComponent', segment: 'sign-up.component', priority: 'low', defaultHistory: [] },
                    { loadChildren: 'vehicles-details/vehicles-details.component.module#VehiclesDetailsComponentModule', name: 'VehiclesDetailsComponent', segment: 'vehicles-details.component', priority: 'low', defaultHistory: [] },
                    { loadChildren: 'vehicles/vehicles.component.module#VehiclesComponentModule', name: 'VehiclesComponent', segment: 'vehicles.component', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["a" /* IonicStorageModule */].forRoot({ name: 'PayByMobile' }),
            __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["b" /* TranslateModule */].forRoot({ loader: {
                    provide: __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["a" /* TranslateLoader */],
                    useFactory: HttpLoaderFactory,
                    deps: [__WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */]]
                } })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* PayByMobileComponent */],
            __WEBPACK_IMPORTED_MODULE_16__login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_19__credit_cards_credit_cards_component__["a" /* CreditCardsComponent */],
            __WEBPACK_IMPORTED_MODULE_18__sign_up_sign_up_component__["a" /* SignUpComponent */],
            __WEBPACK_IMPORTED_MODULE_17__forgot_forgot_component__["a" /* ForgotComponent */],
            __WEBPACK_IMPORTED_MODULE_27__park_park_component__["a" /* ParkComponent */],
            __WEBPACK_IMPORTED_MODULE_28__park_purchase_park_purchase_component__["a" /* ParkPurchaseComponent */],
            __WEBPACK_IMPORTED_MODULE_29__permits_permits_component__["a" /* PermitsComponent */],
            __WEBPACK_IMPORTED_MODULE_30__permit_details_permit_details_component__["a" /* PermitDetailsComponent */],
            __WEBPACK_IMPORTED_MODULE_31__vehicles_vehicles_component__["a" /* VehiclesComponent */],
            __WEBPACK_IMPORTED_MODULE_26__history_history_component__["a" /* HistoryComponent */],
            __WEBPACK_IMPORTED_MODULE_20__credit_cards_authorizedotnet_add_authorizedotnet_card_add_authorizedotnet_card_component__["a" /* AddAuthorizedotnetCardComponent */],
            __WEBPACK_IMPORTED_MODULE_21__credit_cards_paymentus_add_paymentus_card_add_paymentus_card_component__["a" /* AddPaymentusCardComponent */],
            __WEBPACK_IMPORTED_MODULE_22__credit_cards_spreedly_add_spreedly_card_add_spreedly_card_component__["a" /* AddSpreedlyCardComponent */],
            __WEBPACK_IMPORTED_MODULE_23__credit_cards_authorizedotnet_edit_authorizedotnet_card_edit_authorizedotnet_card_component__["a" /* EditAuthorizedotnetCardComponent */],
            __WEBPACK_IMPORTED_MODULE_24__credit_cards_paymentus_edit_paymentus_card_edit_paymentus_card_component__["a" /* EditPaymentusCardComponent */],
            __WEBPACK_IMPORTED_MODULE_25__credit_cards_spreedly_edit_spreedly_card_edit_spreedly_card_component__["a" /* EditSpreedlyCardComponent */],
            __WEBPACK_IMPORTED_MODULE_32__vehicles_details_vehicles_details_component__["a" /* VehiclesDetailsComponent */],
            __WEBPACK_IMPORTED_MODULE_45__available_permits_available_permits_component__["a" /* AvailablePermitsComponent */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_app_version__["a" /* AppVersion */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_is_debug__["a" /* IsDebug */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_33__shared_services_http_service__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_34__shared_services_localStorage_service__["a" /* LocalStorageService */],
            __WEBPACK_IMPORTED_MODULE_35__shared_services_configuration_service__["a" /* ConfigurationService */],
            __WEBPACK_IMPORTED_MODULE_36__shared_services_logging_service__["a" /* LoggingService */],
            __WEBPACK_IMPORTED_MODULE_37__shared_classes_user_class__["a" /* UserClass */],
            __WEBPACK_IMPORTED_MODULE_38__shared_services_messaging_service__["a" /* MessagingService */],
            __WEBPACK_IMPORTED_MODULE_39__shared_services_list_service__["a" /* ListService */],
            __WEBPACK_IMPORTED_MODULE_40__shared_services_vehicle_service__["a" /* VehicleService */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_card_io__["a" /* CardIO */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* Content */],
            __WEBPACK_IMPORTED_MODULE_41__shared_services_permit_service__["a" /* PermitService */],
            __WEBPACK_IMPORTED_MODULE_46__shared_services_creditCard_service__["a" /* CreditCardService */]
        ],
        schemas: [__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* CUSTOM_ELEMENTS_SCHEMA */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserClass; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_http_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__httpRequest_class__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_logging_service__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let UserClass = class UserClass {
    constructor(httpService, loggingService) {
        this.httpService = httpService;
        this.loggingService = loggingService;
        this.loggedIn = false;
        this.attemptMessage = '';
        this.owner = { owner_id: 0, pbn_token: '' };
        this.vehicles = [];
        this.body = new __WEBPACK_IMPORTED_MODULE_2__httpRequest_class__["a" /* HttpRequestObject */]();
    }
    get isLoggedIn() {
        return this.loggedIn;
    }
    get message() {
        return this.attemptMessage;
    }
    get vehicleList() {
        return this.vehicles;
    }
    get token() {
        return this.owner.pbn_token;
    }
    addVehicle(theVehicle) {
        let checkArray = [];
        checkArray = this.vehicles.filter((checkMe) => {
            return checkMe.vehicle_id == theVehicle.vehicle_id;
        });
        if (!checkArray.length) {
            this.vehicles.push(theVehicle);
        }
    }
    save() {
        this.body.data = this.owner;
        if (this.notInitialized()) {
            return this.httpService.create(this.body)
                .then((resp) => {
                if (resp.success) {
                    this.loadCustomerCallback(resp);
                }
                return resp;
            })
                .catch((err) => {
                this.loadCustomerError(err);
                return err;
            });
        }
        else {
            return this.httpService.update(this.body)
                .then((resp) => {
                this.loadCustomerCallback(resp);
                return resp;
            })
                .catch((err) => {
                this.loadCustomerError(err);
                return err;
            });
        }
    }
    load(passedId) {
        if (!passedId) {
            throw new Error('Calling .load on the UserClass requires that a userIdValue be provided!');
        }
        this.owner.owner_id = passedId;
        this.body.queryString = '?id=' + passedId;
        return this.httpService.load(this.body)
            .then((resp) => {
            this.loadCustomerCallback(resp);
            return resp;
        })
            .catch((err) => {
            this.loadCustomerError(err);
            return err;
        });
    }
    reload() {
        if (!this.owner.owner_id) {
            throw new Error('UserClass is not initialized!');
        }
        this.body.url = '/account';
        return this.httpService.load(this.body)
            .then((resp) => {
            this.loadCustomerCallback(resp);
            return resp;
        })
            .catch((err) => {
            this.loadCustomerError(err);
            return err;
        });
    }
    remove() {
        if (this.notInitialized()) {
            throw new Error('User class has not been initialized to a user instance!');
        }
        this.body.queryString = '?id=' + this.owner.owner_id;
        return this.httpService.remove(this.body)
            .then((resp) => {
            return resp;
        })
            .catch((err) => {
            return err;
        });
    }
    login(params) {
        this.body.data = params;
        this.body.url = '/doLogin';
        return this.httpService.create(this.body)
            .then((resp) => {
            this.loadCustomerCallback(resp);
            this.loggingService.info('Login successful');
            return resp;
        })
            .catch((err) => {
            this.loadCustomerError(err);
            this.loggingService.info('Login not successful: ' + err.msg);
            return err;
        });
    }
    signUp(params) {
        this.body.data = params;
        this.body.url = '/register';
        return this.httpService.create(this.body)
            .then((resp) => {
            if (resp.success) {
                this.loadCustomerCallback(resp);
                this.loggingService.info('Account creation success');
            }
            else {
                this.loadCustomerError(resp);
                this.loggingService.info('Account creation failed: ' + resp.msg);
            }
            return resp;
        })
            .catch((err) => {
            this.loadCustomerError(err);
            this.loggingService.info('Account creation call failed: ' + err.msg);
            return err;
        });
    }
    resetPassword(params) {
        this.body.data = params;
        this.body.url = '/password';
        return this.httpService.create(this.body)
            .then((resp) => {
            this.loggedIn = false;
            this.loggingService.info('ResetPassword call succeeded');
            return resp;
        })
            .catch((err) => {
            this.loggedIn = false;
            this.attemptMessage = err.msg;
            this.loggingService.info('ResetPassword call failed: ' + err.msg);
            return err;
        });
    }
    notInitialized() {
        return this.owner.owner_id === 0;
    }
    buildVehicleArray(rawData) {
        let retVal = [];
        for (let thisVehicle in rawData) {
            retVal.push(rawData[thisVehicle]);
        }
        return retVal;
    }
    loadCustomerCallback(resp) {
        if (resp.success) {
            this.loggedIn = true;
            this.attemptMessage = '';
            this.owner = resp.owner;
            this.vehicles = this.buildVehicleArray(resp.vehicles);
            this.httpService.token = resp.owner.pbn_token;
        }
        else {
            this.loggedIn = false;
            this.attemptMessage = resp.msg;
            this.owner = { owner_id: 0 };
            this.vehicles = [];
            this.httpService.token = '';
        }
    }
    loadCustomerError(err) {
        this.loggedIn = false;
        this.attemptMessage = err.msg;
        this.owner = {};
        this.vehicles = [];
        this.loggingService.info('Login call failed: ' + err.msg);
    }
};
UserClass = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_3__services_logging_service__["a" /* LoggingService */]])
], UserClass);

//# sourceMappingURL=user.class.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ToastConfigClass {
    constructor() {
        this.duration = 15000;
        this.position = 'middle';
        this.showCloseButton = true;
        this.closeButtonText = 'Close';
        this.dismissOnPageChange = true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ToastConfigClass;

//# sourceMappingURL=toastConfig.class.js.map

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PayByMobileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_sqlite__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__login_login_component__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_classes_user_class__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__credit_cards_credit_cards_component__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__park_park_component__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__vehicles_vehicles_component__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__history_history_component__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__shared_services_configuration_service__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__shared_services_logging_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__shared_services_list_service__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















let PayByMobileComponent = class PayByMobileComponent {
    constructor(platform, statusBar, splashScreen, configuration, loggingService, userClass, formBuilder, translate, listService, sqlite, events) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.configuration = configuration;
        this.loggingService = loggingService;
        this.userClass = userClass;
        this.formBuilder = formBuilder;
        this.translate = translate;
        this.listService = listService;
        this.sqlite = sqlite;
        this.events = events;
        this.rootComponent = __WEBPACK_IMPORTED_MODULE_7__login_login_component__["a" /* LoginComponent */];
        this.Components = [];
        this.owner = { first_name: '', last_name: '' };
        this.Components = [
            { title: 'Park', icon: 'home', component: __WEBPACK_IMPORTED_MODULE_10__park_park_component__["a" /* ParkComponent */], isPublic: true },
            //{ title: 'Permits', icon: 'pricetags', component: PermitsComponent, isPublic:true},
            { title: 'Vehicles', icon: 'car', component: __WEBPACK_IMPORTED_MODULE_11__vehicles_vehicles_component__["a" /* VehiclesComponent */], isPublic: true },
            { title: 'Credit Cards', icon: 'card', component: __WEBPACK_IMPORTED_MODULE_9__credit_cards_credit_cards_component__["a" /* CreditCardsComponent */], isPublic: true },
            { title: 'Purchase History', icon: 'paper', component: __WEBPACK_IMPORTED_MODULE_12__history_history_component__["a" /* HistoryComponent */], isPublic: true },
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
        if (Component.title == 'Park') {
            this.nav.setRoot(page);
        }
        else {
            this.nav.push(page);
        }
    }
    openDatabase() {
        this.loggingService.info('opening database', true);
        this.sqlite.create({ name: 'mpi.db', location: 'default' })
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
    createTables() {
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
    setLogLevel() {
        this.loggingService.info('getting log level', true);
        this.db.executeSql('SELECT LogLevelSetting FROM LogLevel', {})
            .then((results) => {
            console.debug(JSON.stringify(results));
            this.loggingService.info('logLevel search did not throw an error', true);
            if (!results.rows.length) {
                this.loggingService.info('no log level, so setting it to 1', true);
                //this should set it in the DB as well
                this.configuration.setLogLevel(1);
            }
            else {
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
    getStoredLogin() {
        let loginForm;
        let credsArray;
        this.loggingService.info('checking for credentials', true);
        this.db.executeSql('SELECT Credentials FROM Logins', {})
            .then((results) => {
            this.loggingService.info('credentials search did not get rejected', true);
            console.debug(JSON.stringify(results));
            if (!results.rows.length) {
                this.loggingService.info('credentials are not present', true);
                this.showLogin();
            }
            else {
                this.loggingService.info('credentials are present', true);
                credsArray = results.rows.item(0);
                loginForm = this.formBuilder.group({
                    j_username: [credsArray[0]],
                    j_password: [credsArray[1]]
                });
                this.doLogin(loginForm);
            }
        })
            .catch((e) => {
            this.loggingService.info('Attempting to get stored credentials threw database error: ' + JSON.stringify(e), true);
            this.showLogin();
        });
    }
    doLogin(loginForm) {
        this.loggingService.info('attempting login', true);
        this.userClass.login(loginForm)
            .then(() => {
            this.loggingService.info('Login successful', true);
            this.listService.loadLists();
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_10__park_park_component__["a" /* ParkComponent */]);
        })
            .catch((e) => {
            this.loggingService.info('Attemting login threw login error: ' + JSON.stringify(e), true);
            this.showLogin();
        });
    }
    showLogin() {
        this.loggingService.info('showLogin called', true);
        this.loggingService.info('setting statusBar style', true);
        this.statusBar.styleDefault();
        this.loggingService.info('hiding splash screen', true);
        this.splashScreen.hide();
        this.loggingService.info('setting root navigation', true);
        return this.nav.setRoot(this.rootComponent);
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Nav */])
], PayByMobileComponent.prototype, "nav", void 0);
PayByMobileComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/app.component.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <div>\n      <ion-icon name="contact"></ion-icon>\n      <h2>{{ owner.first_name }} {{ owner.last_name }}</h2>\n    </div>\n  </ion-header>\n\n  <ion-content class="menu-content">\n    <ion-list class="menu-list">\n      <ion-item no-lines menuClose ion-item *ngFor="let page of Components" (click)="openComponent(page)">\n        <ion-icon name="{{ page.icon }}" item-left></ion-icon>\n        {{ page.title }}\n      </ion-item>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootComponent" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/app.component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_13__shared_services_configuration_service__["a" /* ConfigurationService */],
        __WEBPACK_IMPORTED_MODULE_14__shared_services_logging_service__["a" /* LoggingService */],
        __WEBPACK_IMPORTED_MODULE_8__shared_classes_user_class__["a" /* UserClass */],
        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_15__shared_services_list_service__["a" /* ListService */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_sqlite__["a" /* SQLite */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* Events */]])
], PayByMobileComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowHideContainerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__show_hide_input_component__ = __webpack_require__(240);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let ShowHideContainerComponent = class ShowHideContainerComponent {
    constructor() {
        this.show = false;
        this.classes = 'show-hide-password';
    }
    toggleShow() {
        this.show = !this.show;
        if (this.show) {
            this.input.changeType("text");
        }
        else {
            this.input.changeType("password");
        }
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* HostBinding */])('class'),
    __metadata("design:type", Object)
], ShowHideContainerComponent.prototype, "classes", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* ContentChild */])(__WEBPACK_IMPORTED_MODULE_1__show_hide_input_component__["a" /* ShowHideInputDirective */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__show_hide_input_component__["a" /* ShowHideInputDirective */])
], ShowHideContainerComponent.prototype, "input", void 0);
ShowHideContainerComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'pbm-show-hide-container',template:/*ion-inline-start:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/components/show-hide-password/show-hide-password.component.html"*/'<ng-content></ng-content>\n<a class="type-toggle" (click)="toggleShow()">\n	<ion-icon class="show-option" [hidden]="show" name="eye"></ion-icon>\n	<ion-icon class="hide-option" [hidden]="!show" name="eye-off"></ion-icon>\n</a>'/*ion-inline-end:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/components/show-hide-password/show-hide-password.component.html"*/
    }),
    __metadata("design:paramtypes", [])
], ShowHideContainerComponent);

//# sourceMappingURL=show-hide-container.component.js.map

/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UppercaseDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
//Source: https://stackoverflow.com/questions/35826325/how-to-convert-input-value-to-uppercase-in-angular-2-value-passing-to-ngcontrol
//It's not the accepted answer. Look for the submission by subaru710.
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let UppercaseDirective = class UppercaseDirective {
    constructor() {
        this.ngModelChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
    }
    onInputChange($event) {
        this.value = $event.target.value.toUpperCase();
        this.ngModelChange.emit(this.value);
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* Output */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */])
], UppercaseDirective.prototype, "ngModelChange", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* HostListener */])('input', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UppercaseDirective.prototype, "onInputChange", null);
UppercaseDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Directive */])({
        selector: '[pbm-uppercase][ngModel]'
    })
], UppercaseDirective);

//# sourceMappingURL=uppercase.directive.js.map

/***/ }),

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const environment = {
    production: false
};
/* harmony export (immutable) */ __webpack_exports__["a"] = environment;

//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let HttpService = class HttpService {
    constructor(http) {
        this.http = http;
        this.baseUrl = 'https://staging-paylock.mercuryparking.com/cws/parkbynexus';
        //private baseUrl: string = 'http://192.168.0.10:8080/cws/parkbynexus';
        this.tokenValue = '';
    }
    create(request) {
        let finalUrl = request.overrideBaseUrl ? request.url : this.baseUrl + request.url;
        let headers = { headers: request.headers || this.setDefaultHeaders() };
        return this.http.post(finalUrl, this.jsonToKeyValuePair(request.data), headers).toPromise();
    }
    update(request) {
        let finalUrl = request.overrideBaseUrl ? request.url : this.baseUrl + request.url;
        let headers = { headers: request.headers || this.setDefaultHeaders() };
        return this.http.put(finalUrl, this.jsonToKeyValuePair(request.data), headers).toPromise();
    }
    load(request) {
        let finalUrl = request.overrideBaseUrl ? request.url : this.baseUrl + request.url;
        if (request.queryString.length) {
            finalUrl += request.queryString;
        }
        let headers = { headers: request.headers || this.setDefaultHeaders() };
        return this.http.get(finalUrl, headers).toPromise();
    }
    remove(request) {
        let finalUrl = request.overrideBaseUrl ? request.url : this.baseUrl + request.url;
        let headers = { headers: request.headers || this.setDefaultHeaders() };
        return this.http.delete(finalUrl, headers).toPromise();
    }
    get token() {
        return this.tokenValue;
    }
    set token(newValue) {
        this.tokenValue = newValue;
    }
    jsonToKeyValuePair(jsonInput) {
        let params = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* URLSearchParams */]();
        if (jsonInput.controls) {
            Object.keys(jsonInput.controls)
                .forEach((key) => {
                params.set(key, jsonInput.get(key).value);
            });
        }
        else {
            Object.keys(jsonInput)
                .forEach((key) => {
                params.set(key, jsonInput[key]);
            });
        }
        return params.toString();
    }
    setDefaultHeaders() {
        if (!this.tokenValue.length) {
            return new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/x-www-form-urlencoded' });
        }
        else {
            return new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRF-Token': this.tokenValue
            });
        }
    }
};
HttpService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
], HttpService);

//# sourceMappingURL=http.service.js.map

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const LogglyConfigurations = {
    logglyKey: "6f7be5c8-12f1-4cb2-af9d-3548110ba846",
    logglyTags: ["ionic2", "PayByMobile"],
};
/* unused harmony export LogglyConfigurations */

const CreditCardTypes = [
    { cc_type_id: 1, name: 'Visa', accepted: 1, image_name: '', cvvMessage: 'This is a 3 digit code found on the back of your card' },
    { cc_type_id: 2, name: 'MC', accepted: 1, image_name: '', cvvMessage: 'This is a 3 digit code found on the back of your card' },
    { cc_type_id: 3, name: 'Disc', accepted: 1, image_name: '', cvvMessage: 'This is a 3 digit code found on the back of your card' },
    { cc_type_id: 4, name: 'AmEx', accepted: 1, image_name: '', cvvMessage: 'This is a 4 digit code found on the front of your card' }
];
/* harmony export (immutable) */ __webpack_exports__["a"] = CreditCardTypes;

//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PermitService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__http_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logging_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classes_httpRequest_class__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let PermitService = class PermitService {
    constructor(httpService, loggingProvider) {
        this.httpService = httpService;
        this.loggingProvider = loggingProvider;
        this.body = new __WEBPACK_IMPORTED_MODULE_3__classes_httpRequest_class__["a" /* HttpRequestObject */]();
        this.baseUrl = '/permits';
    }
    meteredPermit(space) {
        this.body.url = this.baseUrl + '/types?space=' + space + '&metered=';
        return this.httpService.load(this.body)
            .then((resp) => {
            return resp.permits[0];
        });
    }
    permitDetails(permitTypeId) {
        this.body.url = this.baseUrl + '/types/' + permitTypeId;
        return this.httpService.load(this.body)
            .then((resp) => {
            return resp;
        });
    }
    activePermitsList() {
        this.body.url = this.baseUrl;
        return this.httpService.load(this.body)
            .then((response) => {
            if (response.success) {
                return response.permits;
            }
            else {
                return [];
            }
        })
            .catch((err) => {
            return err;
        });
    }
    availablePermitsList() {
        this.body.url = `${this.baseUrl}/types`;
        return this.httpService.load(this.body)
            .then((response) => {
            if (response.success) {
                return response.permits;
            }
            else {
                return [];
            }
        })
            .catch((err) => {
            return err;
        });
    }
    updatePermit(params) {
        this.body.data = params;
        this.body.url = `${this.baseUrl}/${params.mpermit_id}`;
        return this.httpService.create(this.body)
            .then((response) => {
            if (response.success) {
                let foo = response;
            }
            else {
            }
        })
            .catch((err) => {
            return err;
        });
    }
    /*
    //TODO: An endpoint is needed for deleting a permit
    removePermit(thePermit:Permit):Promise<any>{
      this.body.url = '/permit/delete';
      this.body.data = thePermit
      return this.httpService.create(this.body)
        .then((resp) => {
          return resp;
        })
        .catch((err) => {
          return err;
        });
    }
    */
    newPermit() {
        let newP = {};
        newP.mpermit_id = 0;
        newP.owner_id = 0;
        newP.permit_number = '';
        newP.status = '';
        newP.mpermit_type_id = 0;
        newP.valid_start_date = '';
        newP.valid_end_date = '';
        newP.create_date = '';
        newP.update_date = '';
        newP.space = 0;
        newP.name = '';
        newP.description = '';
        return newP;
    }
    setPermits(permits) {
        this.permits = permits;
        return true;
    }
    getPermits() {
        return this.permits;
    }
    setPermit(permit) {
        this.permit = permit;
        return true;
    }
    getPermit() {
        return this.permit;
    }
    setPermitType(permitType) {
        this.permitType = permitType;
        this.permit.mpermit_type_id = this.permitType.mpermit_type_id;
        this.permit.type = this.permitType;
        return true;
    }
    getPermitType() {
        return this.permitType;
    }
};
PermitService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_2__logging_service__["a" /* LoggingService */]])
], PermitService);

//# sourceMappingURL=permit.service.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class HttpRequestObject {
    constructor() {
        this.url = '';
        this.queryString = '';
        this.overrideBaseUrl = false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HttpRequestObject;

//# sourceMappingURL=httpRequest.class.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__http_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logging_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classes_httpRequest_class__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let ListService = class ListService {
    constructor(httpService, loggingService) {
        this.httpService = httpService;
        this.loggingService = loggingService;
        this.statesArray = [];
        this.lotsArray = [];
        this.vehicleTypesArray = [];
    }
    loadLists() {
        let req = new __WEBPACK_IMPORTED_MODULE_3__classes_httpRequest_class__["a" /* HttpRequestObject */]();
        req.url = '/lists';
        return this.httpService.load(req)
            .then((resp) => {
            if (resp.success) {
                this.statesArray = resp.states.map((thisState) => {
                    return thisState;
                });
                this.lotsArray = resp.lots.map((thisLot) => {
                    return thisLot;
                });
                this.vehicleTypesArray = resp.vehicle_classes.map((thisVehicleType) => {
                    return thisVehicleType;
                });
            }
            else {
                this.loggingService.info(resp.msg);
            }
        })
            .catch((err) => {
            this.loggingService.info(err);
        });
    }
    get states() {
        return this.statesArray;
    }
    get lots() {
        return this.lotsArray;
    }
    get vehicleTypes() {
        return this.vehicleTypesArray;
    }
};
ListService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_2__logging_service__["a" /* LoggingService */]])
], ListService);

//# sourceMappingURL=list.service.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParkComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_content_content__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_messaging_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_services_permit_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__park_purchase_park_purchase_component__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_classes_alertConfig_class__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









let ParkComponent = class ParkComponent {
    constructor(navCtrl, navParams, formBuilder, messagingService, permitService, translationService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.messagingService = messagingService;
        this.permitService = permitService;
        this.translationService = translationService;
        this.parkingSpaceSearchForm = this.formBuilder.group({
            space: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(1),
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(10),
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required
                ])
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
            if (resp != undefined) {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__park_purchase_park_purchase_component__["a" /* ParkPurchaseComponent */], { 'thePermit': resp });
            }
            else {
                this.invalidLocationNumber();
            }
        })
            .catch(() => {
            this.invalidLocationNumber();
        });
    }
    invalidLocationNumber() {
        let okButton = new __WEBPACK_IMPORTED_MODULE_8__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        okButton.text = this.translationService.instant('PARK.OKBUTTON');
        return this.messagingService.raiseConfirm(this.translationService.instant('PARK.INVALIDLOCATION'), [okButton]);
    }
    getActivePermits() {
        return this.permitService.availablePermitsList()
            .then((resp) => {
            this.permits = resp;
        })
            .catch(() => {
        });
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_content_content__["a" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_content_content__["a" /* Content */])
], ParkComponent.prototype, "content", void 0);
ParkComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'pbm-park',template:/*ion-inline-start:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/park/park.component.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Park</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <form [formGroup]="parkingSpaceSearchForm">\n    <ion-item>\n      <ion-label floating>Parking Space</ion-label>\n      <ion-input formControlName=\'space\' type="number" [(ngModel)]="space" [ngModelOptions]="{standalone: true}"></ion-input>\n    </ion-item>\n    <button ion-button block round class="parking-spot-search-button" (click)="getPermit()">Search</button>\n  </form>\n\n  <div class="active-permit-wrapper">\n    <h4>Active Parking Sessions</h4>\n    <ion-list>\n        <ion-item *ngFor="let permit of permits" class="item-text-wrap">\n          <h2 class="item-title">{{ permit.alias }}</h2>\n        </ion-item>    \n    </ion-list> \n  </div>\n</ion-content>'/*ion-inline-end:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/park/park.component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_5__shared_services_messaging_service__["a" /* MessagingService */],
        __WEBPACK_IMPORTED_MODULE_6__shared_services_permit_service__["a" /* PermitService */],
        __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */]])
], ParkComponent);

//# sourceMappingURL=park.component.js.map

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VehicleService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__http_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logging_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classes_httpRequest_class__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__classes_user_class__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let VehicleService = class VehicleService {
    constructor(httpService, loggingService, userClass) {
        this.httpService = httpService;
        this.loggingService = loggingService;
        this.userClass = userClass;
        this.body = new __WEBPACK_IMPORTED_MODULE_3__classes_httpRequest_class__["a" /* HttpRequestObject */]();
        this.baseUrl = '/vehicles';
    }
    //TODO: The server is not able to accept requests for an individual vehicle at this time. Once it can, this entire method needs to be re-written.
    loadVehicle(vehicle_id) {
        this.body.url = `${this.baseUrl}/${vehicle_id}`;
        return this.httpService.load(this.body)
            .then((resp) => {
            if (resp.success) {
                return resp.vehicle;
            }
            else {
                return null;
            }
        })
            .catch((err) => {
            return err;
        });
    }
    vehicleList() {
        this.body.url = this.baseUrl;
        return this.httpService.load(this.body)
            .then((resp) => {
            //TODO: API always returns success = false for this endpoint. Must fix to return real value for success.
            return this.buildVehicleArray(resp.vehicles);
            /*
            if(resp.success){
                return this.buildVehicleArray(resp.vehicles);
            } else {
                return resp;
            }
            */
        })
            .catch((err) => {
            return err;
        });
    }
    //TODO: The server does not support PUT verb at this time. Once it does, this method needs to be updated to do it the right way.
    saveVehicle(theVehicle) {
        this.body.data = theVehicle;
        this.body.url = `${this.baseUrl}/${theVehicle.vehicle_id}`;
        return this.httpService.create(this.body)
            .then((resp) => {
            this.userClass.addVehicle(resp.vehicle);
            return resp;
        })
            .catch((err) => {
            return err;
        });
    }
    //TODO: The server does not support the DELETE verb at this time. Once it does, this method needs to be updated to do it the right way.
    removeVehicle(theVehicle) {
        this.body.url = `${this.baseUrl}/${theVehicle.vehicle_id}/delete`;
        this.body.data = theVehicle;
        return this.httpService.load(this.body)
            .then((resp) => {
            return resp;
        })
            .catch((err) => {
            return err;
        });
    }
    newVehicle() {
        let newV = {};
        newV.vehicle_id = 0;
        newV.alias = '';
        newV.license = '';
        newV.vin = '';
        newV.state_id = '';
        newV.type = '';
        return newV;
    }
    buildVehicleArray(rawData) {
        let retVal = [];
        for (let thisVehicle in rawData) {
            retVal.push(rawData[thisVehicle]);
        }
        return retVal;
    }
    notInitialized(theVehicle) {
        return theVehicle.vehicle_id === 0;
    }
};
VehicleService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_2__logging_service__["a" /* LoggingService */], __WEBPACK_IMPORTED_MODULE_4__classes_user_class__["a" /* UserClass */]])
], VehicleService);

//# sourceMappingURL=vehicle.service.js.map

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VehiclesDetailsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_barcode_scanner__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_messaging_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_services_list_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_services_vehicle_service__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_classes_alertConfig_class__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









let VehiclesDetailsComponent = class VehiclesDetailsComponent {
    constructor(navCtrl, navParams, formBuilder, messagingService, listService, vehicleService, barcodeScanner, translateService, renderer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.messagingService = messagingService;
        this.listService = listService;
        this.vehicleService = vehicleService;
        this.barcodeScanner = barcodeScanner;
        this.translateService = translateService;
        this.renderer = renderer;
        this.thisVehicle = this.navParams.get('theVehicle');
        this.pageTitle = this.thisVehicle.vehicle_id === 0 ? this.translateService.instant('VEHICLEDETAILS.PAGETITLES.ADDVEHICLE') : this.translateService.instant('VEHICLEDETAILS.PAGETITLES.EDITVEHICLE');
        //TODO: Add the rest of the vehicle fields to the form for editing, but keep it simple/quick for creation
        this.vehicleDetails = this.formBuilder.group({
            alias: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(4), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[a-zA-Z0-9 ]*'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            license: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(4), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[a-zA-Z0-9 ]*'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            vin: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[a-zA-Z0-9]*')])],
            state: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            type: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
        this.states = this.listService.states;
        this.vehicleTypes = this.listService.vehicleTypes;
    }
    setAsTouched() {
        for (var controlName in this.vehicleDetails.controls) {
            let elem = document.querySelector('[formControlName="' + controlName + '"]');
            if (elem) {
                this.renderer.setElementClass(elem.parentElement.parentElement.parentElement, 'ng-touched', this.vehicleDetails.controls[controlName].touched);
            }
        }
    }
    save() {
        if (this.vehicleDetails.pristine) {
            return this.navCtrl.pop();
        }
        else if (this.vehicleDetails.valid) {
            this.thisVehicle.alias = this.vehicleDetails.get('alias').value;
            this.thisVehicle.license = this.vehicleDetails.get('license').value;
            this.thisVehicle.state_id = this.vehicleDetails.get('state').value;
            this.thisVehicle.vin = this.vehicleDetails.get('vin').value;
            this.thisVehicle.type = this.vehicleDetails.get('type').value;
            return this.vehicleService.saveVehicle(this.thisVehicle)
                .then((resp) => {
                if (resp.success) {
                    return this.navCtrl.pop();
                }
                else {
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
    deleteVehicle() {
        let yesButton = new __WEBPACK_IMPORTED_MODULE_8__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        let noButton = new __WEBPACK_IMPORTED_MODULE_8__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        yesButton.text = this.translateService.instant('VEHICLEDETAILS.BUTTONS.DELETEVEHICLECONFIRM.YES');
        yesButton.handler = () => {
            return this.vehicleService.removeVehicle(this.thisVehicle)
                .then((resp) => {
                if (resp.success) {
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
        return this.messagingService.raiseConfirm(this.translateService.instant('VEHICLEDETAILS.CONFIRMS.DELETEVEHICLECONFIRM'), [yesButton, noButton]);
    }
    cancel() {
        let yesButton = new __WEBPACK_IMPORTED_MODULE_8__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        let noButton = new __WEBPACK_IMPORTED_MODULE_8__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        yesButton.text = this.translateService.instant('VEHICLEDETAILS.BUTTONS.CANCELCONFIRM.YES');
        yesButton.handler = () => {
            return this.navCtrl.pop();
        };
        noButton.text = this.translateService.instant('VEHICLEDETAILS.BUTTONS.CANCELCONFIRM.NO');
        if (this.vehicleDetails.dirty) {
            this.messagingService.alertConfig.title = this.translateService.instant('VEHICLEDETAILS.CONFIRMS.CANCELCONFIRM.TITLE');
            return this.messagingService.raiseConfirm(this.translateService.instant('VEHICLEDETAILS.CONFIRMS.CANCELCONFIRM.MESSAGE'), [yesButton, noButton]);
        }
        else {
            return this.navCtrl.pop();
        }
    }
    scan() {
        return this.barcodeScanner.scan({ showTorchButton: true })
            .then((data) => {
            this.thisVehicle.vin = data.text;
        });
    }
};
VehiclesDetailsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'pbm-vehicles-details',template:/*ion-inline-start:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/vehicles-details/vehicles-details.component.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{ pageTitle }}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <form [formGroup]="vehicleDetails">\n    <ion-item>\n      <ion-label floating>{{ \'VEHICLEDETAILS.LABELS.NICKNAME\' | translate }}</ion-label>\n      <ion-input type="text" formControlName="alias" placeholder="" [(ngModel)]="thisVehicle.alias" (blur)="setAsTouched()"></ion-input>\n    </ion-item>\n    <div class="form-error-message" *ngIf="vehicleDetails.controls.alias.errors && vehicleDetails.controls.alias.value">\n        Must be between 4 and 30 characters.\n    </div>\n\n    <ion-item>\n      <ion-label floating>{{ \'VEHICLEDETAILS.LABELS.LICENSEPLATE\' | translate }}</ion-label>\n      <ion-input type="text" formControlName="license" placeholder="" [(ngModel)]="thisVehicle.license" [pbm-uppercase] (blur)="setAsTouched()"></ion-input>\n    </ion-item>\n    <div class="form-error-message" *ngIf="vehicleDetails.controls.license.errors && vehicleDetails.controls.license.value">\n        Must be between 4 and 30 characters.\n    </div>\n\n    <ion-item>\n      <ion-label floating>{{ \'VEHICLEDETAILS.LABELS.LICENSESTATE\' | translate }}</ion-label>\n      <ion-select formControlName="state" placeholder="" [multiple]="false" [(ngModel)]="thisVehicle.state_id" interface="popover">\n        <ion-option *ngFor="let state of states" value="{{ state.codeid }}">{{ state.description }}</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>{{ \'VEHICLEDETAILS.LABELS.VEHICLETYPE\' | translate }}</ion-label>\n      <ion-select formControlName="type" placeholder="" [(ngModel)]="thisVehicle.type" interface="popover">\n        <ion-option *ngFor="let type of vehicleTypes" value="{{ type.vehicle_class_id }}">{{ type.name }}</ion-option>\n      </ion-select>\n    </ion-item>\n    <!--\n    These fields are not going to have an endpoint to populate them until after 2.2, so they are commented out for now\n    <ion-item *ngIf="thisVehicle.vehicle_id != 0">\n      <ion-label floating>{{ \'VEHICLEDETAILS.LABELS.VEHICLEMAKE\' | translate }}</ion-label>\n      <ion-select>\n      </ion-select>\n    </ion-item>\n    <ion-item *ngIf="thisVehicle.vehicle_id != 0">\n      <ion-label floating>{{ \'VEHICLEDETAILS.LABELS.VEHICLECOLOR\' | translate }}</ion-label>\n      <ion-input type="url"></ion-input>\n    </ion-item>-->\n    <div *ngIf="thisVehicle.vehicle_id != 0" class="vin-wrapper">\n      <ion-item>\n        <ion-label floating>{{ \'VEHICLEDETAILS.LABELS.VEHICLEVIN\' | translate }}</ion-label>\n        <ion-input type="text" formControlName="vin" placeholder="" [(ngModel)]="thisVehicle.vin"></ion-input>\n      </ion-item>\n      <a class="scan-button" (click)="scan()">\n        <ion-icon name="ios-barcode-outline"></ion-icon>\n      </a>\n    </div>\n  </form>\n</ion-content>\n\n<ion-footer no-border>      \n  <ion-toolbar>\n    <div *ngIf="thisVehicle.vehicle_id != 0" class="vehicle-details-button-wrapper">\n      <button ion-button round color="danger" (click)="deleteVehicle()">{{ \'VEHICLEDETAILS.BUTTONS.ACTIONBUTTONS.DELETEVEHICLE\' | translate }}</button>\n      <button ion-button round [disabled]="!vehicleDetails.valid" (click)="save()">{{ \'VEHICLEDETAILS.BUTTONS.ACTIONBUTTONS.SAVEEDITS\' | translate }}</button>\n    </div>\n    <div *ngIf="thisVehicle.vehicle_id == 0" class="add-vehicle-button-wrapper">\n      <button ion-button block round [disabled]="!vehicleDetails.valid" (click)="save()">{{ \'VEHICLEDETAILS.BUTTONS.ACTIONBUTTONS.SAVEVEHICLE\' | translate }}</button>\n    </div>\n  </ion-toolbar>  \n</ion-footer>'/*ion-inline-end:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/vehicles-details/vehicles-details.component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_5__shared_services_messaging_service__["a" /* MessagingService */],
        __WEBPACK_IMPORTED_MODULE_6__shared_services_list_service__["a" /* ListService */],
        __WEBPACK_IMPORTED_MODULE_7__shared_services_vehicle_service__["a" /* VehicleService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
        __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer */]])
], VehiclesDetailsComponent);

//# sourceMappingURL=vehicles-details.component.js.map

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigurationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_is_debug__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__localStorage_service__ = __webpack_require__(191);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { CloudSettings } from '@ionic/cloud-angular';



let ConfigurationService = class ConfigurationService {
    constructor(isDebugObject, localStorageService) {
        this.isDebugObject = isDebugObject;
        this.localStorageService = localStorageService;
        // private cloudSettings: CloudSettings = {
        // 	'core': {
        // 		'app_id': 'b7d71c79'
        // 	}
        // };
        this.isDebug = false;
        this.spinner = "crescent";
        this.logLevel = 1;
        this.isDebugObject.getIsDebug()
            .then((isDebug) => {
            this.isDebug = isDebug;
        })
            .catch((error) => {
        });
    }
    // public getCloudSettings() : CloudSettings {
    // 	return this.cloudSettings;
    // }
    getSpinner() {
        return this.spinner;
    }
    getIsDebug() {
        return this.isDebug;
    }
    getLogLevel() {
        return this.logLevel;
    }
    //TODO: We should probably return a boolean value here and act accordingly on the calling end
    setLogLevel(newLevel) {
        this.localStorageService.setValue('logLevel', newLevel.toString())
            .then(() => {
            this.logLevel = newLevel;
        });
    }
};
ConfigurationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_is_debug__["a" /* IsDebug */], __WEBPACK_IMPORTED_MODULE_3__localStorage_service__["a" /* LocalStorageService */]])
], ConfigurationService);

//# sourceMappingURL=configuration.service.js.map

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddAuthorizedotnetCardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_card_io__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_creditCard_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_services_messaging_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__assets_constants__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_classes_alertConfig_class__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









let AddAuthorizedotnetCardComponent = class AddAuthorizedotnetCardComponent {
    constructor(navCtrl, formBuilder, creditCardService, messagingService, cardIO, translationService) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.creditCardService = creditCardService;
        this.messagingService = messagingService;
        this.cardIO = cardIO;
        this.translationService = translationService;
        this.cardTypes = __WEBPACK_IMPORTED_MODULE_7__assets_constants__["a" /* CreditCardTypes */];
        this.ccExpirationDate = { 'month': 0, 'year': 0 };
        this.creditCard = this.creditCardService.newCard();
        this.creditCardForm = this.formBuilder.group({
            'alias': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(50), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z ]*')])],
            'billing_first_name': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(50), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z]*')])],
            'billing_last_name': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(50), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z ]*')])],
            'billing_zip': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(5), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(5), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9]*')])],
            'cc_mask': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(15), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(16), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[0-9]*')])],
            'cc_exp_date': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])],
            'cvv': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(3), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(4), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[0-9]*')])]
        });
    }
    showCVVInfo() {
        let toastConfig = {
            message: this.cardTypes[this.creditCard.cc_type_id - 1].cvvMessage,
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: this.translationService.instant('CREDITCARDS.BUTTONS.OK'),
            dismissOnPageChange: true
        };
        return this.messagingService.raiseToast(toastConfig);
    }
    setExpirationDate(e) {
        this.ccExpirationDate = e;
    }
    save() {
        console.debug('Form is valid: ' + this.creditCardForm.valid);
        if (this.creditCardForm.pristine) {
            console.debug('add credit card form is pristine');
            return this.navCtrl.pop();
        }
        else if (this.creditCardForm.valid) {
            this.creditCard.alias = this.creditCardForm.get('alias').value;
            this.creditCard.billing_first_name = this.creditCardForm.get('billing_first_name').value;
            this.creditCard.billing_last_name = this.creditCardForm.get('billing_last_name').value;
            this.creditCard.card_mask = this.creditCardForm.get('cc_mask').value;
            this.creditCard.billing_zip = this.creditCardForm.get('billing_zip').value;
            this.creditCard.cc_exp_month = this.ccExpirationDate.month;
            this.creditCard.cc_exp_year = this.ccExpirationDate.year;
            console.debug('passing to service');
            return this.creditCardService.saveCard(this.creditCard)
                .then((resp) => {
                if (resp.success) {
                    return this.navCtrl.pop();
                }
                else {
                    this.messagingService.alertConfig.title = this.translationService.instant('ALERTS.TITLES.ERROR');
                    return this.messagingService.raiseAlert(resp.msg);
                }
            })
                .catch((err) => {
                this.messagingService.alertConfig.title = this.translationService.instant('ALERTS.TITLES.ERROR');
                return this.messagingService.raiseAlert(err);
            });
        }
        else {
            console.debug('validity of alias: ' + this.creditCardForm.get('alias').valid);
            console.debug('validity of billing_first_name: ' + this.creditCardForm.get('billing_first_name').valid);
            console.debug('validity of billing_last_name: ' + this.creditCardForm.get('billing_last_name').valid);
            console.debug('validity of billing_zip: ' + this.creditCardForm.get('billing_zip').valid);
            console.debug('validity of cc_type: ' + this.creditCardForm.get('cc_type').valid);
            console.debug('validity of cc_exp_date: ' + this.creditCardForm.get('cc_exp_date').valid);
            console.debug('validity of cc_mask: ' + this.creditCardForm.get('cc_mask').valid);
            console.debug('validity of cvv: ' + this.creditCardForm.get('cvv').valid);
            //console.debug('validity of : ' + this.creditCardForm.get('').valid);
        }
    }
    cancel() {
        let yesButton = new __WEBPACK_IMPORTED_MODULE_8__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        let noButton = new __WEBPACK_IMPORTED_MODULE_8__shared_classes_alertConfig_class__["a" /* AlertButtonConfigClass */]();
        yesButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.YES');
        yesButton.handler = () => {
            return this.navCtrl.pop();
        };
        noButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.NO');
        if (this.creditCardForm.dirty) {
            this.messagingService.alertConfig.title = this.translationService.instant('CREDITCARDS.ALERTS.DISCARD');
            return this.messagingService.raiseConfirm(this.translationService.instant('CREDITCARDS.PROMPTS.DISCARD'), [yesButton, noButton]);
        }
        else {
            return this.navCtrl.pop();
        }
    }
    scan() {
        let options = {
            requireExpiry: true,
            requirePostalCode: true,
            scanExpiry: true
        };
        return this.cardIO.canScan()
            .then((resp) => {
            if (resp) {
                return this.cardIO.scan(options)
                    .then((resp) => {
                    this.creditCard.card_mask = resp.cardNumber;
                    this.creditCard.cc_exp_month = resp.expiryMonth;
                    this.creditCard.cc_exp_year = resp.expiryYear;
                    let thisCardType = this.creditCardService.getCardType(resp.cardType);
                    this.creditCard.cc_type_id = thisCardType.cc_type_id;
                    // this.creditCard.billing_first_name = resp.cardholderName.substring(0, resp.cardholderName.indexOf(' '));
                    // this.creditCard.billing_last_name = resp.cardholderName.substring(resp.cardholderName.indexOf(' ') + 1);
                    this.creditCard.billing_zip = resp.postalCode;
                    this.creditCardForm.markAsDirty();
                });
            }
        });
    }
};
AddAuthorizedotnetCardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'pbm-add-authorizedotnet-card',template:/*ion-inline-start:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/credit-cards/authorizedotnet/add-authorizedotnet-card/add-authorizedotnet-card.component.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{ \'CREDITCARDS.PAGETITLES.ADDCARD\' | translate }}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <form [formGroup]="creditCardForm">\n    <!-- Authorize.Net -->\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.ALIAS\' | translate }}</ion-label>\n      <ion-input type="text" formControlName="alias" [(ngModel)]="creditCard.alias"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.FIRSTNAME\' | translate }}</ion-label>\n      <ion-input type="text" formControlName="billing_first_name" [(ngModel)]="creditCard.billing_first_name" placeholder=""></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.LASTNAME\' | translate }}</ion-label>\n      <ion-input type="text" formControlName="billing_last_name" [(ngModel)]="creditCard.billing_last_name" placeholder=""></ion-input>\n    </ion-item>\n    \n    <!-- credit card number -->\n    <div class="wrapper">\n      <ion-item>\n        <ion-label floating>{{ \'CREDITCARDS.LABELS.CARDNUMBER\' | translate }}</ion-label>\n        <ion-input type="text" formControlName="cc_mask" [(ngModel)]="creditCard.cc_mask"></ion-input>\n      </ion-item>\n      <a class="icon-button" (click)="scan()">\n        <ion-icon name="camera"></ion-icon>\n      </a>\n    </div>\n\n    <!-- expiration date -->\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.EXPIRATIONDATE\' | translate }}</ion-label>\n      <ion-datetime \n        displayFormat="MM/YY"\n        pickerFormat="MM/YYYY"\n        min="2017"\n        max="2031" \n        formControlName="cc_exp_date"\n        (ionChange)="setExpirationDate($event)">\n      </ion-datetime>\n    </ion-item>\n        \n    <!-- cvv -->\n    <div class="wrapper">\n      <ion-item>\n        <ion-label floating>{{ \'CREDITCARDS.LABELS.SECURITYCODE\' | translate }}</ion-label>\n          <ion-input type="password" formControlName="cvv" [(ngModel)]="creditCard.cvv"></ion-input>\n      </ion-item>\n      <a class="icon-button" (click)="showCVVInfo()">\n        <ion-icon name="help-circle"></ion-icon>\n      </a>\n    </div>\n\n    <!-- zip code -->\n    <ion-item>\n      <ion-label floating>{{ \'CREDITCARDS.LABELS.ZIPCODE\' | translate }}</ion-label>\n      <ion-input type="text" formControlName="billing_zip" [(ngModel)]="creditCard.billing_zip"></ion-input>\n    </ion-item>\n  </form>\n</ion-content>\n\n<ion-footer no-border>\n  <ion-toolbar>\n    <button ion-button round (click)="cancel()" color="danger">{{ \'CREDITCARDS.BUTTONS.CANCEL\' | translate }}</button>\n    <button ion-button round (click)="save()">{{ \'CREDITCARDS.BUTTONS.SAVE\' | translate }}</button>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/jasonhammond/Documents/CiteWrite/CiteWrite-PayByMobile/src/app/credit-cards/authorizedotnet/add-authorizedotnet-card/add-authorizedotnet-card.component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_5__shared_services_creditCard_service__["a" /* CreditCardService */],
        __WEBPACK_IMPORTED_MODULE_6__shared_services_messaging_service__["a" /* MessagingService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_card_io__["a" /* CardIO */],
        __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */]])
], AddAuthorizedotnetCardComponent);

//# sourceMappingURL=add-authorizedotnet-card.component.js.map

/***/ })

},[242]);
//# sourceMappingURL=main.js.map