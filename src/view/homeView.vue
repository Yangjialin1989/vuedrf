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
                    <el-input v-model="inputSearch" placeholder="查询条件" style="width: 320px;"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-button-group>
                    <el-button @click="searchStudent(inputSearch)" type="primary"><el-icon><Search /></el-icon>查询</el-button>
                    <el-button type="primary"><el-icon><Memo /></el-icon>显示全部</el-button>
                    <el-button @click="addStudent()" type="primary"><el-icon><CirclePlus /></el-icon>添加</el-button>
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
            <el-table ref="multipleTableRef" @selection-change="handleSelectionChange"  :data="data1" border style="width: 100%;" flexible>
              <el-table-column type="selection" label="多选" width="40" />
              <el-table-column type="index" label="序号" width="60" />
              <el-table-column  prop="sno" label="学号" width="80" />
              <el-table-column prop="name" label="姓名" width="80" />
              <el-table-column prop="gender" label="性别" width="60" />
              <el-table-column prop="birthday" label="生日" width="120" />
              <el-table-column prop="mobile" label="电话" width="120" />
              <el-table-column prop="email" label="邮箱" width="180" />
              <el-table-column prop="address" label="地址" width="200" />
              <el-table-column prop="image" label="头像" width="60" />
              <el-table-column label="操作" width="140" fixed="right" v-slot="scope">
                  <el-button @click="viewStudent(scope.row)" type="success" :icon="MoreFilled" circle size="small"/>
                  <el-button @click="editStudent(scope.row)" type="primary" :icon="Message" circle size="small"/>
                  <el-button @click="deleteStudent(scope.row)" type="danger" :icon="Delete" circle size="small"/>
              </el-table-column>
            </el-table>


            <el-row>
              <el-col :span="8">
                <el-button @click="studentDeletes()" type="danger" :icon="Delete">批量删除</el-button>
              </el-col>
              <el-col :span="16">
                <div class="demo-pagination-block">
                  <!--                      :page-sizes-->
                  <el-pagination
                      v-model:current-page="currentPage4"
                      v-model:page-size="pageSize4"

                      :small="small"
                      :disabled="disabled"
                      :background="background"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total='totalCount'
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                  />
                </div>
              </el-col>
            </el-row>

            <el-dialog :title="dialogTitle" v-model="dialogVisible" width="50%" :close-on-click-modal="false" @close="closeDialogForm()">
              <el-form ref="studentFormRef" :model="studentForm" :rules="rules" :inline="true" size="small" label-width="110px" label-position="right" style="margin-left: 20px;">
                <el-upload
                    class="avatar-uploader"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :show-file-list="false"
                    :on-success="handleSuccess"
                    :before-upload="beforeAvatarUpload"
                    :on-error="handleError"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>

                <el-form-item label="学号:" prop="sno">
                  <el-input :disabled="isEdit || isView "  v-model="studentForm.sno"  suffix-icon="EditPen" ></el-input>
                </el-form-item>
                <el-form-item label="姓名:" prop="name">
                  <el-input :disabled="isView" v-model="studentForm.name" suffix-icon="EditPen" ></el-input>
                </el-form-item>
                <el-form-item label="性别:" prop="gender">
                  <el-select :disabled="isView" v-model="studentForm.gender" placeholder="Select" style="width:188px;"  size="small">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="生日:" prop="birthday">
                  <el-date-picker format="YYYY/MM/DD"
                                  value-format="YYYY-MM-DD" :disabled="isView"  v-model="studentForm.birthday" type="date" placeholder="请选择日期" style="width: 100%;">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="手机号码:" prop="mobile">
                  <el-input  :disabled="isView" v-model="studentForm.mobile" suffix-icon="EditPen" ></el-input>
                </el-form-item>
                <el-form-item label="邮箱:" prop="email">
                  <el-input  :disabled="isView"  v-model="studentForm.email" suffix-icon="EditPen" ></el-input>
                </el-form-item>
                <el-form-item label="家庭住址:" prop="address">
                  <el-input  :disabled="isView" v-model="studentForm.address" suffix-icon="EditPen" ></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer" style="margin-left: 33%;">
                <el-button @click="closeDialogForm()"  type="info" size="small">取消</el-button>
                <el-button @click="submitForm()" v-show="!isView" type="primary" size="small">确定</el-button>
              </span>
            </el-dialog>


          </el-main>
              </el-container>
      </el-container>
      <el-footer>学生信息管理系统 版权所有：Yang | 2024-05-19 </el-footer>

    </el-container>
  </div>
</template>


<script setup>
import {ref, reactive, toRefs, onMounted} from 'vue';
import axios from 'axios';
import {Delete, Edit, Message, MoreFilled} from "@element-plus/icons-vue";
import {ElMessage, ElMessageBox} from "element-plus";
const input = ref('')
const pageSizeList = ref([1]);
const isCollapse = ref(true);
const inputSearch = ref('查询内容');
const dialogVisible = ref(false);
const dialogTitle = ref('');
const isView = ref(false);
const isEdit = ref(false);
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
const multipleTableRef = ref()
const multipleSelection = ref([])
const handleSelectionChange = (val) => {
  //console.log(val.map(obj=>parseInt(obj.sno)))
  multipleSelection.value = val.map(obj=>parseInt(obj.sno))

  console.log(multipleSelection.value)
  //multipleSelection
}
const studentDeletes =()=>{
  //console.log(multipleSelection.value)
  const snos = multipleSelection.value
  console.log(snos.length)
  if(snos.length == 0){
    ElMessage({
      message: '您还没有选择删除的内容！',
      type: 'info',
    })
  }
  if(snos.length > 0){
    ElMessageBox.confirm(
        '您确认删除该数据?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
    )
        .then(() => {
          const snosObj = {
            'snos':snos
          }
          const data = JSON.stringify(snosObj)
          console.log(data,snosObj)
          const config = {
            headers :{
              'Content-Type':'application/json',
              'Authorization': 'Basic dXNlcjAxKzp5amw1NTgwMzA='
            }
          };


          axios
              //.patch('/api/student/viewsets/'+parseInt(row.sno)+'/',data,config)
              .delete(`/api/student/viewsets/bulk_destroy/`, {headers:config.headers,data:data})
              .then(res=>{
                console.log(res)
                if(res.status === 204){
                  ElMessage({
                    message: '数据删除成功！',
                    type: 'success',
                  })
                }
              })
              .catch(err=>{
                ElMessage({
                  message: '数据删除失败！',err,
                  type: 'error',
                })

              })



        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消删除',
          })
        })

  }

}


const searchStudent = async (query)=>{
  console.log(query)
  try {
    const config = {
      headers :{
        'Authorization': 'Basic dXNlcjAxKzp5amw1NTgwMzA='

      }
    };
    //console.log('/api/student/viewsets/?'+query._value)
    const response = await axios.get('/api/student/viewsets/?name='+query,config);
    console.log(response.data)
    //console.log(response)
    ElMessage({
      message: '数据加载成功！',
      type: 'success',
    })
    //this.tableData = response.data.results;
    data1.value = response.data.results;
    totalCount.value = response.data.count


  } catch (error) {
    ElMessage({
      message: error,
      type: 'error',
    })
    console.error(error);
  }
}
//关闭弹出框的表单
const closeDialogForm=()=>{

  studentFormRef.value.resetFields();
  studentForm.value = '';
  dialogVisible.value=false;
  isEdit.value=false;
  isView.value=false;

}



const viewStudent = async(row)=>{
  //console.log(row)
  dialogTitle.value='查看数据'
  isView.value = true;
  dialogVisible.value=true;
  studentForm.value=row;
}

const deleteStudent = async (row)=>{
  ElMessageBox.confirm(
      '您确认删除该数据?',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
  )
      .then(() => {

        const sno = parseInt(row.sno)

        console.log('delete ',sno)
        const config = {
          headers :{
            'Content-Type':'application/json',
            'Authorization': 'Basic dXNlcjAxKzp5amw1NTgwMzA='

          }
        };

        axios
            //.patch('/api/student/viewsets/'+parseInt(row.sno)+'/',data,config)
            .delete('/api/student/viewsets/'+sno+'/',config)
            .then(res=>{
              console.log(res)
              if(res.status === 204){
                ElMessage({
                  message: '数据删除成功！',
                  type: 'success',
                })
              }
            })
            .catch(err=>{
              ElMessage({
                message: '数据删除失败！',err,
                type: 'error',
              })

            })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除',
        })
      })
}


const editStudent = async(row)=>{
  //console.log(row)
  dialogTitle.value='编辑数据'
  isEdit.value=true;
  dialogVisible.value=true;
  studentForm.value=row;
}

const addStudent = async ()=>{
  isEdit.value=false;
  isView.value = false;
  dialogTitle.value='添加数据'
  dialogVisible.value=true;
}
const data1 = ref([])
const currentPage4 = ref(1)
const pageSize4 = ref(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const totalCount = ref(1)
const studentFormRef = ref()
const studentForm = ref({
  sno:'',
  name:'',
  gender:'',
  mobile:'',
  birthday:'',
  email:'',
  address:'',
  image:null
})
const validSno = async(rule,value,callback)=>{
  if(dialogTitle.value ==='编辑数据'){
    callback()
  }
  try {
    const config = {
      headers :{
        'Authorization': 'Basic dXNlcjAxKzp5amw1NTgwMzA=',
        'Content-Tpye':'application/json'
      }
    };

    //console.log('/api/student/viewsets/?'+query._value)
    const response = await axios.post('/api/student/viewsets/',
        {sno:value}

    ,config);
    //console.log(response.data)
    //console.log(response)
    ElMessage({
      message: '数据加载成功！',
      type: 'success',
    })
    //this.tableData = response.data.results;
    data1.value = response.data.results;
    totalCount.value = response.data.count
    callback()

  } catch (error) {
    // ElMessage({
    //   message: JSON.parse(error.request.response).sno[0],
    //   type: 'error',
    // })
    //学号唯一性验证
    if('sno' in JSON.parse(error.request.response)){
      callback(new Error(JSON.parse(error.request.response).sno[0]));
    } else{
      callback()

    }

  }

}
const rules=ref({
  sno:[
    {validator:validSno,trigger: 'blur'},
    {pattern:/^[9][5]\d{3}$/,message:'学号必须是95开头的五位数字',trigger: blur},
    {required:true,message:'学号不能为空。',trigger:'blur'},

  ],
  name:[
    {required:true,message:'姓名不能为空。',trigger:'blur'},
    {pattern:/^[\u4e00-\u9fa5]{2,5}$/,message: '姓名必须是2-5个汉字',trigger: 'blur'}
  ],
  gender:[
    {required:true,message:'性别不能为空。',trigger:'change'}
  ],
  birthday:[
    {type:'date',required:true,message:'生日不能为空。',trigger:'change'},

  ],
  mobile:[
    {required:true,message:'手机号不能为空。',trigger:'blur'},
    {pattern:/^[1][356789]\d{9}$/,message: '请输入正确的手机号',trigger: 'blur'}
  ],
  email:[
    {required:true,message:'邮箱不能为空。',trigger:'blur'},
    {pattern:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,message: '请输入正确的邮箱',trigger: 'blur'}
  ],
  address:[
    {required:true,message:'住址不能为空。',trigger:'blur'},
  ]
})




const handleSizeChange = (val) => {
  console.log(`page_size=${val} `)
  queryPage.value = 'page=1'
  queryPageSize.value =  `page_size=${val}`

  fetchData(queryPage,queryPageSize)
}
const handleCurrentChange = (val) => {
  //console.log(`page=${val}`)
  queryPage.value = `page=${val}`

  fetchData(queryPage,queryPageSize)
}



const queryPage = ref('page=1')
const queryPageSize = ref('page_size=10')

// 用户名和密码
const username = 'user01+';
const password = 'yjl558030';

// 创建Base64编码的认证字符串
const credentials = `${username}:${password}`;
const fetchData = async (queryPage,queryPageSize) => {

  try {
    const config = {
      headers :{
        'Authorization': 'Basic dXNlcjAxKzp5amw1NTgwMzA='

      }
    };
    //console.log('/api/student/viewsets/?'+query._value)
    const response = await axios.get('/api/student/viewsets/?'+queryPage._value+'&'+queryPageSize._value,config);
    //console.log(response.data)
    //console.log(response)
    ElMessage({
      message: '数据加载成功！',
      type: 'success',
    })
    //this.tableData = response.data.results;
    data1.value = response.data.results;
    totalCount.value = response.data.count


  } catch (error) {
    ElMessage({
      message: error,
      type: 'error',
    })
    //console.error(error);
  }
};

onMounted(()=>{
  fetchData(queryPage,queryPageSize)

}
)


// const submitForm = async ()=>{
//   await studentFormRef.value?.validate().catch(err=>{
//     ElMessage.error('表单效验失败')
//     throw err
//   })
//   console.log(studentForm)
// }
const submitForm = ()=>{

  studentFormRef.value.validate((valid,fields)=>{

    if(valid){

      if(dialogTitle.value ==='添加数据'){

        //添加
        submitAddStudent()

      }
      if(dialogTitle.value ==='编辑数据'){
        //修改
        submitEditAddStudent()

      }
    }else{
      console.log('error')
      return false
    }
  })
}
//添加数据
const submitAddStudent= ()=>{
  const row = studentForm.value
  const data = JSON.stringify(row)
  console.log('end submit',data)
  const config = {
    headers :{
      'Content-Type':'application/json',
      'Authorization': 'Basic dXNlcjAxKzp5amw1NTgwMzA='

    }
  };

  axios
      .post('/api/student/viewsets/',data,config)
      .then(res=>{
        if(res.status === 201){
          ElMessage({
            message: '数据添加成功！',
            type: 'success',
          })
        }
      })
      .catch(err=>{
        console.log('添加失败',err)
      })


}

//修改数据
const submitEditAddStudent= ()=>{
  const row1 = studentForm.value
  //sno=parseInt(row.sno)
  const sno = parseInt(row1.sno)

  const data = JSON.stringify(row1)
  console.log('end submit',data)
  const config = {
    headers :{
      'Content-Type':'application/json',
      'Authorization': 'Basic dXNlcjAxKzp5amw1NTgwMzA='

    }
  };

  axios
      //.patch('/api/student/viewsets/'+parseInt(row.sno)+'/',data,config)
      .patch('/api/student/viewsets/'+sno+'/',data,config)
      .then(res=>{
        console.log(res)
        if(res.status === 200){
          ElMessage({
            message: '数据修改成功！',
            type: 'success',
          })
        }
      })
      .catch(err=>{

        console.log('数据修改失败',err)
      })
}

const imageUrl = ref('')

const handleSuccess = (response,file,fileList) => {
  console.log('图片上传成功',response)
}

const handleError=(err, file, fileList)=> {
  console.error('图片上传失败', err);
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
.el-dialog .avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.el-dialog .avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-dialog .avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-dialog .el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>