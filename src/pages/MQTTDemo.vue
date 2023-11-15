<template>
  <div class="l-container">
    <div class="l-row">
      <t-button style="margin-top: 20px;margin-left: 10px;" @click="initMQTT">链接MQTT</t-button>
      <t-button style="margin-top: 20px;margin-left: 10px;" @click="closeConnect">关闭MQTT</t-button>
      <t-button style="margin-top: 20px;margin-left: 10px;" @click="showPicList = true">打開數據列表</t-button>
    </div>

  </div>
  <!--  TrackerId: {{ frame[0].TrackerId}}-->
  <!--  PersonId: {{ frame[0].PersonId }}-->
  <!--  XCoords: {{ frame[0].XCoords }}-->
  <!--  YCoords: {{ frame[0].YCoords }}-->

  <!--  {{frame[0]}}-->
  <!--  <div style="width: 1200px;height: 1200px;" id="main"></div>-->
  <canvas id="myCanvas" width="960" height="540"
          style=" transform: scaleX(-1);background: url('https://cypress-beijing-backgroundimage.s3.cn-north-1.amazonaws.com.cn/2420/17189/bg-token-2?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS5KYCLX2QO2IWZOW%2F20231115%2Fcn-north-1%2Fs3%2Faws4_request&X-Amz-Date=20231115T195552Z&X-Amz-Expires=3600&X-Amz-Signature=350fca2afef1c796feadd27724fadd8abef8350520fa3d2cd4077b2fe1e7adbc&X-Amz-SignedHeaders=host') no-repeat;background-size: cover"></canvas>
  <div v-if="showPicList">{{ picList }}</div>
</template>
<script lang="ts">
import {Options, Vue} from "vue-class-component";
import mqtt from "mqtt"
import * as echarts from 'echarts';
//
@Options({
  data() {
    return {
      base64String: "gCIAAAIAAAD/////AQAAAMjg/D7nY/A+tSvRPvQxuD4Mzsc+DM4HP7UrET/C+Rg/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAV6L2PgAAAD8G5+M+nI8BP5GFbD+GLGQ/LWRhP5GFbD+c3nQ/05teP9/0Zj+nN30/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3/RmP4YsZD8tZGE/LWRhP4woAAAAAAAAXokaP87HID+J2hU/wvkYPwAAAAB3JSo/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADC+Rg/lqgdPwAAAAAG5yM/ZCFLP296Uz9velM/nN50PwAAAABvelM/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACykEU/spBFPwAAAACykEU/",
      frame: [],
      lastFrameNum: "",
      "username": "2420-586978c8-59ef-45ea-a064-be582ab1a048",
      "passcode": "ylFqir146y95GS4S8wM3ZL8my3SmBB8T",
      client: undefined,
      currentPic: {},
      res: [],
      picList: [],
      pointPairs: [
        {start: 0, end: 1, color: 'pink'},
        {start: 1, end: 2, color: 'orange'},
        {start: 2, end: 3, color: 'yellow'},
        {start: 3, end: 4, color: 'lightYellow'},
        {start: 1, end: 5, color: 'darkSalmon'},
        {start: 5, end: 6, color: 'salmon'},
        {start: 6, end: 7, color: 'lightSalmon'},
        {start: 1, end: 8, color: 'darkTurquoise'},
        {start: 8, end: 9, color: 'turquoise'},
        {start: 9, end: 10, color: 'paleTurquoise'},
        {start: 1, end: 11, color: 'darkRed'},
        {start: 11, end: 12, color: 'red'},
        {start: 12, end: 13, color: 'orange'},
        {start: 0, end: 14, color: 'purple'},
        {start: 14, end: 16, color: 'purple'},
        {start: 0, end: 15, color: 'violet'},
        {start: 15, end: 17, color: 'violet'}
      ],
      canvasWidth: 960,
      canvasHeight: 540,
      showPicList: false,
      canvas:undefined,
      ctx:undefined
    }
  },
  mounted() {
    this.initCanvas();
    this.drawLine(13,13,24,24)
  },
  methods: {
    closeConnect() {
      this.client.end();
    },

    initMQTT() {
      this.connectMqtt();
    },
    connectMqtt() {
      const options = {
        clean: true, // 保留会话
        connectTimeout: 200, // 超时时间
        reconnectPeriod: 4000, // 重连时间间
        clientId: 'test123',//唯一值
        port: 8084,//端口
        host: 'beijing.altumview.com.cn',//地址
        username: this.username,
        password: this.passcode
      }
      let client = mqtt.connect('wss://beijing.altumview.com.cn:8084/mqtt', options);
      client.on('connect', (e: any) => {
        console.log('服务器链接成功');
        client.subscribe("mobileClient/2420/#", {qos: 0}, (err: any) => {
          if (!err) {
            console.log('订阅成功');
          } else {
            console.log('订阅失败');
          }
        })

      })
      //信息监听事件
      client.on('message', (topic: any, message: any) => {
        this.encodeString(message);
      })
      //失败
      client.on('error', (err: any) => {
        console.log('连接失败', err);
      })
      this.client = client;
    },

    encodeString(data: any) {
      data = this.uint8ArrayToBase64(data);
      let decodedString = window.atob(data);
      let byteArray = new Uint8Array(decodedString.length);
      for (let i = 0; i < decodedString.length; i++) {
        byteArray[i] = decodedString.charCodeAt(i);
      }
      const byteList = byteArray;
      const frameNum = this.parseStringInt32(byteList, 0)
      const numPeople = this.parseStringInt32(byteList, 4)
      const people = []
      for (let i = 0; i < numPeople; i++) {
        const pos = 8 + 152 * i;
        const personId = this.parseStringInt32(byteList, pos);
        let person: any = {};
        if (byteList.length >= pos + 80 + 17 * 4) {
          // 确保在读取数据之前，pos + 80 + 17 * 4 不会超过 byteList 的长度
          for (let j = 0; j < 18; j++) {
            const x = this.parseStringFloat(byteList, pos + 8 + j * 4);
            const y = this.parseStringFloat(byteList, pos + 80 + j * 4);
            if (x && y) person[j] = {x, y};
          }
          person.name = personId;
          people.push(person);
        }
      }
      this.drawPic(people)
    },
    //低版本浏览器使用此方法
    uint8ArrayToBase64(uint8Array: any) {
      try {
        let CHUNK_SIZE = 0x8000;
        let index = 0;
        let length = uint8Array.length;
        let res = "";
        let slice;
        while (index < length) {
          slice = uint8Array.subarray(index, Math.min(index + CHUNK_SIZE, length));
          res += String.fromCharCode.apply(null, slice);
          index += CHUNK_SIZE;
        }
        return window.btoa(res);
      } catch (e) {
        console.log(e)
      }
    },
    initCanvas() {
      let canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
      let dpr = window.devicePixelRatio || 1;
      let rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';

      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.canvas = canvas;
      this.ctx = ctx;

    },
    drawPic(people: any) {

      if (people) {
        people.forEach((person:any) => {
          this.drawSkeleton(5, person);
        })
      }
    },
    drawLine( x0: any, y0: any, x1: any, y1: any) {
      this.ctx.beginPath();
      this.ctx.moveTo(x0, y0);
      this.ctx.lineTo(x1, y1);
      this.ctx.stroke();
    },
    parseStringInt32(stringData: any, startIndex: any) {
      if (startIndex + 4 <= stringData.length) {
        const t = stringData.slice(startIndex, startIndex + 4);
        return new DataView(t.buffer).getInt32(0, true);
      }
    },
    parseStringFloat(stringData: any, startIndex: any) {
      if (startIndex + 4 <= stringData.length) {
        const t = stringData.slice(startIndex, startIndex + 4);
        return new DataView(t.buffer).getFloat32(0, true);
      }
    },
    drawSkeleton( lineWidth: any, points: any) {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.ctx.lineWidth = lineWidth;
      this.ctx.lineCap = 'round';

      let minX = 1;
      let minY = 1;
      this.pointPairs.forEach((pair: any) => {
        const startPoint = points[pair.start];
        const endPoint = points[pair.end];
        if (startPoint !== undefined && endPoint !== undefined) {
          if (endPoint.x < minX) minX = endPoint.x;
          if (endPoint.y < minY) minY = endPoint.y;
          this.ctx.strokeStyle = pair.color;
          this.drawLine(startPoint.x * this.canvasWidth, startPoint.y * this.canvasHeight, endPoint.x * this.canvasWidth, endPoint.y * this.canvasHeight);
        }
      })
    }

  }
})

export default class CustomerService extends Vue {
}
</script>