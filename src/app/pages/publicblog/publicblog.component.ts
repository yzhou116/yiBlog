import { Component, OnInit, } from '@angular/core';
import { publicArticle, geBlogDetail, editArticle } from '../../api/index'
import { NzMessageService } from 'ng-zorro-antd/message';
import storageUtils from '../../utils/storageUtils'
import { Router, ActivatedRoute } from '@angular/router'
//import E from "wangeditor";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

//'../../../node_modules/wangeditor/release/wangEditor.js'这个路径不是固定的 看你创建的组件文件路径 应该比较好找 自己../ 慢慢找 vscode有提示
@Component({
  selector: 'app-publicblog',
  templateUrl: './publicblog.component.html',
  styleUrls: ['./publicblog.component.less']
})
export class PublicblogComponent implements OnInit {
  blogtitle = '';
  blogtype = '';
  blogsort = '';
  blogcontent = '';
  userinfo: any = {
    username : "",
    image : ""
  };
  blogid: any;
  blogDetail: any;
  htmlStr: any;
  public sign = 'wang_editor';
  public Editor:any = ClassicEditor;

  private editor: any;

  // 展示api获取到的数据
  public showMessage = 'Waiting for display';

  // 默认显示
  public defaultMessage = '请输入内容...';

  isVisible: boolean = false;
  constructor(private message: NzMessageService, public router: Router, public route: ActivatedRoute) {

  }


  ngOnInit() {
   

  }


  // 获取编辑器内容，带html
  // 编辑器相关配置设置
  setEditorConfig() {
    // 使用 base64 保存图片
    this.editor.config.uploadImgShowBase64 = true;
    // 菜单展示项配置
    this.editor.config.menus = this.getMenuConfig();
    // 自定义配置颜色（字体颜色、背景色）
    this.editor.config.colors = this.getColorConfig();
    // 表情面板可以有多个 tab ，因此要配置成一个数组。数组每个元素代表一个 tab 的配置
    this.editor.config.emotions = this.getEmotionsConfig();
    // 自定义字体
    this.editor.config.fontNames = this.getFontFamilyConfig();
    // 编辑区域的z-index默认为10000
    this.editor.config.zIndex = 1

  }
  showModal(): void {

  }
  // 获取显示菜单项
  getMenuConfig(): string[] {
    return [
      'bold',  // 粗体
      'italic',  // 斜体
      'underline',  // 下划线
      'head',  // 标题
      'fontName',  // 字体
      'fontSize',  // 字号
      'strikeThrough',  // 删除线
      'foreColor',  // 文字颜色
      'backColor',  // 背景颜色
      'link',  // 插入链接
      'list',  // 列表
      'justify',  // 对齐方式
      'quote',  // 引用
      'emoticon',  // 表情
      'table',  // 表格
      'image',  // 插入图片
      'video',  // 插入视频
      'code',  // 插入代码
      'undo',  // 撤销
      'redo'  // 重复
    ];
  }

  // 获取字体、背景颜色列表配置
  getColorConfig(): string[] {
    return [
      '#707070',
      '#346600',
      '#1c487f',
      '#4d80bf',
      '#c24f4a',
      '#8baa4a',
      '#7b5ba1',
      '#46acc8',
      '#f9963b',
      '#ffffff'
    ];
  }

  // 获取表情配置
  getEmotionsConfig() {
    return [
      {
        // tab 的标题
        title: '默认',
        // type -> 'emoji' / 'image'
        type: 'image',
        // content -> 数组
        content: [
          {
            alt: '[坏笑]',
            src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/50/pcmoren_huaixiao_org.png'
          },
          {
            alt: '[舔屏]',
            src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/pcmoren_tian_org.png'
          }
        ]
      },
      {
        // tab 的标题
        title: 'emoji',
        // type -> 'emoji' / 'image'
        type: 'emoji',
        // content -> 数组
        content: ['😀', '😃', '😄', '😁', '😆']
      }
    ];
  }

  // 获取字体列表配置
  getFontFamilyConfig(): string[] {
    return [
      '宋体',
      '微软雅黑',
      'Arial',
      'Tahoma',
      'Verdana'
    ];
  }

  //发表文章
  showPublicModal() {
    this.isVisible = true;




  }
  async handleOk() {
    let result: any;

    this.isVisible = false;

    if (this.blogtitle == '' || this.blogsort == '' || this.blogtype == '' || this.blogcontent.trim() == '<p><br></p>') {
      this.message.create('error', `Please fill everything out`);
    } else {

        result = await publicArticle(this.blogtitle, this.blogcontent, this.blogsort, this.blogtype, new Date(), this.userinfo.username, this.userinfo.image, storageUtils.getAuth0User(),1,storageUtils.getAuth0AccessToken())
 
      if (result.code === 200) {
      
        this.message.create('success', result.message);

      } else {
        this.message.create('error', result.message);
      }
     
      this.router.navigate(['/'])
    }

  }

  handleCancel(): void {

    this.isVisible = false;
  }
  //如果有id，根据id初始化内容
  async initBlog(id) {

  }
  

}
