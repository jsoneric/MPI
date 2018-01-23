import {UserClass} from "./user.class";
import {HttpService} from "../services/http.service";
import {HttpServiceMock} from "../../../../test-config/custom-mocks/http.service.mock";
import {LoggingService} from "../services/logging.service";
import {LoggingServiceMock} from "../../../../test-config/custom-mocks/logging.service.mock";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormBuilderMock} from "../../../../test-config/custom-mocks/formBuilder.mock";
import {Vehicle} from "../interfaces/vehicle.interface";

describe('User Class', () => {
	let loggingService: LoggingService;
	let formBuilder: FormBuilder;
	let httpService: HttpService;
	let sampleForm: FormGroup;

	let userClass: UserClass;
	let callback = () => {console.error('error call');};

	beforeEach(() => {
		httpService = HttpServiceMock.instance();
		loggingService = LoggingServiceMock.instance();
		formBuilder = FormBuilderMock.instance();

		userClass = new UserClass(httpService, loggingService);
	});

	describe('properties', () => {
		describe('isLoggedIn property', () => {
			it('should be defined', () => {
				expect(userClass.isLoggedIn).toBeDefined();
			});

			it('should return a boolean', () => {
				expect(typeof userClass.isLoggedIn).toEqual('boolean');
			});

			it('should return false by default', () => {
				expect(userClass.isLoggedIn).toBeFalsy();
			});
		});

		describe('message property', () => {
			it('should be defined', () => {
				expect(userClass.message).toBeDefined();
			});

			it('should return a string', () => {
				expect(typeof userClass.message).toEqual('string');
			});

			it('should return an empty string by default', () => {
				expect(userClass.message).toEqual('');
			});
		});

		describe('vehicleList property', () => {
			it('should be defined', () => {
				expect(userClass.vehicleList).toBeDefined();
			});

			it('should return an object', () => {
				expect(typeof userClass.vehicleList).toEqual('object');
			});

			it('should return an empty array by default', () => {
				expect(userClass.vehicleList.length).toEqual(0);
			});
		});

		describe('token property', () => {
			it('should be defined', () => {
				expect(userClass.token).toBeDefined();
			});

			it('should return a string', () => {
				expect(typeof userClass.token).toEqual('string');
			});

			it('should return an empty string by default', () => {
				expect(userClass.token).toEqual('');
			});
		});
	});

	describe('methods', () => {
		describe('addVehicle method', () => {
			it('should be defined', () => {
				expect(userClass.addVehicle).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof userClass.addVehicle).toEqual('function');
			});

			it('should add the passed vehicle to the list if it is not present', () => {
				let testVehicle: Vehicle = {vehicle_id:1, owner_id:1, license:'', vin:'', make_id:'', color_id:'', state_id:'', create_date:'', update_date:'', type:'', alias:'', extra:[]};
				userClass.addVehicle(testVehicle);
				expect(userClass.vehicleList.length).toEqual(1);
			});

			it('should not add the passed vehicle to the list if it is present', () => {
				httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({
					success:true,
					owner:{owner_id:1, first_name:'', last_name:'', email:''},
					vehicles:[{vehicle_id:1, owner_id:1, license:'', vin:'', make_id:'', color_id:'', state_id:'', create_date:'', update_date:'', type:'', alias:'', extra:[]}]
				}));
				let testVehicle: Vehicle = {vehicle_id:1, owner_id:1, license:'', vin:'', make_id:'', color_id:'', state_id:'', create_date:'', update_date:'', type:'', alias:'', extra:[]};
				userClass.load(1)
					.then(() => {
						userClass.addVehicle(testVehicle);
						expect(userClass.vehicleList.length).toEqual(1);
					});
			});
		});

		describe('save method', () => {
			it('should be defined', () => {
				expect(userClass.save).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof userClass.save).toEqual('function');
			});

			describe('successful calls', () => {
				it('should call the create method of httpService if the userClass has not been initialized', () => {
					userClass.save()
						.then(() => {
							expect(httpService.create).toHaveBeenCalled();
						})
						.catch(callback);
				});

				it('should call the update method of httpService if the userClass has been initialized', () => {
					httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({success:true, owner:{owner_id:1, first_name:'', last_name:'', email:''}}));
					userClass.load(1)
						.then(() => {
							userClass.save()
								.then(() => {
									expect(httpService.update).toHaveBeenCalled();
								})
								.catch(callback);
						})
						.catch(callback);
				});

				it('should return true if the update call to the server succeeds', () => {
					httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({success:true, owner:{owner_id:1, first_name:'', last_name:'', email:''}}));
					httpService.update = jasmine.createSpy('update', () => {}).and.returnValue(Promise.resolve({success:true, owner:{owner_id:1, first_name:'', last_name:'', email:''}}));
					userClass.load(1)
						.then(() => {
							userClass.save()
								.then((res) => {
									expect(res.success).toBeTruthy();
								})
								.catch(callback);
						})
						.catch(callback);
				});

				it('should return true if the create call to the server succeeds', () => {
					httpService.create = jasmine.createSpy('create', () => {}).and.returnValue(Promise.resolve({success:true, owner:{owner_id:1}}));
					userClass.save()
						.then((res) => {
							expect(res.success).toBeTruthy();
						})
						.catch(callback);
				});
			});

			describe('unsuccessful calls', () => {
				it('should return false if the update call to the server does not succeed', () => {
					httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({success:true, owner:{firstName:'', lastName:'', emailAddress:''}}));
					httpService.update = jasmine.createSpy('update', () => {}).and.returnValue(Promise.resolve({success:false}));
					userClass.load(1)
						.then(() => {
							userClass.save()
								.then((res) => {
									expect(res.success).toBeFalsy();
								})
								.catch(callback);
						})
						.catch(callback);
				});

				it('should return false if the create call to the server does not succeed', () => {
					httpService.create = jasmine.createSpy('create', () => {}).and.returnValue(Promise.resolve({success:false}));
					userClass.save()
						.then((res) => {
							expect(res.success).toBeFalsy();
						})
						.catch(callback);
				});
			});

			describe('errors from the server', () => {
				it('should call the create method of httpService if the userClass has not been initialized', () => {
					httpService.create = jasmine.createSpy('create', () => {}).and.returnValue(Promise.reject({msg:'failed call'}));
					userClass.save()
						.catch((err) => {
							expect(err).toContain('failed call');
						});
				});

				it('should call the update method of httpService if the userClass has been initialized', () => {
					httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({success:true, owner:{firstName:'', lastName:'', emailAddress:''}}));
					httpService.update = jasmine.createSpy('update', () => {}).and.returnValue(Promise.reject({msg:'failed call'}));
					userClass.load(1)
						.then(() => {
							userClass.save()
								.catch((err) => {
									expect(err).toContain('failed call');
								});
						})
						.catch(callback);
				});
			});
		});

		describe('load method', () => {
			it('should be defined', () => {
				expect(userClass.load).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof userClass.load).toEqual('function');
			});

			it('should thrown an error if called without an id value', () => {
				expect(() => {userClass.load(null);}).toThrow(new Error('Calling .load on the UserClass requires that a userIdValue be provided!'));
			});

			describe('successful calls', () => {
				it('should call the load method of httpService when called', () => {
					userClass.load(1);
					expect(httpService.load).toHaveBeenCalled();
				});

				it('should return true if the load call to the server succeeds', () => {
					httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({success:true, owner:{firstName:'',lastName:'',emailAddress:''}}));
					userClass.load(1)
						.then((retVal) => {
							expect(retVal.success).toBeTruthy();
						});
				});
			});

			describe('unsuccessful calls', () => {
				it('should return false if the load call to the server fails', () => {
					httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({success:false}));
					userClass.load(1)
						.then((retVal) => {
							expect(retVal.success).toBeFalsy();
						});
				});

				it('should set the value of id to 0 if the load call to the server fails', () => {
					httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({success:false}));
					userClass.load(1)
						.then(() => {
							expect(userClass.owner.owner_id).toEqual(0);
						});
				});
			});

			describe('errors from the server', () => {
				it('should return the error object', () => {
					httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.reject({msg:'failed call'}));
					userClass.load(1)
						.catch((err) => {
							expect(err).toContain('failed call');
						});
				});
			});
		});

		describe('reload method', () => {
			it('should be defined', () => {
				expect(userClass.reload).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof userClass.reload).toEqual('function');
			});

			it('should throw an error if the class is not initialized', () => {
				expect(() => {userClass.reload();}).toThrow(new Error('UserClass is not initialized!'));
			});

			//TODO: I'm not 100% convinced that this is the right way to test this.
			it('should call the load method of HttpService', () => {
				httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({
					success:true,
					owner:{owner_id:1, first_name:'', last_name:'', email:''},
					vehicles:[{vehicle_id:1, owner_id:1, license:'', vin:'', make_id:'', color_id:'', state_id:'', create_date:'', update_date:'', type:'', alias:'', extra:[]}]
				}));
				userClass.load(1)
					.then(() => {
						httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({
							success:true,
							owner:{owner_id:1, first_name:'', last_name:'', email:''},
							vehicles:[
								{vehicle_id:1, owner_id:1, license:'', vin:'', make_id:'', color_id:'', state_id:'', create_date:'', update_date:'', type:'', alias:'', extra:[]},
								{vehicle_id:2, owner_id:1, license:'', vin:'', make_id:'', color_id:'', state_id:'', create_date:'', update_date:'', type:'', alias:'', extra:[]}
								]
						}));
						return userClass.reload();
					})
					.then(() => {
						expect(httpService.load).toHaveBeenCalled();
					});
			});

			describe('successful calls', () => {
				it('should re-populate the class upon success', () => {
					httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({
						success:true,
						owner:{owner_id:1, first_name:'', last_name:'', email:''},
						vehicles:[{vehicle_id:1, owner_id:1, license:'', vin:'', make_id:'', color_id:'', state_id:'', create_date:'', update_date:'', type:'', alias:'', extra:[]}]
					}));
					userClass.load(1)
						.then(() => {
							httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({
								success:true,
								owner:{owner_id:1, first_name:'', last_name:'', email:''},
								vehicles:[
									{vehicle_id:1, owner_id:1, license:'', vin:'', make_id:'', color_id:'', state_id:'', create_date:'', update_date:'', type:'', alias:'', extra:[]},
									{vehicle_id:2, owner_id:1, license:'', vin:'', make_id:'', color_id:'', state_id:'', create_date:'', update_date:'', type:'', alias:'', extra:[]}
								]
							}));
							return userClass.reload();
						})
						.then(() => {
							expect(userClass.vehicleList.length).toEqual(2);
						});
				});
			});

			describe('failed calls', () => {
				it('should not re-populate the class upon failure', () => {
					httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({
						success:true,
						owner:{owner_id:1, first_name:'', last_name:'', email:''},
						vehicles:[{vehicle_id:1, owner_id:1, license:'', vin:'', make_id:'', color_id:'', state_id:'', create_date:'', update_date:'', type:'', alias:'', extra:[]}]
					}));
					userClass.load(1)
						.then(() => {
							httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.reject({success:false}));
							return userClass.reload();
						})
						.catch(() => {
							expect(userClass.vehicleList.length).toEqual(0);
						});
				});
			});
		});

		describe('remove method', () => {
			it('should be defined', () => {
				expect(userClass.remove).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof userClass.remove).toEqual('function');
			});

			it('should thrown an error if called and the class has not been initialized', () => {
				expect(() => {userClass.remove();}).toThrow(new Error('User class has not been initialized to a user instance!'));
			});

			describe('successful calls', () => {
				it('should call the remove method of httpService when called', () => {
					httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({success:true, owner:{owner_id:1, firstName:'',lastName:'',emailAddress:''}}));
					userClass.load(1)
						.then(() => {
							userClass.remove();
							expect(httpService.remove).toHaveBeenCalled();
						});
				});

				it('should return true if the load call to the server succeeds', () => {
					httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({success:true, owner:{owner_id:1, firstName:'',lastName:'',emailAddress:''}}));
					httpService.remove = jasmine.createSpy('remove', () => {}).and.returnValue(Promise.resolve({success:true}));
					userClass.load(1)
						.then(() => {
							userClass.remove()
								.then((retVal) => {
									expect(retVal.success).toBeTruthy();
								});
						});
				});
			});

			describe('unsuccessful calls', () => {
				it('should return false if the load call to the server fails', () => {
					httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({success:true, owner:{owner_id:1, firstName:'',lastName:'',emailAddress:''}}));
					httpService.remove = jasmine.createSpy('remove', () => {}).and.returnValue(Promise.resolve({success:false}));
					userClass.load(1)
						.then(() => {
							userClass.remove()
								.then((retVal) => {
									expect(retVal.success).toBeFalsy()
								});
						});
				});
			});

			describe('errors from the server', () => {
				it('should return the error object', () => {
					httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({success:true, owner:{owner_id:1, firstName:'',lastName:'',emailAddress:''}}));
					httpService.remove = jasmine.createSpy('remove', () => {}).and.returnValue(Promise.reject({msg:'failed call'}));
					userClass.load(1)
						.then(() => {
							userClass.remove()
								.catch((err) => {
									expect(err).toContain('failed call');
								});
						});

				});
			});
		});

		describe('login method', () => {
			beforeEach(() => {
				sampleForm = formBuilder.group({
					j_username:[''],
					j_password:['']
				});
			});

			it('should be defined', () => {
				expect(userClass.login).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof userClass.login).toEqual('function');
			});

			describe('successful calls', () => {
				it('should call the create method of httpService when called', () => {
					httpService.create = jasmine.createSpy('create', () => {}).and.returnValue(Promise.resolve({success:true}));
					userClass.login(sampleForm);
					expect(httpService.create).toHaveBeenCalled();
				});
			});

			describe('unsuccessful calls', () => {
				it('should return false if the create call to the server fails', () => {
					httpService.create = jasmine.createSpy('create', () => {}).and.returnValue(Promise.resolve({success:false, msg:''}));
					userClass.login(sampleForm)
						.then((retVal) => {
							expect(retVal.success).toBeFalsy();
						});
				});
			});

			describe('errors from the server', () => {
				it('should return the error object', () => {
					httpService.create = jasmine.createSpy('create', () => {}).and.returnValue(Promise.reject({msg:'failed call'}));
					userClass.login(sampleForm)
						.catch((err) => {
							expect(err).toContain('failed call');
						});
				});
			});
		});

		describe('signUp method', () => {
			beforeEach(() => {
				sampleForm = formBuilder.group({
					first_name:[''],
					last_name:[''],
					email:[''],
					username:[''],
					password:['']
				});
			});

			it('should be defined', () => {
				expect(userClass.signUp).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof userClass.signUp).toEqual('function');
			});

			describe('successful calls', () => {
				it('should call the create method of httpService when called', () => {
					httpService.create = jasmine.createSpy('create', () => {}).and.returnValue(Promise.resolve({success:true, response:{
						first_name:'',
						last_name:'',
						email_address:'',
						username:'',
						password:''
					}}));
					userClass.signUp(sampleForm);
					expect(httpService.create).toHaveBeenCalled();
				});
			});

			describe('unsuccessful calls', () => {
				it('should return false if the create call to the server fails', () => {
					httpService.create = jasmine.createSpy('create', () => {}).and.returnValue(Promise.resolve({success:false, msg:''}));
					userClass.signUp(sampleForm)
						.then((retVal) => {
							expect(retVal.success).toBeFalsy()
						});
				});
			});

			describe('errors from the server', () => {
				it('should return the error object', () => {
					httpService.create = jasmine.createSpy('create', () => {}).and.returnValue(Promise.reject({msg:'failed call'}));
					userClass.signUp(sampleForm)
						.catch((err) => {
							expect(err).toContain('failed call');
						});
				});
			});
		});

		describe('resetPassword method', () => {
			beforeEach(() => {
				sampleForm = formBuilder.group({
					username:['']
				});
			});

			it('should be defined', () => {
				expect(userClass.resetPassword).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof userClass.resetPassword).toEqual('function');
			});

			it('should call the create method of httpService', () => {
				userClass.resetPassword(sampleForm);
				expect(httpService.create).toHaveBeenCalled();
			});
		});
	});
});