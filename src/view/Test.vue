

<template>
<div>
  <div>{{obj.name}}</div>
  <button @click="inc">sss{{obj.age}}</button>
</div>
</template>
<script setup>
import {reactive} from "vue";

const obj = reactive({
  name:'狗蛋',age:12
})
const inc =()=>{
  obj.age++
}
</script>

<style scoped>

</style>