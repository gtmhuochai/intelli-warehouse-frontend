<template>
  <div class="head-container">
    <!-- 搜索 -->
    <el-input
      v-model="query.value"
      clearable
      placeholder="输入搜索内容"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="toQuery"/>
    <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
      <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
    </el-select>
    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <eForm ref="form" :is-add="true" :sup_this="sup_this"/>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission' // 权限判断函数
import eForm from './form'

export default {
  components: { eForm },
  props: {
    query: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      queryTypeOptions: [
        { key: 'id', display_name: 'ID' },
        { key: 'orderCode', display_name: '订单号' },
        { key: 'productType', display_name: '订单类型' },
        { key: 'workshop', display_name: '生产车间' }
      ]
    }
  },
  methods: {
    checkPermission,
    toQuery() {
      this.sup_this.page = 0
      this.sup_this.init()
    }
  }
}
</script>
