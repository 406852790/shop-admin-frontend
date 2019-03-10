<template>

  <div class="category">
    <el-row type="flex" justify="space-between" align="middle" class="mb20">
      <div>
        <el-button @click="handleCategoryAdd">新增</el-button>
      </div>
    </el-row>

    <el-row type="flex" justify="space-brtween" class="tree-header">
      <span>类别</span>
      <span>排序</span>
      <span>操作</span>
    </el-row>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-input size="mini" v-model="data.sort_id" @blur="handleEnter(data)"/>
        </span>
        <span>
          <el-button type="text" size="mini" @click="() => edit(data)">编辑</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
    data(){
        return{
            data:[]
        };
    },
    mounted(){
        this.$axios({
            url:"/admin/category/getlist/goods"
        }).then(res=>{
            let {message}=res.data;
            //重新排序
            message=message.sort((a,b)=>{
                //如果a的category_id大于b的、
                return a.category_id - b.category_id;
            });
            //最终结果的数组
            let arr=[];
            //递归函数
            function loop(arr,item){
                arr.forEach(v=>{
                    //判断，item的id是否和父级的category_id相同
                    //如果相等的话就把item加入到当前分类的children、
                      if(v.category_id==item.parent_id){
                          //判断当前的分类是否有children的属性
                          if(!v.children){
                              //没有的话初始值化为空数组
                              v.children=[];
                          }
                          //加入到当前分类下的children
                          v.children.push({
                              ...item,
                              id:item.category_id,
                              label:item.title
                          });
                          return;
                      };
                      if(v.children){
                          loop(v.children,item);
                      }
                });
            };

            message.forEach(v=>{
                //如果是顶级的分类直接加入到arr
                if(v.parent_id===0){
                    arr.push({
                        ...v,
                        id:v.category_id,
                        label:v.title
                    });

                }else{
                    loop(arr,v);
                }
            });
            this.data=arr;
        });
    },
    methods:{
        edit(data){
            console.log();
        },
        //修改排序回车时候触发的事件
        handleEnter(data){
            //修改排序
            this.$axios({
                method:"POST",
                url:`/admin/category/edit/${data.category_id}`,
                data,
                //处理跨域
                withCredentials:true
            }).then(res=>{
                const{status, message}=res.data;
                if(status==0){
                    this.$message({
                        type:"success",
                        message
                    });
                }
            });
        },

        //跳转到新增栏目页
       handleCategoryAdd(){
           this.$router.push("/admin/category-add");
       }
    }
};
</script>

<style>
.custom-tree-node{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;

}
.category .el-input--mini .el-input__inner{
    width: 80px;
    height: 18px !important;
    line-height: 18px !important;
}
.tree-header{
    background:#fff;
    padding:10px;
}

</style>
