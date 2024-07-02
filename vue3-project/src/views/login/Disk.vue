<template>
  <div class="disk" v-on:mouseleave="handleMouseLeave" v-on:mouseenter="handleMouseEnter" :class="{ disk__playing: isPlaying || isbool}">
    <label
      for="file"
      class="disk_cover"
      ref="cover"
      :style="{
        transform: stopMatrix,
        backgroundImage: coverUrl ? `url(${coverUrl})` : ''
      }"
    ></label>
     <input id="file" type="file" ref="file" accept="music/mp3" multiple @change="handleChange" />
  </div>  
  <el-button  @click="login" class="button" :class="{ button_two: isPlaying || isbool}">进入博客</el-button>
  <!-- <div class="menu_before" :class="{menu:isPlaying || isbool}" >
    <ul v-if="filename.length">
    <li v-for="(file, index) in filename" :key="index"  :class="{ highlighted: index==index2}"
    @click="playSong(index)">
      {{ file.name }}
    </li>
   </ul>
  </div> -->

  </template>
  <script>
 import { mapState, mapMutations } from "vuex"; //mapState 是便于书写 状态
import { player } from "@/player"; // player 播放器
import {routerKey, useRouter} from 'vue-router'
const router = useRouter();
export default {
  mounted() {
    // 给 播放器实例 添加事件监听，togglePlay为播放/暂停  changeCover为切换图片地址
    player.onPlay.push(() => {
      this.togglePlay(true);
    });
    player.onPause.push(() => {
      this.togglePlay(false);
    });
    player.onChange.push(() => {
      this.changeCover(); 
    });
    player.onReady.push(() => {
      this.changeCover();
    });
  },
  data() {
    return {
      stopMatrix: "",
      timeoutId:null,
      filename:[],
      index2:-1,
      
            };
  },
  methods: {
    ...mapMutations(["togglePlay", "changeCover","toggleIsBool"]),
    async handleChange() {
      // this.$refs.file 是 input，type=file，其属性files保存了选的音乐
      const target = this.$refs.file;
      const files = target.files || [];
      if (files.length) {
        for (let i = 0; i < files.length; ++i) {
          await player.append(files[i]); //将音乐添加到 播放器中
          this.filename.push({
        name: files[i].name,
      });
        }
      }     
    },
    musicLoad(e) {
      console.log(e);
    },  
    handleMouseEnter() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this.$store.commit('toggleIsBool', true);
  },
  beforeDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  },
  handleMouseLeave() {
      this.timeoutId = setTimeout(() => {
        this.$store.commit('toggleIsBool', false);
      }, 1000);
    },
 login(){
this.$router.push({path:'./index'});
},
updateAndDisplayPlayIndex() {
  
      console.log('当前播放索引:', this.playerInstance.getplayIndex);
      // 进一步操作...
    },
  },
  computed: {
    // 播放 和 图片url都通过 vuex 管理
    ...mapState(["isPlaying", "coverUrl","isbool"]),
    additionalButtonClass() {
    return this.isPlaying || this.isbool ? 'is-rotated' : '';
  },
  
  },
  
  watch: {

   isbool(val){
    if (!val) {
        // 为 false 时，触发下面
        this.stopMatrix = getComputedStyle(this.$refs.cover).transform;
      } else {
        //为 true 时
        if (this.stopMatrix != "") {
          const matrix = this.stopMatrix;
          this.stopMatrix = "";
          const match = matrix.match(/^matrix\(([^,]+),([^,]+)/);
          let deg = ((Math.atan2(match[2], match[1]) / Math.PI) * 180) % 360;
          const styles = [...document.styleSheets]; //document.styleSheets是 StyleSheetList 类型
          // 因为要改的是 keyframs里的样式，所以从全部的样式中去寻找
          styles.forEach(style => {
            try {
              const rules = [...style.cssRules];
              rules.forEach(rule => {
                // KEYFRAMES_RULE 是 type 7
                if (
                  rule.type === rule.KEYFRAMES_RULE &&
                  rule.name.indexOf("rotateAnima") != -1
                ) {
                  rule.cssRules[0].style.transform = `rotate(${deg}deg)`;
                  rule.cssRules[1].style.transform = `rotate(${deg + 360}deg)`;
                }
              });
            } catch (error) {
              // styles[0]没有cssRules，所以会报错， DOMException: Failed to read the 'cssRules' property from 'CSSStyleSheet': Cannot access rules
            }
          });
        }
      }
   },
    isPlaying(val) {
      if (!val) {
        // 为 false 时，触发下面
        this.stopMatrix = getComputedStyle(this.$refs.cover).transform;
      } else {
        //为 true 时
        if (this.stopMatrix != "") {
          const matrix = this.stopMatrix;
          this.stopMatrix = "";
          const match = matrix.match(/^matrix\(([^,]+),([^,]+)/);
          let deg = ((Math.atan2(match[2], match[1]) / Math.PI) * 180) % 360;
          const styles = [...document.styleSheets]; //document.styleSheets是 StyleSheetList 类型
          // 因为要改的是 keyframs里的样式，所以从全部的样式中去寻找
          styles.forEach(style => {
            try {
              const rules = [...style.cssRules];
              rules.forEach(rule => {
                // KEYFRAMES_RULE 是 type 7
                if (
                  rule.type === rule.KEYFRAMES_RULE &&
                  rule.name.indexOf("rotateAnima") != -1
                ) {
                  rule.cssRules[0].style.transform = `rotate(${deg}deg)`;
                  rule.cssRules[1].style.transform = `rotate(${deg + 360}deg)`;
                }
              });
            } catch (error) {
              // styles[0]没有cssRules，所以会报错， DOMException: Failed to read the 'cssRules' property from 'CSSStyleSheet': Cannot access rules
            }
          });
        }
      }
    }
  }
};

  </script>
  
  <style lang="scss">
 .disk {
  overflow: hidden;
  position: relative;

  /**
  * padding 可以 被子元素当成宽高
  * 且背景也是可以在 padding中显示的
   */
  padding-top: 100%;
  border-radius: 50%;
  left: 8px;
  transform: translateY(-50%) scale(0.8);
  transform-origin: center bottom;
  transition: all 0.6s;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.3), 
  0 10px 25px rgba(23, 24, 24, 0.8);
}
.disk input {
  display: none;
}
.disk_cover {
  position: absolute; 
  /**
  * 4个0 拉伸
   */
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-image: radial-gradient(circle, #444, #333);
  background-position: center;
  background-size: cover;
}
.disk_cover::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-image: linear-gradient(45deg, white, #daada1);
}
.disk__playing {
  transform: translateY(-60%);
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.3), 
    0 10px 25px rgba(11, 207, 241, 0.8);
}
.disk__playing .disk_cover {
  animation: rotateAnima 6s infinite linear;
}
@keyframes rotateAnima {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.button{
display: none;
}
.button_two {
  display: block;
   background-color: #f3d9d1;
  position: absolute; /* 设置为绝对定位，以便脱离文档流并精确控制位置 */
  top: calc(100% + 80px); /* 将按钮置于.disk下方一定距离，根据需要调整 */
  left: 39%; /* 让按钮水平居中 */
  animation: slideDownAnima  3s infinite linear;
  transform: translateY(-70%);
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.3), 
    0 10px 25px rgba(181, 228, 236, 0.8);
    z-index: 1;
}


@keyframes slideDownAnima {
  0%, 100% { /* 循环起始和结束时，元素在正常位置 */
    transform: translateY(0);
  }
  50% { /* 半程时，元素滑动至容器底部之外 */
    transform: translateY(100%);
  }
}
.menu_before{
  display: none;
}
.menu{
opacity: 70%;
  position: relative;
  display: flex;
  max-width: 200px;
  height: 100px;
  overflow: auto;
  background-color: #daada1;
  border-radius: 8px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.3), 
  0 10px 25px rgba(238, 241, 242, 0.8);
  font-size: 13px;
  top: calc(-800%);
  left: 100%;
}
::-webkit-scrollbar {
    width: 4px;
    height: 4px;
}
::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: transparent;
}
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #ccc;
}
.highlighted {
  font-weight: bold;
  color: rgb(19, 11, 11); /* 或其他高亮颜色 */
  /* 可以添加更多样式，如背景颜色、边框等 */
}
  </style>