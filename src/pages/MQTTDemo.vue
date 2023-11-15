<template>
  <div class="l-container">
    <div class="l-row">
      <t-button style="margin-top: 20px;margin-left: 10px;" @click="initMQTT">链接MQTT</t-button>
      <t-button style="margin-top: 20px;margin-left: 10px;" @click="closeConnect">关闭MQTT</t-button>
    </div>

  </div>
  <!--  TrackerId: {{ frame[0].TrackerId}}-->
  <!--  PersonId: {{ frame[0].PersonId }}-->
  <!--  XCoords: {{ frame[0].XCoords }}-->
  <!--  YCoords: {{ frame[0].YCoords }}-->

  <!--  {{frame[0]}}-->
  <!--  <div style="width: 1200px;height: 1200px;" id="main"></div>-->
  <canvas id="myCanvas" width="1200" height="500"></canvas>
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
      "username": "2420-05f2113a-ef0e-4d2f-a951-cd8d6c61aab1",
      "passcode": "HQboOYbAJDgad2mFT9TdCKjyZ8cd9tp8",
      client: null,
      currentPic: {},
      res:[]
    }
  },
  mounted() {
    // this.encodeString();
    // this.connectMqtt();
    // this.initCharts();
    // this.initMQTT();
    // this.encodeString();
  },
  methods: {
    constructor() {
      this.frame = [];
      this.lastFrameNum = 0; // Assuming this is a class member
    },
    storeFrame(data: any) {
      console.log(data)
      let currentPic = [];
      let frameNum = this.parseHex(data, 0, 4);
      if (frameNum <= this.lastFrameNum) {
        return;
      }
      this.lastFrameNum = frameNum;
      let numOfPeople = this.parseHex(data, 4, 8);
      for (let i = 0; i < numOfPeople; i++) {
        let startIndex = 8 + 152 * i;
        let endIndex = startIndex + 152;

        let personId = this.parseHex(data, startIndex, startIndex + 4);
        let trackerId = this.parseHex(data, startIndex + 4, startIndex + 8);

        let xyCoords = [];
        for (let j = startIndex + 8; j < endIndex; j += 4) {
          let num = this.parseHex(data, j, j + 4);
          let coord = this.toFloat32(num);
          xyCoords.push(coord);
        }

        let skeleton = {
          TrackerId: trackerId,
          PersonId: personId,
          XCoords: xyCoords.slice(0, 18),
          YCoords: xyCoords.slice(18, 36)
        };
        // currentPic.push(skeleton);
        this.frame.push(skeleton);
        currentPic.push(skeleton)
      }
      console.log(currentPic)
      this.drawPic(currentPic);
    },
    closeConnect() {
      this.client.disconnect();
    },
    parseHex(data: any, start: any, end: any) {
      let hexString = '';
      for (let i = end - 1; i >= start; i--) {
        hexString += ('0' + data[i].toString(16)).slice(-2);
      }
      return parseInt(hexString, 16);
    },
    toFloat32(num: any) {
      let arr = new ArrayBuffer(4);
      let view = new DataView(arr);
      view.setUint32(0, num);
      return view.getFloat32(0);
    },
    encodeString(data: any) {
      // let decodedString = ;
      // let byteArray = new Uint8Array(decodedString.length);
      // for (let i = 0; i < decodedString.length; i++) {
      //   byteArray[i] = decodedString.charCodeAt(i);
      // }
      this.constructor();
      // this.storeFrame(this.uint8ArrayToBase64(data));

      // let decodedString = window.atob(this.base64String);
      let decodedString = window.atob(this.uint8ArrayToBase64(data));
      let byteArray = new Uint8Array(decodedString.length);
      for (let i = 0; i < decodedString.length; i++) {
        byteArray[i] = decodedString.charCodeAt(i);
      }
      console.log(byteArray)

      this.storeFrame(byteArray);

    },
    initMQTT() {
      this.connectMqtt();
    },
    // mqtt链接
    connectMqtt() {
      const options = {
        clean: true, // 保留会话
        connectTimeout: 4000, // 超时时间
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
    initCharts() {
      this.storeFrame(this.base64String);
      let records = []
      for (let i = 0; i < this.frame.length; i++) {
        for (let x = 0; x < this.frame[i].XCoords.length; x++) {
          records.push(
              [this.frame[i].XCoords[x], this.frame[i].YCoords[x]])
        }
      }
      console.log(records);
      type EChartsOption = echarts.EChartsOption;
      var chartDom = document.getElementById('main')!;
      var myChart = echarts.init(chartDom);
      var option: EChartsOption;
      option = {
        xAxis: {},
        yAxis: {},
        series: [
          {
            symbolSize: 20,
            data: records,
            type: 'scatter'
          }
        ]
      };
      option && myChart.setOption(option);
    },
    drawPic(data: any) {
      let canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
      let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;


      ctx.clearRect(0, 0, 1200, 500);
      var dpr = window.devicePixelRatio || 1;

      var rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';

      ctx.scale(dpr, dpr);

      let resPics: any[][][] = [];
      data.forEach((item: any) => {
        let records = [];
        for (let x = 0; x < item.XCoords.length; x++) {
          records.push(
              [item.XCoords[x], item.YCoords[x]])
        }
        resPics.push(records);
      })
      resPics.forEach((points: any) => {
        let res: any = [];
        points.forEach(function (point: any) {
          res.push({x: point[0], y: point[1]})
          console.log();
          ctx.beginPath();
          ctx.fillStyle = '#003cab';
          ctx.arc(point[0] * 500, -point[1] * 500 + 500, 5, 0, 2 * Math.PI); // 绘制圆形点，5 是半径
          // ctx.fillRect(point.x - 2.5, point.y - 2.5, 5, 5); // 或者绘制小方块，5x5 尺寸
          ctx.fill();
          ctx.closePath();
        });
        this.res = res
      })


    },
    uint8ArrayToBase64(uint8Array: any) {
      // 将每个字节转换为字符
      var binaryString = uint8Array.reduce((acc: any, byte: any) => acc + String.fromCharCode(byte), '');

      // 使用 btoa 进行 Base64 编码
      return btoa(unescape(encodeURIComponent(binaryString)));
    },
  }
})

export default class CustomerService extends Vue {
}
</script>