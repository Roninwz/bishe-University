<template>
  <div class="dol-sign-box" :class="className">
    <canvas
      style="margin: 0;padding: 0"
      ref="canvas"
      :width="width"
      :height="height"
      @touchstart='touchStart'
      @touchmove='touchMove'
      @touchend='touchEnd'
      @mousedown="mouseDown"
      @mousemove="mouseMove"
      @mouseup="mouseUp"></canvas>
  </div>
</template>

<script>
  export default {
    props: {
      width: {default: '300px'},            //宽度
      height: {default: '100px'},            //高度
      className: {default: ''},            //高度
      uploadType: {default: 'signImg'},            //上传图片存储位置
    },
    data(){
      return {
        points: [],
        canvasTxt: null,
        startX: 0,
        startY: 0,
        moveY: 0,
        moveX: 0,
        endY: 0,
        endX: 0,
        w: null,
        h: null,
        isDown: false,
        url: {
          upload: '/system/tool/file/base64'
        },
        serverData: null
      }
    },
    created(){

    },
    mounted(){
      let canvas = this.$refs.canvas;
      this.canvasTxt = canvas.getContext("2d");
      this.stage_info = canvas.getBoundingClientRect();
    },
    components: {},
    methods: {
      backHome(){
        window.history.back();
      },
      //电脑设备事件
      mouseDown(ev){
        ev = ev || event;
        ev.preventDefault();
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        };
        this.startX = obj.x;
        this.startY = obj.y;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
        this.isDown = true;
      },
      //移动设备事件
      touchStart(ev){
        ev = ev || event;
        ev.preventDefault();
        if (ev.touches.length == 1) {
          let obj;
          obj = {
            x: ev.targetTouches[0].pageX,
            y: ev.targetTouches[0].clientY
          };
          this.startX = obj.x;
          this.startY = obj.y;
          this.canvasTxt.beginPath();
          this.canvasTxt.moveTo(this.startX-this, this.startY-this);
          this.canvasTxt.lineTo(obj.x, obj.y);
          this.canvasTxt.stroke();
          this.canvasTxt.closePath();
          this.points.push(obj);
        }
      },
      //电脑设备事件
      mouseMove(ev){
        ev = ev || event;
        ev.preventDefault();
        if (this.isDown) {
          let obj = {
            x: ev.offsetX,
            y: ev.offsetY
          };
          this.moveY = obj.y;
          this.moveX = obj.x;
          this.canvasTxt.beginPath();
          this.canvasTxt.moveTo(this.startX, this.startY);
          this.canvasTxt.lineTo(obj.x, obj.y);
          this.canvasTxt.stroke();
          this.canvasTxt.closePath();
          this.startY = obj.y;
          this.startX = obj.x;
          this.points.push(obj);
        }
      },
      //移动设备事件
      touchMove(ev) {
        ev = ev || event;
        ev.preventDefault();
        let obj;
        if (ev.touches.length == 1) {
          obj = {
            x: ev.targetTouches[0].pageX,
            y: ev.targetTouches[0].clientY
          };
          this.moveY = obj.y;
          this.moveX = obj.x;
          this.canvasTxt.beginPath();
          this.canvasTxt.moveTo(this.startX, this.startY);
          this.canvasTxt.lineTo(obj.x, obj.y);
          this.canvasTxt.stroke();
          this.canvasTxt.closePath();
          this.startY = obj.y;
          this.startX = obj.x;
          this.points.push(obj);
        }
      },
      //电脑设备事件
      mouseUp(ev){
        ev = ev || event;
        ev.preventDefault();
        if (1) {
          let obj = {
            x: ev.offsetX,
            y: ev.offsetY
          };
          this.canvasTxt.beginPath();
          this.canvasTxt.moveTo(this.startX, this.startY);
          this.canvasTxt.lineTo(obj.x, obj.y);
          this.canvasTxt.stroke();
          this.canvasTxt.closePath();
          this.points.push(obj);
          this.points.push({x: -1, y: -1});
          this.isDown = false;
        }
      },
      //移动设备事件
      touchEnd(ev){
        ev = ev || event;
        ev.preventDefault();
        let obj;
        if (ev.touches.length == 1) {
          obj = {
            x: ev.targetTouches[0].pageX,
            y: ev.targetTouches[0].clientY
          };
          this.canvasTxt.beginPath();
          this.canvasTxt.moveTo(this.startX, this.startY);
          this.canvasTxt.lineTo(obj.x, obj.y);
          this.canvasTxt.stroke();
          this.canvasTxt.closePath();
          this.points.push(obj);
          this.points.push({x: -1, y: -1});
        }
      },


      //重写
      overwrite(){
        this.canvasTxt.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
        this.points = [];
      },
      //获取图片
      getImgData(){
        return this.$refs.canvas.toDataURL();
      },
      //上传图片
      uploadData(){
        return new Promise((resolve, reject) => {
          this.$ajax({
            url: this.url.upload,
            params: {type: this.uploadType},
            method: 'post',
            data: {media: this.$refs.canvas.toDataURL().substr(22)}
          }).then(reData => {
            this.serverData = reData.data;
            resolve(reData.data);
          }).catch(e => {
            reject(e);
          })
        });
      }
    }
  }
</script>

<style lang="scss">
  .dol-sign-box{
    overflow: hidden;
    margin: 0;
    padding: 0;

    canvas {
      border: 1px solid gainsboro;
    }
  }
</style>
