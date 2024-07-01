import { Component, OnInit, NgModule } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import storageUtils from '../../utils/storageUtils'
import { getOwnBlog, getHotArticle, deleteArticle,changeUserInfo } from '../../api/index';
import { PAGE_SIZE, LIMIT_COUNT } from '../../utils/constants'
import { NzMessageService } from 'ng-zorro-antd/message';
// @NgModule({

@Component({
  selector: 'app-myblog',
  templateUrl: './myblog.component.html',
  styleUrls: ['./myblog.component.less']
})
export class MyblogComponent implements OnInit {

  userInfo: object = {};
  blogList = [];//文章列表
  htmlList = [];
  hotBlogList = [];//热门文章
  total = 0;//总文章条数
  isVisible = false;
  username='Jeslie He';
  realname='';
  location='';
  information='';
  birthday='';
  sex='';
  job='222222222'
  userinfo: any = {
    username : "",
    image : "",
    information : ""
  };
  constructor(public router: Router, private message: NzMessageService) { }

  ngOnInit(): void {
  
    const user = storageUtils.getUser();
    const photoUrl = storageUtils.getPhoto();
    const hasValues = (obj) => Object.values(obj).some(v => v !== null && typeof v !== "undefined")
    if(user && user.id){
    
      this.userinfo.username = user.userName
      this.userinfo.image = 'https://nationaltoday.com/wp-content/uploads/2021/03/pig-day-march-1-1.jpg'
      }else if(hasValues(user)  && hasValues(photoUrl)){
        this.userinfo.username = user
        this.userinfo.image = photoUrl
      }
      this.userinfo.information = "This is Google User"


    this.getOwnBlog(1);
    this.getHotBlog();
  }
  //分页获取文章
  async getOwnBlog(pageNum) {
 
    const result:any = await getOwnBlog(this.userinfo.username, pageNum, PAGE_SIZE);
   // var obj = JSON.parse(result);
 
  
    if(result.code === 200 ){
      this.blogList = (result as any).data;
      this.total = this.blogList.length/5
  //    this.htmlList = (result as any).message.list
    }else{
      this.blogList = []
      this.total = 0
    //  this.htmlList = []

    }
    
  
  }
  //获取热门文章
  async getHotBlog() {
 
    this.hotBlogList = []
  
  }
  //获取当前的页码
  getPage(pageNum) {

    this.getOwnBlog(pageNum)
  }
  //跳转到文章详情
  goBlogDetail(id): void {
    let queryParams: NavigationExtras = {
      queryParams: { 'id': id }
    }

    this.router.navigate(['/blogdetail'], queryParams)
  }

  createBlog() {
    this.router.navigate(['/publicblog/'])
  }
  async deleteBlog(e, id) {
    e.stopPropagation();
    const result:any = await deleteArticle(id,this.userinfo.username);

    if (result.code === 200) {
      this.blogList = result.data;
      this.message.create('success', 'Delete it');
    } else {
      this.message.create('error', "Fail");
    }
  }
  editBlog(e, id) {
    e.stopPropagation();
    let queryParams: NavigationExtras = {
      queryParams: { 'id': id }
    }

    this.router.navigate(['/publicblog'], queryParams)
  }
  showEditModal(){
    this.isVisible = true;
  }

 async changeUserInfo(){
   this.isVisible = false;
    const result:any = await changeUserInfo(this.username,this.birthday,this.location,this.information,this.realname,this.job,this.sex);
  
    if(result.success_code === 200){
      this.message.create('success', result.message);
      storageUtils.saveUser(result.data[0]);
     
    }else{
      this.message.create('error', result.message);
    }
  }

  handleCancel(): void {
  
    this.isVisible = false;
  }
  
}
