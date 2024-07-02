<script setup>
import { ref,computed } from 'vue'
import Disk from './Disk.vue'
import control from './control.vue'
import ProgressBar from './ProgressBar.vue'
import { onMounted } from 'vue'
import { mapState, mapMutations } from "vuex"; //mapState 是便于书写 状态
import { useStore } from 'vuex';
const store = useStore();
// const isVisible = computed(() => store.state.isbool);

// // 你可以根据需要在任意合适的时机调用此函数，例如响应用户点击事件
// const triggerDelayedHide = () => {
//   store.dispatch('delayToggleBool');
// };

</script>

<template>
  <!-- v-show="store.state.isbool " -->
<div class="login">
   <div class="player_disk"><Disk /> 
   <div  id="player" class="player" :class="{ player_two: store.state.isPlaying||store.state.isbool}">      
    <div class="player_control" style="position: absolute;"> <control/></div>
 <div class="player_progress"   style="position: absolute;"> <ProgressBar/></div>
   </div>
</div>

</div>
</template>

<style scoped>


</style>
