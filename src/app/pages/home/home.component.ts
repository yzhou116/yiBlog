import { Component, OnInit,NgModule } from '@angular/core';
import { Router ,NavigationExtras} from '@angular/router';
import {CommonModule} from '@angular/common'
import {getAllBlog,getArticleByUserId,getBlogEditor} from '../../api/index';
import {PAGE_SIZE,LIMIT_COUNT} from '../../utils/constants'
import storageUtils from 'src/app/utils/storageUtils';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// @NgModule({
//   imports:[
//     CommonModule
//   ],
//   declarations: [HomeComponent]
// })
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  editUserImg:string='';
public Editor:any = ClassicEditor;

  blogList=[];//文章列表
  htmlList = [];
  hotBlogList=[];//热门文章
  total=0;//总文章条数
  data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.'
  ];
  constructor(public router:Router) { 
    let urlParams = new URLSearchParams(window.location.search);
    let accessToken = urlParams.get('accessToken');
    let userEmail = urlParams.get('userEmail');
    
    if (accessToken) {
      sessionStorage.setItem('accessToken', accessToken);
    }
    
    if (userEmail) {
      sessionStorage.setItem('userEmail', userEmail);
    }

    let newURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
    history.replaceState({}, null, newURL);


  }

  ngOnInit(): void {
    this.getAllBlog(1);
    this.getHotBlog();
  
    
    

  }
  //分页获取文章
  async getAllBlog(pageNum){
    debugger;
    const result = await getAllBlog(pageNum,PAGE_SIZE);
  
    this.blogList = (result as any).data.content;
    this.total =  (result as any).data.pageable.pageNumber + 1
    this.htmlList = (result as any).message.list
  }
  //获取热门文章
  async getHotBlog(){
    //const result = await getHotArticle(LIMIT_COUNT);
    debugger;
    var user = storageUtils.getUser();
    if(user.id != null){
      const result = await getArticleByUserId(user.id);
      this.hotBlogList =(result as any).data 
    }else{
      this.hotBlogList = []
    }

  }
  //获取当前的页码
  getPage(pageNum){
  
    this.getAllBlog(pageNum)
  }
  //跳转到文章详情
  goBlogDetail(id):void{
  
    let queryParams:NavigationExtras={
      queryParams:{'id':id}
    }

    this.router.navigate(['/blogdetail'],queryParams)
  }
  async getBlogEditor(){
    const result = await getBlogEditor('Jeslie He');
    
    this.editUserImg = (result as any).message[0].image;
   
  }
  goGithub(){
    window.open('https://github.com/yzhou116')
  }
  goLinkdin(){
    window.open('https://www.linkedin.com/in/john-zhou-66388799/')
  }

}
