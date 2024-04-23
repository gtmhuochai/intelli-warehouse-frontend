<script setup>
import request from '../api'
import { reactive, ref } from 'vue'
import userLogin from '../store/login'
import { useRouter } from 'vue-router'

const router = useRouter()
const msg = ref('')
const loginStore = userLogin();
const form = reactive({ username: '', password: '' });
const login = () => {
    $cookies.set('token', 'testToken', { expires: '5D' })
    request({ url: '/api/login', method: 'POST', data: form }).then(res => {
        let data = res.data
        if (data.code == 0) {
            loginStore.isLogin = true
            router.push({ name: 'home' })
        }
        msg.value = data.msg
    })
}
</script>
<template>
    <h2>登录页面</h2>
    <div>消息：{{ msg }}</div>
    <el-form ref="formRef" :model="form" label-width="auto">
        <el-form-item label="用户名"><el-input v-model="form.username" placeholder="请输入用户名" /></el-form-item>
        <el-form-item label="密码">
            <el-input v-model="form.password" type="password" placeholder="请输入" />
        </el-form-item>
        <el-form-item><el-button @click="login">登录</el-button></el-form-item>
    </el-form>
</template>