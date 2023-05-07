import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFilters, defaultFilters } from '../models/filters.interface';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  currentFilters: BehaviorSubject<IFilters> = new BehaviorSubject(defaultFilters);
  constructor() { }
}
