<template>
  <el-row type="flex" justify="space-between" align="middle" class="header">
      <i class="el-icon-back" @click="handleToggle"></i>
      <div>Admin</div>
  </el-row>
</template>

<script>
export default {
    methods:{
        handleToggle:function(){
            //触发菜单展开事件
            this.$emit("onchange");
        }
    }
}
</script>

<style> 
    .header{
        height: 60px;
    }

    .el-icon-back{
        cursor: pointer;
    }
</style>