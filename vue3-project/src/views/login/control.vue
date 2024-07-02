<template>
    <div class="control" :class="{ control__playing:isPlaying}">
      <div class="control_btn control_btn__side" @click="handlePrev">
        <el-icon><DArrowLeft/></el-icon>   
      </div>
      <div class="control_btn" @click="handlePlay">
        <span class="play-btn" />
      </div>
      <div class="control_btn control_btn__side" @click="handleNext">
        <el-icon><DArrowRight /></el-icon>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapMutations } from "vuex";
  import { player } from "@/player";
  import {DArrowRight,DArrowLeft} from '@element-plus/icons-vue'
  export default {
    components: {
        DArrowRight,DArrowLeft
        },
    computed: {
      ...mapState(["isPlaying"])
    },
    methods: {
      ...mapMutations(["togglePlay"]),
      handlePrev() {
        if (this.isPlaying) {
          player.prev();
        }
      },
      handlePlay() {
        if (!player.isEmpty) {
          if (!this.isPlaying) {
            player.play();
          } else {
            player.pause();
          }
        }
        else{
          alert("请加入音乐")
        }
      },
      handleNext() {
        if (this.isPlaying) {
          player.next();
        }
      }
    }
  };

  </script>
  
  <style scoped>
  .control {
    display: flex;
    justify-content: space-around;
    align-items: center;
  
    height: 100%;
    position: relative;
  }
  
  .control_btn {
    color: #aaa;
    font-size: 16px;
    border-radius: 4px;
    width: 40px;
    height: 40px;
  
    /* 为了让control_btn里的 字体图标 居中对齐 */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .control_btn:hover {
    background-color: #aaa;
    color: white;
  }
  .control_btn__side {
    font-size: 16px;
  }
  
  .play-btn {
    display: inline-block;
    position: relative;
    left: 2px;
  
    width: 20px;
    height: 20px;
  }
  .play-btn::before {
    content: "";
    position: absolute;
  
    width: 0;
    height: 0;
  
    border: 14px solid transparent;
    border-top-width: 10px;
    border-bottom-width: 10px;
    border-left-color: #aaa;
  
    transition: all 0.2s ease;
  }
  .play-btn::after {
    content: "";
    position: absolute;
  
    width: 0;
    height: 20px;
  
    border: 0 solid transparent;
    border-width: 0 0 0 6px;
    border-left-color: #aaa;
  
    transition: all 0.2s ease;
  
    opacity: 0;
    transform: scale(0);
  }
  .control_btn__side {
  font-size: px;
}
  .control__playing .play-btn::before {
    border-width: 0 0 0 6px;
    height: 20px;
    left: 8px;
  }
  .control__playing .play-btn::after {
    opacity: 1;
    transform: scale(1);
  }
  .control_btn:hover .play-btn::before {
    border-left-color: white;
  }
  .control_btn:hover .play-btn::after {
    border-color: white;
  }
  .el-icon{
   flex: 1.2    ;
  }
  </style>