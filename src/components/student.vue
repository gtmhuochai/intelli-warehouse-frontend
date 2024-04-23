<script setup>
import { onMounted, reactive, ref } from 'vue'
import request from '../api'
import { ElNotification } from 'element-plus'
const tableData = ref([])
const formType = ref('create')
const show = ref(false)
const form = ref({ name: '', age: undefined })
const total = ref(0)
const searchData = reactive({
    page: 1,
    limit: 5
})
const selectPage = async () => {
    const res = await request({ url: '/api/student/page', method: 'GET', params: searchData })
    total.value = res.data.data.total
    tableData.value = res.data.data.list
}
const submitForm = async () => {
    let url = '/api/student/update'
    if (formType.value == 'update') {
        url = '/api/student/update'
    } else if (formType.value == 'create') {
        url = '/api/student/add-object'
    }
    const res = await request({ url: url, method: 'POST', data: form.value })
    ElNotification({
        title: res.data.code != 0 ? 'Error' : 'Success',
        message: res.data.msg,
        type: res.data.code != 0 ? 'error' : 'success',
    })
    show.value = false
    await selectPage()
}
const deleteStudent = async (id) => {
    const res = await request({ url: '/api/student/delete', method: 'POST', data: { id } })
    ElNotification({
        title: res.data.code != 0 ? 'Error' : 'Success',
        message: res.data.msg,
        type: res.data.code != 0 ? 'error' : 'success',
    })
    await selectPage()
}
const open = async (type, id) => {
    show.value = true
    formType.value = type
    form.value = { name: '', age: undefined }
    if (id) {
        const res = await request({ url: '/api/student/get-by-id', method: 'GET', params: { id } })
        form.value = res.data.data

    }
}
onMounted(() => {
    selectPage()
})
</script>
<template>
    <el-row>
        <el-col :span="12"><el-button @click="selectPage">查询</el-button></el-col>
        <el-col :span="12"><el-button @click="open('create')">添加</el-button></el-col>
    </el-row>
    <el-row>
        <el-table :data="tableData" :style="{ width: '100%' }">
            <el-table-column prop="id" label="序号" width="180" />
            <el-table-column prop="name" label="姓名" width="180" />
            <el-table-column prop="age" label="年龄" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button @click="deleteStudent(scope.row.id)">删除</el-button>
                    <el-button @click="open('update', scope.row.id)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="searchData.page" v-model:page-size="searchData.limit"
            :page-sizes="[5, 10, 20, 40]" background layout="total, sizes, prev, pager, next, jumper" :total="total"
            @size-change="handleSizeChange" @current-change="selectPage" />
    </el-row>
    <el-dialog v-model="show" title="学生添加">
        <main>
            <el-form ref="formRef" :model="form" label-width="auto">
                <el-form-item label="姓名"><el-input v-model="form.name" placeholder="请输入姓名" /></el-form-item>
                <el-form-item label="年龄"><el-input v-model="form.age" placeholder="请输入年龄" /></el-form-item>
            </el-form>
        </main>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="show = false">取消</el-button>
                <el-button type="primary" @click="submitForm">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>