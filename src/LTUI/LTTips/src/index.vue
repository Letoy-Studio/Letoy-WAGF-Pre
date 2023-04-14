<template>
  <div class="loading-container"
       :style="{zIndex:top?99999:90,background:showCover?'rgba(236, 236, 236, 0.8)':'transparent'}">
    <div class="loading-box">
      <div class="loading-gif" v-if="type=== 'loading'"></div>
      <img class="success-icon" v-if="type=== 'success'" src="./media/arrow.svg" alt=""/>
      <img class="success-icon" v-if="type=== 'error'" src="./media/fail.svg" alt=""/>
      <img class="success-icon" v-if="type=== 'warning'" src="./media/warning.svg" alt=""/>
      <div class="loading-text">{{ label }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Loading as TLoading} from 'tdesign-vue-next';
import 'tdesign-vue-next/es/style/index.css';

@Options({
  computed: {
    tabName() {
      return this.$store.getters.getTabName;
    },
    topButton() {
      return this.$store.getters.getTopButton;
    }
  },
  props: {
    type: String,
    label: String,
    top: Boolean,
    showCover: Boolean
  },
  methods: {},
  components: {
    TLoading
  }
})
export default class LTTips extends Vue {
}
</script>
<style scoped>
.loading-container {
  z-index: 90;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.loading-box {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  z-index: 9999;
  top: 30%;
  left: calc(50% - 70px);
  position: absolute;
  width: 140px;
  height: 140px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 4px 4px 8px rgb(234 234 234 / 30%);
}

.loading-gif {
  text-indent: -9999em;
  position: relative;
  width: 50px;
  height: 50px;
  background: #369EFD;
  /*从左向右0~10%位置纯白，10%~50%纯白~透明*/
  background: linear-gradient(to right, #369EFD 10%, rgba(255, 255, 255, 0) 50%);
  /*background: linear-gradient(#369EFD, rgba(255, 255, 255));*/
  border-radius: 50%;
  box-shadow: inset 0 0 0 20px rgba(255, 255, 255, .2);
  -webkit-animation: load-effect 0.75s infinite linear;
  animation: load-effect 0.75s infinite linear;
}

.loading-gif::before {
  position: absolute;
  content: '';
  width: 50%;
  height: 50%;
  background: #369EFD;
  border-radius: 100% 0 0 0;
  left: 0;
  top: 0;
}

.loading-gif::after {
  background: #ffffff;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
}

.loading-text {
  margin-top: 13px;
  text-align: center;
  color: #369EFD;
  line-height: 15px;
  height: 15px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.success-icon {
  width: 55px;
  height: 55px;
}

@keyframes load-effect {

  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
