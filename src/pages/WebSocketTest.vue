<template>
  <div>
    <button @click="sendMessage"> okk</button>
    <textarea type="textarea" v-model="message"></textarea>
  </div>
</template>

<script>
import SockJS from "sockjs-client"
import Stomp from "stompjs"

export default {
  name: "WebSocketTest",
  mounted() {
    this.initWS()
  },
  data() {
    return {
      stompClient: undefined,
      message: ""
    }
  },
  methods: {
    initWS: function () {
      let socket = new SockJS("/api/ws")
      const stompClient = Stomp.over(socket);
      this.stompClient = stompClient;
      stompClient.connect({}, this.onConnected)

    },
    onConnected() {
      this.stompClient.subscribe("/topic/public", this.onMessage)
      // this.stompClient.send("/app/chat.sendMessage",{},JSON.stringify({wsId:'hello'}))
    },
    sendMessage() {
      this.stompClient.send("/app/chat.sendUToUMessage", {}, JSON.stringify({
        fromId: "12",
        toId: "123",
        content: "asdas"
      }))
    },
    onMessage(msg) {
      if (this.message === "") {
        console.log(JSON.parse(msg.body).content)
        this.message = JSON.parse(msg.body).content
      } else {
        this.message = this.message + "\n" + JSON.parse(msg.body).content;
      }
    }
  }
}
</script>

<style scoped>

</style>