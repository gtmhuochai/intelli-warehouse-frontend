<script setup>
import { reactive, ref } from 'vue'
import request from '../api'
const props = defineProps({ url: String, title: String, method: { type: String, default: 'POST' } })
const msg = ref('')
const student = ref({ name: '', age: '0' })
const form = reactive({ name: '', age: undefined })
const add = () => {
    let data = props.method === 'POST' ? { url: props.url, method: 'post', data: form } : { url: props.url, method: 'get', params: form }
    request(data).then(res => {
        let data = res.data
        if (data.code !== 0) {
            msg.value = data.data
        } else {
            msg.value = data.msg
            student.value = data.data
        }

    }).catch(error => {
        msg.value = error
    })
}
</script>

<template>
    <h3>{{ props.title }}</h3>
    <div>消息：{{ msg }} 姓名：{{ student.name }}</div>
    <el-form ref="formRef" :model="form" label-width="auto">
        <el-form-item label="姓名"><el-input v-model="form.name" placeholder="请输入姓名" /></el-form-item>
        <el-form-item label="年龄">
            <el-input v-model="form.age" placeholder="请输入年龄" />
        </el-form-item>
        <el-form-item><el-button @click="add">新增</el-button></el-form-item>
    </el-form>
</template>

<style scoped></style>
