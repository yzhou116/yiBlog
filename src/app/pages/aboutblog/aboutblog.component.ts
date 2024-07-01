import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NzMessageService } from 'ng-zorro-antd/message';
import { publicComment,getcommit } from '../../api/index';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
interface Comment {
  id: string;
  parentContent: string;
  articleId : string;
  userId : string;
  userAvatar:string;
  userName : string;
  state : string;
  content: string;
  createTime : Date;
  updateTime : Date;
}
@Component({
  selector: 'app-aboutblog',
  templateUrl: './aboutblog.component.html',
  styleUrls: ['./aboutblog.component.less']
})
export class AboutblogComponent implements OnInit {




  comments: Comment[] = [];
  commentSingle : Comment;
 // commentForm: FormGroup;
  public Editor:any = ClassicEditor;

  constructor(private message: NzMessageService,private http: HttpClient) {
    this.commentSingle = {
      id : "",
      parentContent : "",
      articleId : "",
      userId : "",
      userAvatar : "",
      userName : "",
      state : "",
      content : "",
      createTime : new Date(),
      updateTime : new Date()
    }

  }
  
  ngOnInit(): void {
    debugger
    this.getRecords().subscribe(
      data => {
        // Handle the data here
        if(data.message == "Success"){
          data.data.forEach(item => {
            this.comments.push(item)
          });
        
        }
        
      },
      error => {
        // Handle the error here
        console.log('Error:', error);
      }
    );
   
  }

  async getComments(){

 
  }


  getRecords(): Observable<any> {
    //http://localhost:8080/yiblog-0.0.1-SNAPSHOT
   // return this.http.get<any>('http://18.215.174.101:8080/yiblog-0.0.1-SNAPSHOT/portal/usercomment/list').pipe(
    return this.http.get<any>('/portal/usercomment/list').pipe(
      map(res => {
        console.log(res);
      
        return res;
      })
    );
}

  async onAddComment() {
 
    if(!this.commentSingle.content.length){
      this.message.create("error", `Your post can not be empty`);
      return;
    }
   
    let currentDateTime = new Date(); // Get current date and time
    let currentDateTimeString = currentDateTime.toISOString();
    const newComment: Comment = {
      id: 'id' + (this.comments.length + 1),
      parentContent: '', // You may want to set this value based on your needs
      articleId: 'article_id', // You may want to set this value based on your needs
      userId: 'user_id', // You may want to set this value based on your needs
      userAvatar: 'user_avatar', // You may want to set this value based on your needs
      userName: 'Anonymous',
      state: 'state', // You may want to set this value based on your needs
      content: this.commentSingle.content,
    /*   createTime : currentDateTimeString,
      updateTime : currentDateTimeString */
      createTime : currentDateTime,
      updateTime : currentDateTime
    }
    this.comments.push(newComment);
    debugger;
    var res = await publicComment(newComment);


    this.commentSingle.content = "";
    for(var i = 0; i < this.comments.length; i++){
      console.log(JSON.stringify(this.comments[i]))
    }
   

  }

}
