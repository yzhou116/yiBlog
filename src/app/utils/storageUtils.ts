import store from 'store'
const USER_INFO = 'user_key';
const Photo_INFO = 'photo_key';
/*包含 n 个操作 local storage 的工具函数的模块 */

export default{
    saveUser(user){
        store.set(USER_INFO,user);
    },
    getUser(){
        return store.get(USER_INFO) || {}
    },
    removeUser(){
        store.remove(USER_INFO);
    },
    savePhoto(photo){
        store.set(Photo_INFO,photo);
    },
    getPhoto(){
        return store.get(Photo_INFO) || {}
    },
    removePhoto(){
        store.remove(Photo_INFO);
    },
    getAuth0User(){
        return  sessionStorage.getItem('userEmail');
    },
    getAuth0AccessToken(){
        return  sessionStorage.getItem('accessToken');
    },
    removeAuth0User(){
        sessionStorage.removeItem("userEmail")
        sessionStorage.removeItem("accessToken")
    },
}