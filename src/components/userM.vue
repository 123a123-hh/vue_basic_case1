<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <!-- 搜索框和添加用户按钮 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getTheData"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>

      <div>
        <!-- 项目显示列表 -->
        <el-table :data="tableData" stripe style="width: 100%" border>
          <el-table-column type="index"></el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="emil"
            label="邮箱"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="teleNum"
            label="电话"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="role"
            label="角色"
            width="180"
          ></el-table-column>
          <el-table-column prop="status" label="状态" width="180">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-color="#409eff"
                inactive-color="#eaedf1"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="234px">
            <template slot-scope="scope">
              <el-button
                class="edibutton"
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showEditDia(scope.row.name)"
              ></el-button>
              <el-button
                class="edibutton"
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="delete_button_click(scope.row.name)"
              ></el-button>
              <el-tooltip
                content="分配角色"
                placement="top"
                effect="dark"
                :enterable="false"
              >
                <el-button
                  class="edibutton"
                  type="warning"
                  icon="el-icon-setting"
                  size="mini"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <!-- 页码组件 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="2"
          layout="total, sizes, prev, pager, next"
          :total="itemNumAll"
        >
        </el-pagination>
      </div>
    </el-card>

    <!-- 添加用户的对话框 -->
    <el-dialog
      @close="closeDia"
      title="添加用户"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleFormRef"
        label-width="100px"
      >
        <el-form-item label="用户名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="useremil">
          <el-input v-model="ruleForm.useremil"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="telenum">
          <el-input v-model="ruleForm.telenum"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAdd">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      @close="edit_closeDia"
      title="修改用户信息"
      :visible.sync="edit_dialogVisible"
      width="50%"
    >
      <el-form
        :model="edit_ruleForm"
        :rules="edit_rules"
        ref="edit_ruleFormRef"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="edit_ruleForm.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="emil">
          <el-input v-model="edit_ruleForm.emil"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="teleNum">
          <el-input v-model="edit_ruleForm.teleNum"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="edit_dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit_sureAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    // 正则表达式监测邮箱格式是否正确
    var checkEmail = (rule, value, callback) => {
      console.log(value)
      //    验证邮箱的正则表达式
      var regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      } else {
        if (regEmail.test(value)) {
          return callback()
        } else {
          return callback(new Error('请输入合法的邮箱'))
        }
      }
    }
    // 正则表达式监测手机号码格式是否正确
    var checkTeleNum = (rule, value, callback) => {
      //    验证手机的正则表达式
      var regTele = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      } else {
        if (regTele.test(value)) {
          return callback()
        } else {
          return callback(new Error('请输入合法的邮箱'))
        }
      }
    }
    // data返回的项目所需要的变量
    return {
      queryInfo: {
        query: '',
        pageNumber: 1,
        pageItemQuantity: 2
      },
      tableData: [],
      itemNumAll: 0,
      dialogVisible: false,
      edit_dialogVisible: false,
      ruleForm: {
        name: '',
        password: '',
        useremil: '',
        telenum: ''
      },
      edit_ruleForm: {
        name: '',
        emil: '',
        teleNum: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        useremil: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          {
            min: 3,
            max: 25,
            message: '长度在 3 到 25 个字符',
            trigger: 'blur'
          },
          { validator: checkEmail, trigger: 'blur' }
        ],
        telenum: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            min: 3,
            max: 16,
            message: '长度在 3 到 16 个字符',
            trigger: 'blur'
          },
          { validator: checkTeleNum, trigger: 'blur' }
        ]
      },
      edit_rules: {
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        emil: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          {
            min: 3,
            max: 25,
            message: '长度在 3 到 25 个字符',
            trigger: 'blur'
          },
          { validator: checkEmail, trigger: 'blur' }
        ],
        teleNum: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            min: 3,
            max: 16,
            message: '长度在 3 到 16 个字符',
            trigger: 'blur'
          },
          { validator: checkTeleNum, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getTheData('')
  },
  methods: {
    async getTheData() {
      console.log(this.queryInfo)
      var that = this
      //   获取范围是每一页的数据
      var arr1 = await this.$http.get('?action=get_items', {
        params: this.queryInfo
      })
      that.tableData = arr1.data.userdata_items
      //   获取一共有多少条数据
      that.itemNumAll = arr1.data.items_lenght
      console.log(this.tableData)
    },
    // 监听每页显示的项目的条数
    handleSizeChange(size) {
      this.queryInfo.pageItemQuantity = size
      this.getTheData()
    },
    // 页码值发生改变的时候触发
    handleCurrentChange(thePageNum) {
      this.queryInfo.pageNumber = thePageNum
      this.getTheData()
    },
    sureAdd() {
      var that = this
      this.$refs.ruleFormRef.validate((valid) => {
        console.log(valid)
        if (valid) {
          console.log(that.ruleForm)
          this.$http
            .get('?action=insert_a_Item', {
              params: {
                name: that.ruleForm.name,
                youxiang: that.ruleForm.useremil,
                teleNum: that.ruleForm.telenum,
                role: '超级管理员',
                status: 1
              }
            })
            .then(function (resPost) {
              console.log(resPost.data)
              that.dialogVisible = false
              that.getTheData()
            })
        }
      })
    },
    edit_sureAdd() {
      this.edit_dialogVisible = false
      var that = this
      this.$refs.edit_ruleFormRef.validate((valid) => {
        if (valid) {
          var params = new URLSearchParams()
          params.append('name', that.edit_ruleForm.name)
          params.append('emil', that.edit_ruleForm.emil)
          params.append('teleNum', that.edit_ruleForm.teleNum)
          this.$http
            .post('?action=update_a_Item', params)
            .then(function (resPost) {
              console.log(resPost.data)
              that.getTheData()
            })
        }
      })
    },
    closeDia() {
      this.$refs.ruleFormRef.resetFields()
    },
    edit_closeDia() {
      this.$refs.edit_ruleFormRef.resetFields()
    },
    async showEditDia(id) {
      var params = new URLSearchParams()
      params.append('name', id)
      this.edit_dialogVisible = true
      var res = await this.$http.post('?action=get_a_Item', params)
      console.log(res.data.userdata_item[0])
      this.edit_ruleForm = res.data.userdata_item[0]
    },
    delete_button_click(name) {
      this.openTipDia(name)
    },
    openTipDia(name) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delete_the_item(name)
      })
    },
    async delete_the_item(name) {
      var params = new URLSearchParams()
      params.append('name', name)
      var res = await this.$http.post('?action=delete_a_item', params)
      if (res.data === '删除数据成功') {
        this.getTheData()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      } else {
        this.$message({
          type: 'error',
          message: '删除失败!'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-breadcrumb {
  margin: 20px 0px 20px 20px;
  font-size: 15px;
}
.el-card {
  margin-left: 20px;
  margin-right: 20px;
  .el-row {
    margin-bottom: 20px;
  }
  .el-table {
    margin-bottom: 20px;
  }
}
.edibutton {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
