import { PermitType } from './../interfaces/permitType.interface';
import { PermitTime } from './../interfaces/permitTime.interface';
import { Injectable } from '@angular/core';
import { HttpService } from "./http.service";
import { LoggingService } from "./logging.service";
import { Permit } from '../interfaces/permit.interface';
import { HttpRequestObject } from "../classes/httpRequest.class";

@Injectable()
export class PermitService {
    private body = new HttpRequestObject();
    private permits: Permit[];
    private permit: Permit;
    private permitType: PermitType;
    private baseUrl: string = '/permits';
  
    constructor(private httpService: HttpService, private loggingProvider: LoggingService) {}

    meteredPermit(space:number):Promise<Permit>{
      this.body.url = this.baseUrl + '/types?space='+space+'&metered=';
      return this.httpService.load(this.body)
        .then((resp) => {
          return resp.permits[0];
        });
    } 
    
    permitDetails(permitTypeId:number):Promise<PermitType>{
      this.body.url = this.baseUrl + '/types/' + permitTypeId;
      return this.httpService.load(this.body)
        .then((resp) => {
          return resp;
        });
    }


    activePermitsList():Promise<Permit[]> {
      this.body.url = this.baseUrl;

      return this.httpService.load(this.body)
          .then((response) => {
              if(response.success){
                  return response.permits;
              } else {
                  return [];
              }
          })  
          .catch((err) => {
              return err;
          });
    }

    availablePermitsList():Promise<Permit[]> {
      this.body.url = `${this.baseUrl}/types`;

      return this.httpService.load(this.body)
          .then((response) => {
              if(response.success){
                  return response.permits;
              } else {
                  return [];
              }
          })  
          .catch((err) => {
              return err;
          });
    }
    
    updatePermit(params:any):Promise<any> {
      this.body.data = params;
      this.body.url = `${this.baseUrl}/${params.mpermit_id}`;

      return this.httpService.create(this.body)
        .then((response) => {
          if(response.success){
            let foo = response;
          }else{

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

  newPermit():Permit{
		let newP = <Permit>{};
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

    public setPermits(permits: Permit[]): boolean {
        this.permits = permits;
        return true;
      }
    
      public getPermits(): Permit[] {
        return this.permits;
      }
    
      public setPermit(permit: Permit): boolean {
        this.permit = permit;
        return true;
      }
    
      public getPermit(): Permit {
        return this.permit;
      }
    
      public setPermitType(permitType: PermitType): boolean {
        this.permitType             = permitType;
        this.permit.mpermit_type_id = this.permitType.mpermit_type_id;
        this.permit.type            = this.permitType;
        return true;
      }
    
      public getPermitType(): PermitType {
        return this.permitType;
      }

  /*
  readPermit(id?: string): Observable<Permit[]> {
    //TODO : Add your extra header and HTTP options
    this.headers = new Headers({'Content-Type': 'application/json'});
    this.options = new RequestOptions({headers: this.headers});

    if (id !== null) {
      return this.http.get(`${this.baseUrl}/` + id, this.options)
                 .map(this.extractData)
                 .catch(this.handleError);
    } else {
      return this.http.get(`${this.baseUrl}`, this.options)
                 .map(this.extractData)
                 .catch(this.handleError);
    }
  }

  createPermit(body: Permit): Observable<Permit> {
    //TODO : Add your extra header and HTTP options
    this.headers = new Headers({'Content-Type': 'application/json'});
    this.options = new RequestOptions({headers: this.headers});

    return this.http.post(this.baseUrl, body, this.options)
               .map(this.extractData)
               .catch(this.handleError);
  }

  deletePermit(id: string): Observable<Permit> {
    //TODO : Add your extra header and HTTP options
    this.headers = new Headers({'Content-Type': 'application/json'});
    this.options = new RequestOptions({headers: this.headers});

    return this.http.delete(`${this.baseUrl}/` + id, this.options)
               .map(this.extractData)
               .catch(this.handleError);
  }

  optionsPermit(): Observable<Permit> {
    //TODO : Add your extra header and HTTP options
    this.headers = new Headers({'Content-Type': 'application/json'});
    this.options = new RequestOptions({headers: this.headers});

    return this.http.options(`${this.baseUrl}`, this.options)
               .map(this.extractData)
               .catch(this.handleError);
  }

  public getMeteredPermitsBySpace(space: number) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    this.options = new RequestOptions({headers: this.headers});

    return this.http.get(`${this.baseUrl}/permit/metered?space=` + space, this.options)
               .map(this.extractData)
               .catch(this.handleError);
  }
  */
}