import { Injectable } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {BehaviorSubject, filter, map} from "rxjs";
import {RouteDataModel} from "../../model/route-data.model";

@Injectable({
  providedIn: 'root'
})
export class RouteDataService {
  private dataSubject = new BehaviorSubject<RouteDataModel>({});

  data$ = this.dataSubject.asObservable();

  constructor(private router: Router, private route: ActivatedRoute) {
    // Listen to route changes and update title & subtitle
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let activeRoute = this.route.firstChild;
        while (activeRoute?.firstChild) {
          activeRoute = activeRoute.firstChild;
        }
        return activeRoute?.snapshot.data || {};
      })
    ).subscribe(data => {
      this.updateData({
        title: data['title'] || '',
        subtitle: data['subtitle'] || ''
      })
    });
  }

  updateData(data: RouteDataModel) {
    this.dataSubject.next(data);
  }
}
