import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {geBlogDetail,updateReadCount} from '../../api/index'
@Component({
  selector: 'app-blogdetail',
  templateUrl: './blogdetail.component.html',
  styleUrls: ['./blogdetail.component.less']
})
export class BlogdetailComponent implements OnInit {
  blogid=0;
  readcount=0;
  blogDetail:any={};
  htmlStr:any ='';
  data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.'
  ];
  constructor(public route:ActivatedRoute,public router:Router) {

   }

  ngOnInit(): void {
    this.route.queryParams.subscribe((res)=>{
      console.log('this is the blog id at blog detail' + res.id)
      this.blogid = res.id
     
      this.geBlogDetail(this.blogid)
    })
  }
  async geBlogDetail(id){
   
    const result = await geBlogDetail(id);
  
    if((result as any).code === 200){
      this.blogDetail =(result as any).data
    
      this.htmlStr =(result as any).data.content
    }else{
      this.blogDetail = {};
      this.htmlStr = 'Sorry we can not find this article';
    }
   

  }
  goBack():void{
    window.history.go(-1)
  
  }
  onValueChange(value: Date): void {
  
  }

  onPanelChange(change: { date: Date; mode: string }): void {

  }
}
