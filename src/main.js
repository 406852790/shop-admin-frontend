// 1.引入axios
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
//引入vue-router
import VueRouter from "vue-router";
import App from './App.vue';
import Admin from "./pages/Admin";
import Categorylist from "./pages/category/CategoryList";
import CategoryAdd from "./pages/category/"
import GoodsEdit from "./pages/goods/GoodsEdit";
import GoodsAdd from "./pages/goods/GoodsAdd";
import Goodslist from "./pages/goods/GoodsList";
//导入
import Login from "./pages/Login"; 


// 注册插件
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.config.productionTip = false;

//配置路由
const routes=[
  {path:"/",redirect:"/admin"},
  {path:"/login",component:Login,meta:"登录页"},
  {path:"/admin",component:Admin,meta:"首页",
  // redirect:"/admin/goods-list",
  children:[
    {path:"goods-list", component:Goodslist,meta:"商品列表"},
    {path: "goods-add", component: GoodsAdd, meta: "添加商品"},
    {path: "goods-edit/:id", component:GoodsEdit,meta:"编辑商品"},
    {path: "category-list", component: Categorylist, meta: "栏目列表"},
    {path:"category-add", component:CategoryAdd, meta:"新增栏目"}
  ]

}
]
//创建路由对
const router=new VueRouter({routes});
// 2.把axios绑定到vue实例的属性$axios
Vue.prototype.$axios = axios;
// 给axios给次请求自动加上域名
axios.defaults.baseURL = 'http://localhost:8899';
new Vue({
  //挂到根实例.........
  router,
  render: h => h(App),
}).$mount('#app')