<script>
import { RouterLink } from 'vue-router';
import Header from './header.vue'
export default{
  data(){
    countdata:0;
  },

  methods:{
    hander(ccount){
      this.countdata=ccount
      console.log(this.countdata)
    }
  }
}
</script>

<template>
<div>
    <el-container>
      <h1>{{id }}</h1>
      <el-header>
        <Header msg="zxl love lwx"
        @handeremit="hander"
        :count="pcount"
        ></Header>
      </el-header>
      <el-main>
       
            <router-view />
      </el-main>
    </el-container>
</div>
</template>

<style scoped>

</style>
