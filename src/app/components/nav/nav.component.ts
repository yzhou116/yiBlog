import { Component, OnInit } from '@angular/core';
import storageUtils from '../../utils/storageUtils'
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router} from '@angular/router'
import {SocialAuthService, SocialUser} from 'angularx-social-login'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {
  loginKey:boolean=false;
  userInfo: any = {
    userName : "",
    image : ""
  };
  photo:object={};
  constructor( private message: NzMessageService,public router:Router,
    private socialAuthService: SocialAuthService) {
  
   }

  ngOnInit(): void {
    if(storageUtils.getAuth0User() != null && storageUtils.getAuth0AccessToken()){
      this.userInfo.userName = storageUtils.getAuth0User()
      this.loginKey = true
    }
    
  }

  loginWithRedirect(){
    window.location.href = 'http://localhost:8080/auth0/api/authLogin';
   //window.location.href = 'http://18.215.174.101:8080/yiblog-0.0.1-SNAPSHOT/auth0/api/authLogin';
   }
 
  logout(){
 
    storageUtils.removeAuth0User()

    window.location.href = 'http://localhost:8080/auth0/api/logout';
  // window.location.href = 'http://18.215.174.101:8080/yiblog-0.0.1-SNAPSHOT/auth0/api/logout';
    this.router.navigate(['/'])
    this.message.create('success', 'Log out !');

  }
  goTopublic(){
    debugger;
    const user = storageUtils.getAuth0User();
    const accessToken = storageUtils.getAuth0AccessToken();

    if(user != null && accessToken != null){
   

      this.router.navigate(['/publicblog'])
    }else{
      this.message.create('error', 'Please log in first');
      return
    }


  }
  aboutBlog(){
    this.router.navigate(['/aboutblog'])
  }
  aboutMe(){
    this.router.navigate(['/aboutme'])
  }
  gotoWebExample(){
    window.open('http://42.194.193.249:3240/webExample')
  }

}
