<template>
    <div>
        <el-row :gutter="20" type="flex">
            <el-col :span="6"><router-link to="/props">组件通信：props</router-link></el-col>
            <el-col :span="6"> <router-link to="/refresh">局部刷新</router-link></el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Home",
    }
</script>

<style scoped>
</style>
