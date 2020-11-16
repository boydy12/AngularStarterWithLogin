import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { switchMap, tap, take } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Consumption } from '../models/consumption.model';
import { Observable, BehaviorSubject, from, of } from 'rxjs';
import { remove } from 'lodash-es';
import { CrudFactoryService } from '../factories/crud-factory.service';
import { Consumable } from '../models/consumable.model';

@Injectable({
  providedIn: 'root'
})
export class ConsumptionService {

  public consumptions = new BehaviorSubject<Consumption[]>([]);

  constructor(
    private crudFactory: CrudFactoryService,
    private userService: UserService
  ) { }

  getConsumptions(): Promise<Consumption[]> {
    return this.userService.getUserB$()
      .pipe(
        switchMap((user: User) => {
          return this.crudFactory.get<Consumption>(user.Id, 'consumptions');
        }),
        take(1),
        tap((consumptions: Consumption[]) => this.consumptions.next(consumptions)),
    ).toPromise();
  }

  addConsumption(consumption: Consumption): Promise<Consumption> {
    let allConsumptions = this.consumptions.getValue();
    if(allConsumptions == null) {
      allConsumptions = [];
    }
    return this.userService.getUserB$()
      .pipe(
        switchMap((user: User) => {
          return this.crudFactory.add<Consumption>(user.Id, 'consumptions', consumption).pipe(
            tap((consumption: Consumption) => {
              allConsumptions.push(consumption);
              this.consumptions.next(allConsumptions);
            })
          );
      })
    ).toPromise();
  }

  deleteConsumption(consumption: Consumption): Promise<void> {
    let allConsumptions = this.consumptions.getValue();
    if(allConsumptions == null || allConsumptions.length == 0) {
      return of(null).toPromise();
    }
    return this.userService.getUserB$()
      .pipe(
        switchMap((user: User) => {
          return from(this.crudFactory.delete<Consumption>(user.Id, "consumptions", consumption))
            .pipe(
              tap(() => {
                remove(allConsumptions, { Id: consumption.Id });
                this.consumptions.next(allConsumptions);
              })
            );
      })
    ).toPromise();
  }

  editConsumption(consumption: Consumption): Promise<Consumption> {
    return this.userService.getUserB$()
      .pipe(
        switchMap((user: User) => {
          return from(this.crudFactory.edit<Consumption>(user.Id, "consumptions", consumption))
      })
    ).toPromise();
  }


}
