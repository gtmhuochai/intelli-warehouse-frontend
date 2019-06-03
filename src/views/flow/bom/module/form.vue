<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="订单号">
        <el-input v-model="form.orderCode" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="行号">
        <el-input v-model="form.fentryid" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="制造商ID">
        <el-input v-model="form.supplierId" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="手工单创建仓库ID">
        <el-input v-model="form.storageId" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="状态">
        <el-input v-model="form.status" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="是否隐藏">
        <el-input v-model="form.hidden" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="类型">
        <el-input v-model="form.type" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="操作类型">
        <el-input v-model="form.operateType" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="form.time" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="订单类型">
        <el-input v-model="form.productType" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="生产车间">
        <el-input v-model="form.workshop" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="是否边出库边装车">
        <el-input v-model="form.isComposite" style="width: 370px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/bom'

export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      form: {
        id: '',
        orderCode: '',
        fentryid: '',
        supplierId: '',
        storageId: '',
        status: '',
        hidden: '',
        type: '',
        operateType: '',
        remark: '',
        time: '',
        productType: '',
        workshop: '',
        isComposite: ''
      },
      rules: {}
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.loading = true
      if (this.isAdd) {
        this.doAdd()
      } else {
        this.doEdit()
      }
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        id: '',
        orderCode: '',
        fentryid: '',
        supplierId: '',
        storageId: '',
        status: '',
        hidden: '',
        type: '',
        operateType: '',
        remark: '',
        time: '',
        productType: '',
        workshop: '',
        isComposite: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
