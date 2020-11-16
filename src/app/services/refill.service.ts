import { Injectable } from '@angular/core';
import { BehaviorSubject, of, from } from 'rxjs';
import { UserService } from './user.service';
import { Refill } from '../models/refill.model';
import { switchMap, take, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { remove } from 'lodash-es';
import { CrudFactoryService } from '../factories/crud-factory.service';

@Injectable({
  providedIn: 'root'
})
export class RefillService {
  public refills = new BehaviorSubject<Refill[]>([]);

  constructor(
    private crudFactory: CrudFactoryService,
    private userService: UserService
  ) { }

  getRefills(): Promise<Refill[]> {
    return this.userService.getUserB$()
      .pipe(
        switchMap((user: User) => {
          return this.crudFactory.get<Refill>(user.Id, "refills");
        }),
        take(1),
        tap((refills: Refill[]) => this.refills.next(refills)),
    ).toPromise();
  }

  addRefill(refill: Refill): Promise<Refill> {
    let allRefills = this.refills.getValue();
    if(allRefills == null) {
      allRefills = [];
    }
    return this.userService.getUserB$()
      .pipe(
        switchMap((user: User) => {
          return this.crudFactory.add<Refill>(user.Id, "refills", refill).pipe(
            tap((refill: Refill) => {
              allRefills.push(refill);
              this.refills.next(allRefills);
            })
          );
      })
    ).toPromise();
  }

  deleteRefill(refill: Refill): Promise<void> {
    let allRefills = this.refills.getValue();
    if(allRefills == null || allRefills.length == 0) {
      return of(null).toPromise();
    }
    return this.userService.getUserB$()
      .pipe(
        switchMap((user: User) => {
          return from(this.crudFactory.delete<Refill>(user.Id, "refills", refill))
            .pipe(
              tap(() => {
                remove(allRefills, { Id: refill.Id });
                this.refills.next(allRefills);
              })
            );
      })
    ).toPromise();
  }

  editRefill(refill: Refill): Promise<Refill> {
    return this.userService.getUserB$()
      .pipe(
        switchMap((user: User) => {
          return from(this.crudFactory.edit<Refill>(user.Id, "refills", refill))
      })
    ).toPromise();
  }

}
