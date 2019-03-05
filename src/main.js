import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 1.引入axios
import axios from 'axios';
//引入vue-router
import VueRouter from "vue-router";

//导入
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Goodslist from "./pages/goods/GoodsList"
import Categorylist from "./pages/category/CategoryList"
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
    {path: "category-list", component: Categorylist, meta: "栏目列表"}
  ]

}
]
//创建路由对
const router=new VueRouter({routes});
// 2.把axios绑定到vue实例的属性$axios
Vue.prototype.$axios = axios;

new Vue({
  //挂到根实例.........
  router,
  render: h => h(App),
}).$mount('#app')