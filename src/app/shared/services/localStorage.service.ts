import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class LocalStorageService {
	constructor(private storage: Storage){}

	public setValue(key: string, value: string): Promise<boolean> {
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

	public getValue(key: string): Promise<string | boolean> {
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
}