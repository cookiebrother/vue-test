<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>登录</span>
      </div>
      <el-form
        ref="loginForm"
        :rules="rules"
        :model="form"
        label-position="left"
        label-width="60px"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            placeholder="请输入账号"
            v-model="form.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            prefix-icon="el-icon-user"
            placeholder="请输入密码"
            v-model="form.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox label="记住密码" v-model="form.isRem"></el-checkbox>
        </el-form-item>
        <el-button-group>
          <el-button type="primary" @click="login" :loading="isLoading"
            >登录</el-button
          >
          <el-button type="primary" @click="reset">重置</el-button>
        </el-button-group>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { api_login } from '../api/admin'

export default {
  data() {
    return {
      isLoading: false,
      form: {
        username: '',
        password: '',
        isRem: false
      },
      rules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login() {
      this.isLoading = true
      //表单验证
      this.$refs.loginForm.validate(async valid => {
        if (!valid) {
          console.log('验证失败!')
          return false
        }
        //提交表单
        const { data: res } = await api_login(
          this.form.username,
          this.form.password
        )
        // console.log(res)
        this.isLoading = false
        if (res.code !== 200) {
          this.$message.error(res.message)
          return true
        }
        const data = res.data
        const token = data.tokenHead + data.token
        //保存token到sessionStrorage
        window.sessionStorage.setItem('token', token)
        //记住密码，将用户密码保存到cookies
        if (this.form.isRem) {
          this.$cookies.set('username', this.form.username, '7D')
          this.$cookies.set('password', this.form.password, '7D')
        } else {
          this.$cookies.remove('username')
          this.$cookies.remove('password')
        }
        this.$router.replace('/home')
      })
    },
    reset() {
      this.$refs['loginForm'].resetFields()
    }
  },
  created() {
    //获取cookies中的值
    this.form.username = this.$cookies.get('username')
    this.form.password = this.$cookies.get('password')
  }
}
</script>

<style scoped>
/*  scoped:表示该组件中的样式只是在当前组件中有效 */
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  margin: auto;
  transform: translateY(50%);
}

.el-button-group {
  width: 100%;
}

.el-button-group > .el-button {
  width: 50%;
}
</style>
