<template>
    <el-dialog v-model="dialogVisible" title="Page editor" :destroy-on-close="true" @open="loadMenus" :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form ref="dataEditorFormRef" :model="formData" label-width="120px">
            <el-form-item label="ID" prop="_id" >
                <el-input v-model="formData['_id']" :disabled="true"/>
            </el-form-item>
            <el-form-item label="Name" prop="name" required>
                <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item label="Description" prop="description">
                <el-input v-model="formData.description" />
            </el-form-item>
            <el-form-item label="Menu" prop="menu" >
                <el-select v-model="formData.menu" clearable>
                    <el-option v-for="menu in menus" :key="menu['_id']" :label="menu.name" :value="menu['_id']" />
                </el-select>
            </el-form-item>
            <el-form-item label="Icon"  prop="icon" >
                <lc-icon-picker v-model="formData.icon" />
            </el-form-item>
            <el-form-item label="Sequence"  prop="sequence" >
                <el-input-number v-model="formData.sequence" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="submitForm(dataEditorFormRef)">
                    Save
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script lang="ts" setup>
import { ref, watch, inject,onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
const globalContext=inject('globalContext')


//Show this dialog
//data:data to fill into form(Do not use ref or reactive to wrap)
//callback:once data is saved,this function will be called with updated formData
function show(data: object, callback: Function) {

    formData.value = data
    callbackSaved = callback;
    dialogVisible.value = true
}

//Whether the dialog is show or hide
const dialogVisible = ref(false)
//data of the form
const formData = ref({})
//Save the callback of funciton call
let callbackSaved: Function;
//
const dataEditorFormRef = ref<FormInstance>()
//
const appContext = inject('appContext')
//
const menus = ref([])
// watch(
//     () => appContext.key.value,
//     () => {
//         loadMenus();
//     },
//     { immediate: true }
// )
// //
// onMounted(()=>loadMenus())

//Load menu list
function loadMenus() {
    if (!appContext.key.value) {
        //maybe it is NOT finish initiation 
        return
    }
    globalContext.request({
        method: "GET",
        url: "menu/query",
        params: {
            app: appContext.key.value
        }
    }).then(function (response) {
        menus.value = response.list || []
    });
}


//
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            //
            dialogVisible.value = false
            //
            if (callbackSaved) {
                callbackSaved(formData.value)
            }
        }
    })
}


//
defineExpose({ show })
</script>
<style scoped></style>
  