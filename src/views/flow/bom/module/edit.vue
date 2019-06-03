<template>
  <div>
    <el-button size="mini" type="primary" icon="el-icon-edit" @click="to"/>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './form'
export default {
  components: { eForm },
  props: {
    data: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.form = {
        id: this.data.id,
        orderCode: this.data.orderCode,
        fentryid: this.data.fentryid,
        supplierId: this.data.supplierId,
        storageId: this.data.storageId,
        status: this.data.status,
        hidden: this.data.hidden,
        type: this.data.type,
        operateType: this.data.operateType,
        remark: this.data.remark,
        time: this.data.time,
        productType: this.data.productType,
        workshop: this.data.workshop,
        isComposite: this.data.isComposite
      }
      _this.dialog = true
    }
  }
}
</script>

<style scoped>
  div{
    display: inline-block;
    margin-right: 3px;
  }
</style>
