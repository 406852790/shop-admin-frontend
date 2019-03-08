<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: item.src}" 
      v-for="(item, index) in routeInfo"
      :key="index">
       {{item.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
    computed:{
        routeInfo:function(){
            //获取多个路由记录
            const matched=this.$route.matched;
            //重新生成一个循环
            const newArr =matched.map(v=>{
                return{
                    src:v.path,
                    title:v.meta
                }
            })
            return newArr;
        }
    }

}
</script>
<style scoped>
    .breadcrumb{
        padding-bottom: 20px;
        border-bottom: 1px solid #999;
        margin-bottom: 20px;
    }
</style>

