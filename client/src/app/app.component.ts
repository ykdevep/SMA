import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivationEnd, Router } from '@angular/router';

import { routerTransition } from '@app/core/animations/router.transition';
import { environment as env } from '@env/environment';

import { filter } from 'rxjs/operators/filter';
import { distinctUntilChanged } from 'rxjs/operators';

import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})

export class AppComponent implements OnInit {

  envName = env.envName;
  appName = env.appName;
  logged: boolean = false;
  year = new Date().getFullYear();
  isProd = env.production;
  
  constructor(
    private router: Router,
    private titleService: Title,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof ActivationEnd))
      .subscribe((event: ActivationEnd) => {
        let lastChild = event.snapshot;
        while (lastChild.children.length) {
          lastChild = lastChild.children[0];
        }
        const { title } = lastChild.data;
        this.titleService.setTitle(
          title ? `${title} - ${env.appName}` : env.appName
        );
    });

    this.authService.isAuthenticated()
      .pipe(distinctUntilChanged())
      .subscribe(isAuthenticated => {
        this.logged = isAuthenticated
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
