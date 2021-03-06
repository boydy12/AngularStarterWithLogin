import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DbItem } from '../models/dbItem';
import { SearchOptions } from '../models/searchOptions';
import { OrderByOptions } from '../models/orderByOptions';

@Injectable({
  providedIn: 'root'
})
export class GlobalCrudFactoryService {

  constructor() {}

  search<T extends DbItem>(collection: string, searchOptions: SearchOptions[], orderByOptions?: OrderByOptions, limit?: number) : Observable<T[]> {
    return of([]);
  }

  get<T extends DbItem>(collection: string) : Observable<T[]> {
    return of([]);
  }

  add<T extends DbItem>(collection: string, obj: T) : Observable<T> {
    return of(null);
  }

  edit<T extends DbItem>(collection: string, obj: T) : Observable<T> {
    return of(null);
  }

  delete<T extends DbItem>(collection: string, obj: T) : Observable<void> {
    return of();
  }

}
