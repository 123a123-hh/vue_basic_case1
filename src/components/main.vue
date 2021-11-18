<template>
  <div id="main_container">
    <el-container class="home_container">
      <el-header>
        <div class="leftHeader">
          <img src="../assets/imgs/PODIA_logo.png" alt="" />
          <span>后台管理系统111</span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- default-active中假设activePath没有值那么默认使用第一个项的index -->
          <el-menu
            :default-active="activePath"
            class="el-menu-vertical-demo"
            :router="true"
          >
            <el-menu-item
              v-for="item in navArr"
              :index="item.id"
              :key="item.id"
              @click="saveNavStatus(item.id, $event)"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{ item.text }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'main_container',
  data () {
    return {
      navArr: [
        {
          id: '1',
          text: '用户管理',
          icon: 'el-icon-user-solid'
        },
        {
          id: '2',
          text: '权限管理',
          icon: 'el-icon-menu'
        },
        {
          id: '3',
          text: '角色管理',
          icon: 'el-icon-s-help'
        },
        {
          id: '4',
          text: '个人中心',
          icon: 'el-icon-document'
        },
        {
          id: '5',
          text: '工作人员',
          icon: 'el-icon-s-custom'
        },
        {
          id: '6',
          text: '临时任务',
          icon: 'el-icon-message-solid'
        },
        {
          id: '7',
          text: '关于',
          icon: 'el-icon-question'
        }
      ],
      //   用户当前所在的路由位置
      activePath: ''
    }
  },
  created () {
    var ii = 11
    this.activePath = window.sessionStorage.getItem('activePath')
    if (this.activePath == null) {
      this.activePath = '1'
    }
  },
  methods: {
    saveNavStatus (status, event) {
      window.sessionStorage.setItem('activePath', status)
      this.activePath = status
      console.log(event)
    }
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        console.log(val.path.slice(val.path.length - 1))
        this.activePath = val.path.slice(val.path.length - 1)
      },
      // 深度观察监听
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
$themeColor: #ffffff;
$themeColor2: #eaedf1;
.el-header,
.el-container,
.el-main,
.el-aside {
  padding: 0;
  margin: 0;
}
#main_container {
  background-color: $themeColor;
  height: 100%;
  .el-header {
    background-color: $themeColor2;
    display: flex;
    justify-content: start;
    .leftHeader {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 50px;
        margin-left: 20px;
        margin-right: 20px;
      }
      span {
        font-weight: bold;
        font-size: 20px;
        color: black;
        align-items: center;
      }
    }
  }
  .el-aside {
    background-color: $themeColor2;
  }
}
.home_container {
  height: 100%;
}
.el-menu {
  background-color: $themeColor2;
}
</style>
