import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutblogComponent } from './pages/aboutblog/aboutblog.component';
import { AboutmeComponent } from './pages/aboutme/aboutme.component';
import { WebexampleComponent } from './pages/webexample/webexample.component';
import { PublicblogComponent } from './pages/publicblog/publicblog.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { HtmlResetPipe } from './pipes/html-reset.pipe';
import { BlogdetailComponent } from './pages/blogdetail/blogdetail.component';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { MyblogComponent } from './pages/myblog/myblog.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { ChangeInfoComponent } from './pages/change-info/change-info.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AuthModule } from '@auth0/auth0-angular';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutblogComponent,
    AboutmeComponent,
    WebexampleComponent,
    PublicblogComponent,
    HtmlResetPipe,
    BlogdetailComponent,
    LoginComponent,
    AdminComponent,
    MyblogComponent,
    ChangeInfoComponent,
    ImageUploadComponent,
  
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzGridModule,
    NzCardModule,
    NzListModule,
    NzTagModule,
    NzPaginationModule,
    NzCalendarModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzMessageModule,
    NzAvatarModule,
    NzModalModule,
    NzDrawerModule,
    NzSelectModule,
    NzEmptyModule,
    NzStepsModule,
    NzTypographyModule,
    NzUploadModule,
    SocialLoginModule,
    CKEditorModule,
    
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('485217524574-vfs04nq7n6g94qli06oaqdr1ujbac073.apps.googleusercontent.com'),
          },
        ],
      } as SocialAuthServiceConfig,
    },

  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
