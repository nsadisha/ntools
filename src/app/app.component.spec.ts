import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Subject } from 'rxjs';
import { AppComponent } from './app.component';
import { RouteDataService } from './service/route-data/route-data.service';
import { RouteDataModel } from './model/route-data.model';
import { overrideAsShallow } from './testing/shallow';

describe('AppComponent', () => {
  let dataSubject: Subject<RouteDataModel>;
  let navigationEndSubject: Subject<{ url: string }>;

  beforeEach(async () => {
    dataSubject = new Subject<RouteDataModel>();
    navigationEndSubject = new Subject<{ url: string }>();

    overrideAsShallow(AppComponent);
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        {
          provide: RouteDataService,
          useValue: {
            data$: dataSubject.asObservable(),
            navigationEndData$: navigationEndSubject.asObservable(),
          },
        },
      ],
    }).compileComponents();
  });

  function create() {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('should create the app', () => {
    const fixture = create();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should not display the header until both title and subtitle are set', () => {
    const fixture = create();

    dataSubject.next({ title: 'Title', subtitle: '' });
    expect(fixture.componentInstance.displayHeader).toBe(false);

    dataSubject.next({ title: 'Title', subtitle: 'Subtitle' });
    expect(fixture.componentInstance.displayHeader).toBe(true);
  });

  it('should expose the back flag as an empty string when true, null when false', () => {
    const fixture = create();

    dataSubject.next({ back: true });
    expect(fixture.componentInstance['back']).toBe('');

    dataSubject.next({ back: false });
    expect(fixture.componentInstance['back']).toBeNull();
  });

  it('should report whether a route is currently active', () => {
    const fixture = create();

    navigationEndSubject.next({ url: '/tools' });

    expect(fixture.componentInstance.isRouteActive('/tools')).toBe(true);
    expect(fixture.componentInstance.isRouteActive('/categories')).toBe(false);
  });
});
