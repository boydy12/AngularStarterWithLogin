
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { switchMap, tap, take } from 'rxjs/operators';
import { User } from '../models/user.model';
import { from } from 'rxjs';
import { CrudFactoryService } from '../factories/crud-factory.service';
import { DbItem } from '../models/dbItem';
import { SearchOptions } from '../models/searchOptions';
import { GlobalCrudFactoryService } from '../factories/global-crud-factory.service';
import { OrderByOptions } from '../models/orderByOptions';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private crudFactory: CrudFactoryService,
    private globalCrudFactory: GlobalCrudFactoryService,
    private userService: UserService
  ) { }

  getGlobal<T extends DbItem>(collection: string): Promise<T[]> {
    return this.userService.getUserB$()
      .pipe(
        switchMap((user: User) => {
          return this.globalCrudFactory.get<T>(collection);
        }),
        take(1),
    ).toPromise();
  }

  searchGlobal<T extends DbItem>(collection: string, searchOptions: SearchOptions[], orderByOptions?: OrderByOptions, limit?: number): Promise<T[]> {
    return this.userService.getUserB$()
      .pipe(
        switchMap((user: User) => {
          return this.globalCrudFactory.search<T>(collection, searchOptions, orderByOptions, limit);
        }),
        take(1),
    ).toPromise();
  }

  addGlobal<T extends DbItem>(obj: T, collection: string): Promise<T> {
    return this.userService.getUserB$()
      .pipe(
        switchMap((user: User) => {
          return this.globalCrudFactory.add<T>(collection, obj);
      })
    ).toPromise();
  }

  deleteGlobal<T extends DbItem>(obj: T, collection: string ): Promise<void> {
    return this.userService.getUserB$()
      .pipe(
        switchMap((user: User) => {
          return from(this.globalCrudFactory.delete<T>( collection, obj));
      })
    ).toPromise();
  }

  editGlobal<T extends DbItem>(obj: T, collection: string): Promise<T> {
    return this.userService.getUserB$()
      .pipe(
        switchMap((user: User) => {
          return from(this.globalCrudFactory.edit<T>(collection, obj))
      })
    ).toPromise();
  }



  get<T extends DbItem>(collection: string): Promise<T[]> {
    return this.userService.getUserB$()
      .pipe(
        switchMap((user: User) => {
          return this.crudFactory.get<T>(user.Id, collection);
        }),
        take(1),
    ).toPromise();
  }

  search<T extends DbItem>(collection: string, searchOptions: SearchOptions[], orderByOptions?: OrderByOptions, limit?: number): Promise<T[]> {
    return this.userService.getUserB$()
      .pipe(
        switchMap((user: User) => {
          return this.crudFactory.search<T>(user.Id, collection, searchOptions, orderByOptions, limit);
        }),
        take(1),
    ).toPromise();
  }

  add<T extends DbItem>(obj: T, collection: string): Promise<T> {
    return this.userService.getUserB$()
      .pipe(
        switchMap((user: User) => {
          return this.crudFactory.add<T>(user.Id, collection, obj);
      })
    ).toPromise();
  }

  delete<T extends DbItem>(obj: T, collection: string ): Promise<void> {
    return this.userService.getUserB$()
      .pipe(
        switchMap((user: User) => {
          return from(this.crudFactory.delete<T>(user.Id, collection, obj));
      })
    ).toPromise();
  }

  edit<T extends DbItem>(obj: T, collection: string): Promise<T> {
    return this.userService.getUserB$()
      .pipe(
        switchMap((user: User) => {
          return from(this.crudFactory.edit<T>(user.Id, collection, obj))
      })
    ).toPromise();
  }

}
