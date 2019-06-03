<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>BOM单列表</span>
            <!-- 新增 -->
            <el-button
              v-if="checkPermission(['ADMIN'])"
              class="filter-item"
              size="mini"
              style="float: right;padding: 4px 10px"
              type="primary"
              icon="el-icon-plus"
              @click="$refs.header.$refs.form.dialog = true">新增
            </el-button>
          </div>
          <eHeader ref="header" :query="query" :sup_this="sup_this"/>
          <!--表格渲染-->
          <el-table
            v-loading="loading"
            :data="data"
            size="small"
            style="width: 100%;"
            @current-change="handleCurrentChange">
            <el-table-column prop="id" label="ID"/>
            <el-table-column prop="orderCode" label="订单号"/>
            <el-table-column prop="productType" label="订单类型"/>
            <el-table-column prop="workshop" label="生产车间"/>
            <el-table-column label="操作" width="150px" align="center">
              <template slot-scope="scope">
                <edit v-if="checkPermission(['ADMIN'])" :data="scope.row" :sup_this="sup_this"/>
                <el-popover
                  v-if="checkPermission(['ADMIN'])"
                  :ref="scope.row.id"
                  placement="top"
                  width="180">
                  <p>确定删除本条数据吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                    <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定
                    </el-button>
                  </div>
                  <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
          <!--分页组件-->
          <el-pagination
            :total="total"
            style="margin-top: 8px;"
            layout="total, prev, pager, next, sizes"
            @size-change="sizeChange"
            @current-change="pageChange"/>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>BOM单详情</span>
            <el-button
              v-if="checkPermission(['ADMIN']) && this.$refs.bomDetail && this.$refs.bomDetail.bomId "
              class="filter-item"
              size="mini"
              style="float: right;padding: 4px 10px"
              type="primary"
              icon="el-icon-plus"
              @click="$refs.bomDetail.$refs.header.$refs.form.dialog = true">新增
            </el-button>
          </div>
          <bom-detail ref="bomDetail"/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del } from '@/api/bom'
import eHeader from './module/header'
import edit from './module/edit'
import bomDetail from '../bomDetail/index'

export default {
  components: { eHeader, edit, bomDetail },
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_this: this
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    checkPermission,
    beforeInit() {
      this.url = 'api/bom'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) {
        this.params[type] = value
      }
      if (this.$refs.bomDetail) {
        this.$refs.bomDetail.data = []
        this.$refs.bomDetail.id = null
      }
      return true
    },
    subDelete(id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        console.log(err.response.data.message)
      })
    },
    handleCurrentChange(val) {
      if (val) {
        const bomDetailRef = this.$refs.bomDetail
        bomDetailRef.bomId = val.id
        bomDetailRef.init()
      }
    }
  }
}
</script>

<style scoped>

</style>
