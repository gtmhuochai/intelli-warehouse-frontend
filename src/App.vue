<script setup>
import request from './api'
import { useRouter } from 'vue-router'
const router = useRouter()
const logout = async () => {
  const res = await request({ url: '/api/logout', method: 'POST' })
  let data = res.data
  if (data.code == 0) {
    router.push({ name: 'login' })
  }
}
</script>

<template>
  <h1>欢迎使用演示系统</h1>
  <div><el-button @click="logout">注销</el-button></div>
  <router-view></router-view>
</template>

<style scoped></style>
