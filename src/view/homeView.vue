<!--<script setup>-->

<!--</script>-->
<template>
  <div class="app">
    <el-container>
      <el-header>学生信息管理系统</el-header>
      <el-container>
        <el-aside style="width:150px;float: left">
          <el-radio-group v-model="isCollapse" style="">
            <el-radio-button :value="false">展开</el-radio-button>
            <el-radio-button :value="true">收起</el-radio-button>
          </el-radio-group>
          <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              :collapse="isCollapse"
              @open="handleOpen"
              @close="handleClose"
          >

              <el-menu-item index="1">
                <el-icon><Wallet /></el-icon>
                <template #title>班级管理</template>
              </el-menu-item>
            <el-menu-item index="2">
              <el-icon><Collection /></el-icon>
              <template #title>学生信息</template>
            </el-menu-item>
            <el-menu-item index="3" >
              <el-icon><document /></el-icon>
              <template #title>讲师信息</template>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon><setting /></el-icon>
              <template #title>课程管理</template>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
              <el-breadcrumb-item>学生信息</el-breadcrumb-item>
            </el-breadcrumb>
            <el-form :inline="true" style="margin: 20px 0px;">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="请输入查询条件:">
                    <el-input placeholder="查询条件" style="width: 320px;"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-button-group>
                    <el-button type="primary"><el-icon><Search /></el-icon>查询</el-button>
                    <el-button type="primary"><el-icon><Memo /></el-icon>显示全部</el-button>
                    <el-button type="primary"><el-icon><CirclePlus /></el-icon>添加</el-button>
                  </el-button-group>
                </el-col>
                <el-col :span="2">
                  <el-upload>
                    <el-button type="primary">导入Excel</el-button>
                  </el-upload>
                </el-col>
                <el-col :span="2">
                  <el-button type="primary">导出Excel</el-button>
                </el-col>
              </el-row>
            </el-form>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column type="selection" label="多选" width="40" />
              <el-table-column type="index" label="序号" width="60" />
              <el-table-column  prop="SNo" label="学号" width="80" />
              <el-table-column prop="SName" label="姓名" width="80" />
              <el-table-column prop="Gender" label="性别" width="60" />
              <el-table-column prop="Birthday" label="生日" width="100" />
              <el-table-column prop="Mobile" label="电话" width="120" />
              <el-table-column prop="Email" label="邮箱" width="180" />
              <el-table-column prop="Address" label="地址" width="200" />
              <el-table-column prop="Image" label="头像" width="60" />
              <el-table-column label="操作" width="140" >
                <el-button type="success" :icon="Edit" circle size="small"/>
                <el-button type="primary" :icon="Message" circle size="small"/>
                <el-button type="danger" :icon="Delete" circle size="small"/>
              </el-table-column>
            </el-table>


            <el-row>
              <el-col :span="8">
                <el-button type="primary"><el-icon><Search /></el-icon>批量删除</el-button>
              </el-col>
              <el-col :span="16">
                <div class="demo-pagination-block">

                  <el-pagination
                      v-model:current-page="currentPage4"
                      v-model:page-size="pageSize4"
                      :page-sizes="[100, 200, 300, 400]"
                      :small="small"
                      :disabled="disabled"
                      :background="background"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="400"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                  />
                </div>
              </el-col>
            </el-row>


          </el-main>
              </el-container>
      </el-container>
      <el-footer>学生信息管理系统 版权所有：Yang | 2024-05-19 </el-footer>

    </el-container>
  </div>
</template>


<script setup>
import { ref, reactive, toRefs } from 'vue';
import {Delete, Edit, Message} from "@element-plus/icons-vue";
const input = ref('')
const isCollapse = ref(true)
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
const tableData = [
  {
    "SNo": 95008,
    "SName": "王文涛",
    "Gender": "女",
    "Birthday": "9/3/1995",
    "Mobile": "18238391838",
    "Email": "65212321@qq.com",
    "Address": "上海市徐汇区龙海路104号",
    "Image": null
  },
  {
    "SNo": 95009,
    "SName": "刘惠文",
    "Gender": "男",
    "Birthday": "12/3/1995",
    "Mobile": "16396584525",
    "Email": "5785624@qq.com",
    "Address": "上海市虹桥区西洪路222号",
    "Image": null
  },
  {
    "SNo": 95010,
    "SName": "陈凯",
    "Gender": "男",
    "Birthday": "4/11/1995",
    "Mobile": "14512545412",
    "Email": "75846521@qq.com",
    "Address": "上海市高新区大东路265号",
    "Image": null
  },
  {
    "SNo": 95011,
    "SName": "王云",
    "Gender": "女",
    "Birthday": "3/5/1994",
    "Mobile": "15545677894",
    "Email": "96856542@qq.com",
    "Address": "北京市昌平区致富路635号",
    "Image": null
  },
  {
    "SNo": 95012,
    "SName": "沈飞",
    "Gender": "男",
    "Birthday": "4/2/1996",
    "Mobile": "13645632548",
    "Email": "75842562@qq.com",
    "Address": "沈阳市大东区和平路858号",
    "Image": null
  }
]
const currentPage4 = ref(4)
const pageSize4 = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}
</script>
<style scoped>
/* 确保布局样式生效，可以添加!important来确保 */


.app,.el-container {
  height: 100%;
}
.el-header{
  background-color: #B3C0D1;
  color: white;
  text-align: center;
  line-height: 60px;
}
.el-footer {
  background-color: #B3C0D1;
  color: white;
  text-align: center;
  line-height: 60px;

    position: fixed;
    bottom: 0;
    width: 100%;
    /* 其他样式，比如高度、背景色、边框等 */
    height: 50px;

    border-top: 1px solid #e7e7e7;

}
.el-aside {
  background-color: #E9EEF3;
height:1000px;overflow: hidden;
}
.el-main {
  background-color: #E9EEF3;
  height:1000px;overflow: hidden;



}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>