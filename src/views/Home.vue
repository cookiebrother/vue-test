<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <el-aside :width="!menuCollapse ? '200px' : '64px'">
        <!--菜单栏-->
        <el-menu
          @select="selectMenu"
          :default-active="activeMenu"
          router
          :collapse="menuCollapse"
          class="el-menu-vertical-demo"
          background-color="#304156"
          text-color="#9fcbd9"
          active-text-color="#409eff"
        >
          <el-menu-item index="/welcome">首页</el-menu-item>
          <!--一级子菜单-->
          <el-submenu
            :index="formPath(null, item.name)"
            v-for="item in firstMenus"
            :key="item.id"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              class="menu-second"
              :index="formPath(item.name, subItem.name)"
              v-for="subItem in secondMenus(item.id)"
              :key="subItem.id"
            >
              {{ subItem.title }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <!--菜单折叠-->
          <el-button
            :icon="!menuCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
            @click="menuCollapse = !menuCollapse"
          ></el-button>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <el-avatar :src="loginUser.icon"></el-avatar>
              欢迎:{{ loginUser.username }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="change">修改密码</el-dropdown-item>
              <el-dropdown-item command="quit">退出账户</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { api_logout, api_info } from '@/api/admin'

export default {
  data() {
    return {
      menuCollapse: false,
      activeMenu: '',
      loginUser: {
        username: '',
        icon:
          'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      },
      menus: []
    }
  },
  filter: {},
  computed: {
    firstMenus() {
      return this.menus.filter(item => item.parentId === 0)
    },
    secondMenus() {
      return parentId => this.menus.filter(item => item.parentId === parentId)
    }
  },
  // 保存菜单选中的状态
  mounted() {
    this.activeMenu = window.sessionStorage.getItem('activeMenu')
    if (!this.activeMenu) {
      // 如果还没点击过，给一个默认值
      this.activeMenu = '/welcome'
    }
    this.getInfo()
  },
  // 可以监听到路由的任何变化
  watch: {
    $route(to) {
      this.selectMenu(to.path)
    }
  },
  methods: {
    async getInfo() {
      const { data: res } = await api_info()
      if (res) {
        this.loginUser.icon = res.data.icon
        this.loginUser.username = res.data.username
        this.menus = res.data.menus
      }
    },

    selectMenu(index, indexPath) {
      console.log(index)
      console.log(indexPath)
      this.activeMenu = index
      //session获取当前当前菜单路径
      window.sessionStorage.setItem('activeMenu', index)
    },

    handleCommand(command) {
      console.log(command)
      if (command === 'quit') {
        this.handleLogout()
      }
    },
    async handleLogout() {
      const { data: res } = await api_logout()
      console.log(res)
      //退出失败
      if (res.code !== 200) {
        this.$message.error(res.message)
        return
      }
      //退出成功
      //消除session
      window.sessionStorage.clear()
      //页面跳转
      this.$router.replace('/login')
    },
    formPath(folder, name) {
      name = '/' + name
      if (folder) {
        name = '/' + folder + name
      }
      console.log(name)
      return name
    }
  }
}
</script>
<style>
.el-menu {
  border: none;
}
.el-menu > .el-menu-item,
.el-submenu > .el-submenu__title {
  text-align: left;
}
.menu-second {
  background-color: #1f2d3d !important;
}
.menu-second:hover {
  background-color: #001528 !important;
}

.el-header {
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  border-bottom: #e9eef3 solid 1px;
  align-items: center;
}
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #304156;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: left;
}
.el-avatar {
  position: relative;
  top: 12px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
