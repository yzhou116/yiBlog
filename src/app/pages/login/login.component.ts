import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { reqLogin,reqRegister,googleLogin } from '../../api/index'
import { Router } from '@angular/router';
import storageUtils from '../../utils/storageUtils'
import {SocialAuthService, SocialUser} from 'angularx-social-login'
import { GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  isLoadingOne = false;
  size: NzButtonSize = 'large';
  username: string = '';
  password: string = '';
  islogin:boolean=true;
  buttonText:string='Log in';
  cardTitle:string='Log in';
  linkText:string='Log in with Google'
  validateForm
  constructor(
    private formBulider: FormBuilder,
    private message: NzMessageService,
    public router: Router,
    private socialAuthService: SocialAuthService
  ) {

    //auth.loginWithRedirect()
    

   }

 
  ngOnInit(): void {
    this.validateForm = this.formBulider.group({
      userName: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }
  // 提交按钮
  async onSubmit() {

    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty()
      this.validateForm.controls[key].updateValueAndValidity()
    }
    // 说明校验成功，可以发送数据请求
    if (this.validateForm.status === 'VALID') {
      this.isLoadingOne = true;
      this.username = this.validateForm.value.userName;
      this.password = this.validateForm.value.password;
      if(this.islogin){
        this.login(this.username, this.password)
      }else{
        this.register(this.username, this.password)
      }
     

    }
  }
  //登录
  async login(userName, password) {

   
  const result = await reqLogin(userName, password);

    if ((result as any).code === 200) {
      storageUtils.removeUser()
      storageUtils.removePhoto()
      storageUtils.saveUser((result as any).data)
    
      this.isLoadingOne = false;
      this.message.create('success', (result as any).message);
      this.router.navigate(['/'])
    } else {
      this.isLoadingOne = false;
      this.message.create('error', 'Log in fail');
    }
  }
  //注册
  async register(userName,password){
    const result = await reqRegister(userName, password);

    if ((result as any).code === 200) {
     
      this.isLoadingOne = false;
      this.message.create('success', (result as any).message);
    } else {
      this.isLoadingOne = false;
      this.message.create('error', (result as any).message);
    }
  }
  async toggleLogin(){
  
     const result = await googleLogin();
 


  }

}



 /*    return;
    this.islogin = !this.islogin
    if(!this.islogin){
      this.buttonText=this.cardTitle = '注册';
      this.linkText = '返回登录'
    }else{
      this.buttonText=this.cardTitle = '登录';
      this.linkText = '暂无账号，去注册'
    } */
