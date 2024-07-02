import { createStore } from 'vuex';
// 导入图片路径，确保路径和图片在项目中正确
import cover1 from '../assets/cover1.jpg';
import cover2 from '../assets/cover2.jpg';
import cover3 from '../assets/cover3.jpg';

const COVER_URL = [cover1, cover2, cover3];
let coverIndex = 0;
const store = createStore({
  state() {
    return {
      isPlaying: false,
      coverUrl: COVER_URL[coverIndex],
      isbool:false
    };
  },
  mutations: {
    togglePlay(state, payload) {
      state.isPlaying = payload;
    },
    changeCover(state) {
      coverIndex = (coverIndex + 1) % COVER_URL.length;
      state.coverUrl = COVER_URL[coverIndex];
    }, 
     toggleIsBool(state, value) {
      state.isbool = value; 
    },
  },
  actions: {
    // async delayToggleBool({ commit }) {
    //   // 延迟3秒后提交mutation改变isbool状态
    //   await new Promise(resolve => setTimeout(resolve, 3000));
    //   commit('toggleIsBool',false);
    // },// 如果有异步操作，可以在 actions 中定义
    
  },
  getters: {
    // 如果有需要计算的 state，可以在 getters 中定义
  },
});

export default store;
