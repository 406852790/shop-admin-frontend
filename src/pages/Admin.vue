<template>
    <div class="admin-container">
         <el-container>
            <!-- 左侧菜单栏 -->
            <el-aside width="auto">
                <!-- 预留存放logo的位置 -->
                <div class="logo"></div>

                <!-- 菜单栏 -->
                <app-aside :isCollapse="isCollapse"></app-aside>
            </el-aside>

            <!-- 右侧内容区域 -->
            <el-container>
                <!-- 头部 -->
                <el-header>
                    <app-header @onChange="changeCollapse"></app-header>
                </el-header>
                <!-- 主体 -->
                <el-main>
                
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
//引入组件
import Aside from"../components/Aside";
import Header from"../components/Header";
import Breadcrumb from"../components/Breadcrumb";
export default {
    name:"admin-index",
    data(){
        return{
            //控制菜单栏的展开
            isCollapse:false,
        }
    },
    //注册组件
    components:{
        "app-aside":Aside,
        "app-header":Header,
        "breadcrumb": Breadcrumb
    },
    methods:{
        changeCollapse(){
            this.isCollapse=!this.isCollapse;
        }
    }
}
</script>
<style>
    .admin-container{
        position: fixed;
        width: 100%;
        top:0;
        bottom: 0;
    }
    .el-header{
        color: #333;
    }
    .el-aside{
        display: flex;
        flex-direction: column;
    }
    .el-main{
        background-color: #fff;
        color: #333;
    }
    .el-container{
        margin-bottom: 40px;
        height: 100%;
    }
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }
  
    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    .logo{
      height:60px;
      background:#454f5a;
    }
</style>


