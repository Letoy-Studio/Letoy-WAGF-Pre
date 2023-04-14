<template>
  <div class="tab-bar-box">
    <div class="tab-bar">
      <div class="tab-bar-item">
        <div class="item-box">
          <img class="item-image" src="../assets/icons/home-active.svg" alt="">
        </div>
        <div class="item-box" @click="openRoomBox">
          <img class="item-image"
               style="width: 60px;height: 60px;margin-top: -20px"
               src="../assets/icons/add.svg" alt="">
        </div>
        <div class="item-box">
          <img class="item-image" src="../assets/icons/user.svg" alt="">
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {ElDialog, ElButton} from 'element-plus'
import LetoyService from "@/utils/LetoyService";

@Options({
  components: {
    ElDialog, ElButton
  },
  computed: {},
  props: {},
  methods: {
    openRoomBox() {
      this.createRoomBoxVisible = true
    },
    createNewRoom() {
      let targetTime = (Number(this.form.hours) < 10 ? ("0" + Number(this.form.hours)) : this.form.hours) + ":" +
          (Number(this.form.minutes) < 10 ? ("0" + Number(this.form.minutes)) : this.form.minutes) + ":" +
          (Number(this.form.seconds) < 10 ? ("0" + Number(this.form.seconds)) : this.form.seconds)
      LetoyService.authRequest("/Room/CreateRoom", {name: this.form.name, targetTime}, {})
          .then((res: any) => {
            if (res.status === 0) {
              this.createRoomBoxVisible = false;
              this.$ElTip({
                title: '成功',
                message: '创建成功',
                type: 'success',
              });
              this.form = {
                name: "",
                hours: '00',
                minutes: '00',
                seconds: '00'
              };
            }
          })
    }
  },
  data() {
    return {
      createRoomBoxVisible: false,
      form: {
        name: "",
        hours: '00',
        minutes: '00',
        seconds: '00'
      }
    }
  }
})
export default class BottomBar extends Vue {
}
</script>
<style scoped src="./../assets/css/BottomBar.css"></style>