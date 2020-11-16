import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { switchMap, tap, take } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Consumable } from '../models/consumable.model';
import { Observable, BehaviorSubject, from, of } from 'rxjs';
import { remove } from 'lodash-es';
import { CrudFactoryService } from '../factories/crud-factory.service';

@Injectable({
  providedIn: 'root'
})
export class ConsumableService {

  public consumables = new BehaviorSubject<Consumable[]>([]);

  constructor(
    private crudFactory: CrudFactoryService,
    private userService: UserService
  ) { }

  getConsumables(): Promise<Consumable[]> {
    return this.userService.getUserB$()
      .pipe(
        switchMap((user: User) => {
          return this.crudFactory.get<Consumable>(user.Id, "consumables");
        }),
        take(1),
        tap(consumables => this.consumables.next(consumables)),
    ).toPromise();
  }

  addConsumable(consumable: Consumable): Promise<Consumable> {
    let allConsumables = this.consumables.getValue();
    if(allConsumables == null) {
      allConsumables = [];
    }
    return this.userService.getUserB$()
      .pipe(
        switchMap((user: User) => {
          return this.crudFactory.add<Consumable>(user.Id, "consumables", consumable).pipe(
            tap((consumable: Consumable) => {
              allConsumables.push(consumable);
              this.consumables.next(allConsumables);
            })
          );
      })
    ).toPromise();
  }

  deleteConsumable(consumable: Consumable): Promise<void> {
    let allConsumables = this.consumables.getValue();
    if(allConsumables == null || allConsumables.length == 0) {
      return of(null).toPromise();
    }
    return this.userService.getUserB$()
      .pipe(
        switchMap((user: User) => {
          return from(this.crudFactory.delete<Consumable>(user.Id, "consumables", consumable))
            .pipe(
              tap(() => {
                remove(allConsumables, { Id: consumable.Id });
                this.consumables.next(allConsumables);
              })
            );
      })
    ).toPromise();
  }

  editConsumable(consumable: Consumable): Promise<Consumable> {
    return this.userService.getUserB$()
      .pipe(
        switchMap((user: User) => {
          return from(this.crudFactory.edit<Consumable>(user.Id, "consumables", consumable))
      })
    ).toPromise();
  }

}
