import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { switchMap, tap, take } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Event } from '../models/event.model';
import { BehaviorSubject, from, of } from 'rxjs';
import { CrudFactoryService } from '../factories/crud-factory.service';
import { remove } from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class ConsumableEventService {

  public events = new BehaviorSubject<Event[]>([]);

  constructor(
    private crudFactory: CrudFactoryService,
    private userService: UserService
  ) { }

  getEvents(): Promise<Event[]> {
    return this.userService.getUserB$()
      .pipe(
        switchMap((user: User) => {
          return this.crudFactory.get<Event>(user.Id, 'events');
        }),
        take(1),
        tap((events: Event[]) => this.events.next(events)),
    ).toPromise();
  }

  addEvent(event: Event): Promise<Event> {
    let allEvents = this.events.getValue();
    if(allEvents == null) {
      allEvents = [];
    }
    return this.userService.getUserB$()
      .pipe(
        switchMap((user: User) => {
          return this.crudFactory.add<Event>(user.Id, 'events', event).pipe(
            tap((event: Event) => {
              allEvents.push(event);
              this.events.next(allEvents);
            })
          );
      })
    ).toPromise();
  }

  deleteEvent(event: Event): Promise<void> {
    let allEvents = this.events.getValue();
    if(allEvents == null || allEvents.length == 0) {
      return of(null).toPromise();
    }
    return this.userService.getUserB$()
      .pipe(
        switchMap((user: User) => {
          return from(this.crudFactory.delete<Event>(user.Id, "events", event))
            .pipe(
              tap(() => {
                remove(allEvents, { Id: event.Id });
                this.events.next(allEvents);
              })
            );
      })
    ).toPromise();
  }

  editEvent(event: Event): Promise<Event> {
    return this.userService.getUserB$()
      .pipe(
        switchMap((user: User) => {
          return from(this.crudFactory.edit<Event>(user.Id, "events", event))
      })
    ).toPromise();
  }

}
