<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card"> </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rights: []
    }
  },
  created() {
    this.getRightList()
  },
  methods: {
    async getRightList() {
      const { data: res } = await this.$http.get('?action=getRightsList')
      console.log(res)
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
}
</style>
