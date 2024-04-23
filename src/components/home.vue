<script setup>
</script>
<template>
    <h2>首页</h2>
    <div><router-link to="/home/simple">参数传递演示</router-link></div>
    <div><router-link to="/home/model">对象传递演示</router-link></div>
    <div><router-link to="/home/validate">服务器校验演示</router-link></div>
    <div><router-link to="/home/upload">文件上传演示</router-link></div>
    <div><router-link to="/home/student">学生管理演示</router-link></div>
    <div>
        <router-view></router-view>
    </div>
</template>