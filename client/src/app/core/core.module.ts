import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule , HttpHeaders} from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { setContext } from 'apollo-link-context';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { LocalStorageService  } from './services/local-storage.service';
import { RoleGuard } from './guard/role.guard';

import { environment as env } from '@env/environment';


const TOKEN_PREFIX = 'TOKEN';

export function jwtOptionsFactory(tokenService) {
  return {
    tokenGetter: () => {
      return tokenService.getItem(TOKEN_PREFIX);
    }
  }
}


@NgModule({
  imports: [
    CommonModule,
    ApolloModule,
    HttpLinkModule,
    HttpClientModule,

    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [LocalStorageService]
      }
    }),
  ],
  providers: [AuthService, LocalStorageService, JwtHelperService, AuthGuard, RoleGuard],
  declarations: []
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
    public authService: AuthService,
    public apollo: Apollo,
    public httpLink: HttpLink,
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }

    const http = httpLink.create({ uri: env.graphqlUrl });

    const middleware = setContext(() => ({
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}` || null)
    }));
  
    const link = middleware.concat(http);    
  
    apollo.create({
      link: link,
      cache: new InMemoryCache()
    });  
  
  }
}

