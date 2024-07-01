import ajax from './ajax'
//const BASE_URL = 'http://54.221.115.66:8080/yiblog-0.0.1-SNAPSHOT';
//const BASE_URL = 'http://18.215.174.101:8080/yiblog-0.0.1-SNAPSHOT';

//const BASE_URL = '/api';
const BASE_URL = 'http://localhost:8080';
//const BASE_URL = 'http://localhost:8080/yiblog-0.0.1-SNAPSHOT';

//登录
export const reqLogin = (userName,password)=>ajax(BASE_URL+'/user/login',{userName,password},'POST');

export const googleLogin = ()=>ajax(BASE_URL+'/user/googlelogin');

//用户注册
export const reqRegister = (userName,password)=>ajax(BASE_URL+'/reqregister',{userName,password},'POST')

//获取所有文章
export const getAllBlog = (page, size)=> ajax(BASE_URL+`/portal/article/list/${page}/${size}`);
//获取对应文章
export const geBlogDetail = (articleId)=> ajax(BASE_URL+`/portal/article/${articleId}`);
//阅读数增加
export const updateReadCount = (readconut,id)=>ajax(BASE_URL+'/readconut',{readconut,id});


//获取热门文章
//export const getHotArticle = (limitcount)=> ajax(BASE_URL+'/getHotArticle',{limitcount});
export const getHotArticle = (author,page,size)=>ajax(BASE_URL+`/portal/article/top`)

export const getArticleByUserId = (userId)=>ajax(BASE_URL+`/portal/article/getbyUserId/${userId}`)

//获取个人博客
//export const getOwnBlog = (author,pageNum,pageSize)=>ajax(BASE_URL+'/getowncontent',{author,pageNum,pageSize})
export const getOwnBlog = (userName,page,size)=>ajax(BASE_URL+`/portal/article/getbyUserName/${userName}/${page}/${size}`)

//文章发表
export const publicArticle=(title,content,labels,type,currentime,userName,cover,userId,state, token)=>ajax(
    BASE_URL+'/admin/article/post',

    {title,content,labels,type,currentime,userName,cover,userId,state},'POST', {'Authorization': `Bearer ${token}`}  );



//文章编辑
export const editArticle = (id,title,content,label,mold,currentime)=>ajax(BASE_URL+'/editarticle',{id,title,content,label,mold,currentime},'POST');

//文章删除
export const deleteArticle=(id,userName)=>ajax(BASE_URL+`/portal/article/deleteOwnArticle/${id}/${userName}`);

//评论发表
//export const publicComment =(blogimg,bloguser,blogid,tousername,status,blogcomment,commentime)=>ajax(BASE_URL+'/commit',{blogimg,bloguser,blogid,tousername,status,blogcomment,commentime},'POST')
 export const publicComment =(comment)=>ajax('/portal/comment/ppp',comment,'POST', {'Authorization': `Bearer `} )
//export const publicComment =(comment)=>ajax('http://18.215.174.101:8080/yiblog-0.0.1-SNAPSHOT/portal/comment/ppp',comment,'POST')

//获取相对于的评论
export const getcommit = (count) =>ajax(BASE_URL+`/portal/comment/listss/${count}`);

export const getComments = () => ajax('/portal/comment/list')

//修改用户信息

export const changeUserInfo = (username,birthday,location,information,realname,job,sex)=>ajax(BASE_URL+'/modifyingdata',{username,birthday,location,information,realname,job,sex},'POST');


//修改密码
export const changePassword = (id,changepassword)=>ajax(BASE_URL+'/changepassword',{id,changepassword},'POST')

//图片更改
export const submitImage = (image,username)=>ajax(BASE_URL+'/submitImage',{image,username},'POST');

//文章用户头像修改
export const blogUserImage = (image,username)=>ajax(BASE_URL+'/blogUserImage',{image,username},'POST');


//或者作者头像
export const getBlogEditor=(username)=>ajax(BASE_URL+'/getinfo',{username})