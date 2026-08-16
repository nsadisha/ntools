import { RouteDataService } from './route-data.service';
import { ActivatedRoute, NavigationEnd, Router, Event as RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { RouteDataModel } from '../../model/route-data.model';

describe('RouteDataService', () => {
  let events$: Subject<RouterEvent>;

  function createService(route: Partial<ActivatedRoute>): RouteDataService {
    events$ = new Subject<RouterEvent>();
    const routerStub = { events: events$.asObservable() } as Router;
    return new RouteDataService(routerStub, route as ActivatedRoute);
  }

  function latestValue(service: RouteDataService): RouteDataModel {
    let latest!: RouteDataModel;
    service.data$.subscribe(data => (latest = data));
    return latest;
  }

  it('should default title/subtitle/back when there is no matched route data', () => {
    const service = createService({ firstChild: null });

    events$.next(new NavigationEnd(1, '/', '/'));

    expect(latestValue(service)).toEqual({ title: '', subtitle: '', back: false });
  });

  it('should walk to the deepest child route and apply its data', () => {
    const deepest = {
      firstChild: null,
      snapshot: { data: { title: 'Deep Title', subtitle: 'Deep Subtitle', back: true } },
    } as unknown as ActivatedRoute;
    const service = createService({ firstChild: deepest });

    events$.next(new NavigationEnd(1, '/deep', '/deep'));

    expect(latestValue(service)).toEqual({ title: 'Deep Title', subtitle: 'Deep Subtitle', back: true });
  });

  it('should ignore non-NavigationEnd router events', () => {
    const service = createService({ firstChild: null });
    const spy = jasmine.createSpy('subscriber');
    service.data$.subscribe(spy);
    spy.calls.reset();

    events$.next({ id: 1 } as RouterEvent);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should merge partial updates via updateData', () => {
    const service = createService({ firstChild: null });

    service.updateData({ title: 'A' });
    service.updateData({ subtitle: 'B' });

    expect(latestValue(service)).toEqual({ title: 'A', subtitle: 'B' });
  });

  it('should expose only NavigationEnd events via navigationEndData$', () => {
    const service = createService({ firstChild: null });
    const spy = jasmine.createSpy('navEndSubscriber');
    service.navigationEndData$.subscribe(spy);

    events$.next({ id: 1 } as RouterEvent);
    expect(spy).not.toHaveBeenCalled();

    const navEnd = new NavigationEnd(2, '/x', '/x');
    events$.next(navEnd);
    expect(spy).toHaveBeenCalledWith(navEnd);
  });
});
