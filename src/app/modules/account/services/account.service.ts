import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMenuItem } from '../models/menu-item.interface';
import { MENU_ITEMS } from '../models/menu-items';

@Injectable()
export class AccountService {
  activeMenuItem: BehaviorSubject<IMenuItem> = new BehaviorSubject(MENU_ITEMS[0]);
  constructor() { }
}
