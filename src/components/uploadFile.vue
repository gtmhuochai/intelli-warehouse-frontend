<template>
    <h3>文件上传演示</h3>
    <form action="/api/uploadFile" method="post" enctype="multipart/form-data">
        <input type="file" name="file" />
        <input type="submit" value="文件上传" />
    </form>

</template>
<script setup>

</script>