<template>
  <div class="count-down">
    <div v-if="Time.isShow">
      <div v-if="Time.day>0">
        <span class="number" :style="styleObj.clock">{{Time.day}}</span><span class="clock">天</span>
      </div>
      <div>
        <span class="number" :style="styleObj.clock">{{Time.hour.toString().slice(0,1)}}</span><span class="number" :style="styleObj.clock">{{Time.hour.toString().slice(1,2)}}</span>
        <span class="clock">时</span>
        <span class="number" :style="styleObj.clock">{{Time.minutes.toString().slice(0,1)}}</span><span class="number" :style="styleObj.clock">{{Time.minutes.toString().slice(1,2)}}</span>
        <span class="clock">分</span>
        <span class="number" :style="styleObj.clock">{{Time.seconds.toString().slice(0,1)}}</span><span class="number" :style="styleObj.clock">{{Time.seconds.toString().slice(1,2)}}</span>
        <span class="clock">秒</span>
        <span class="ms" :style="styleObj.ms">{{Time.millisecond}}</span>
      </div>
    </div>
    <div v-if="!Time.isShow && Tip.isShow">
      {{ Tip.content }}
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        Tip: {
          isShow: false,
          content: ''
        },
        Time: {
          isShow: false, //是否显示倒计时
          day: '', //天
          hour: '', //小时
          minutes: '', //分钟
          seconds: '', //秒
          millisecond: '' //毫秒
        },
        start: '', //活动开始时间
        end: '', //活动结束时间
        current: '', //当前时间,
        _countTime: 0
      }
    },
    props: {
      styleObj: {
        type: Object,
        default: {}
      },
      //时间控件ID
      id: {
        type: String,
        default: '1'
      },
      // 倒计时结束显示
      endText: {
        type: String,
        default: '倒计时结束'
      },
      showDays: {
        type: Boolean,
        default: false
      },
      showMillisecond: {
        type: Boolean,
        default: false
      },
      count: {
        type: Number,
        default: 1000
      },
      countTime: {
        type: Number,
        default: 0
      }
    },
    watch: {
      countTime: function () {
        this._countTime = this.countTime
        console.log(this._countTime)
        if (this._countTime <= 0) {
          this.Time.isShow = false;
          this.showEndMessage();
        } else if (this._countTime > 0) {
          this.Tip.isShow = false;
          this.Time.isShow = true;
          this.$emit('countDownEnd', this.Time.isShow);
          this.setClock(this._countTime, this.showEndMessage, true)
        }
      }
    },
    methods: {
      /**
       * 设置时间
       * @param startTime 开始时间
       * @param endTime 倒计时结束时间
       * @param callBack
       * @param type true=到结束时间的倒计时 false=距离开始的倒计时
       */
      setClock(timeDistance, callBack, type) {
        const Time = this.Time;
        if (timeDistance > 0) {
          this.Time.isShow = true;
          if (this.showDays) {
            Time.day = Math.floor(timeDistance / 86400000);
            timeDistance -= Time.day * 86400000;
          }
          Time.hour = Math.floor(timeDistance / 3600000);
          timeDistance -= Time.hour * 3600000;
          Time.minutes = Math.floor(timeDistance / 60000);
          timeDistance -= Time.minutes * 60000;
          Time.seconds = Math.floor(timeDistance / 1000).toFixed(0);
          timeDistance -= Time.seconds * 1000;
          Time.millisecond = Math.floor(timeDistance / 100);
          Time.hour = handleDoubleDigits(Time.hour);
          Time.minutes = handleDoubleDigits(Time.minutes);
          Time.seconds = handleDoubleDigits(Time.seconds);
          setTimeout(() => {
            if (type) { //type为true则倒计时 false为即将开始时间
              this.setClock(this._countTime -= this.count, callBack, true);
            } else {
              this.setClock(this._countTime -= this.count, callBack);
            }
          }, this.count)
        } else {
          callBack();
        }
      },
      checkCountTime() {
        setTimeout(() => {
          this._countTime = this.countTime
          this.setClock(this._countTime, this.checkCountTime, true);
        }, this.count)
      },
      /**
       * 开始倒计时的事件信息
       */
      showStartMessage() {
        this.Tip.isShow = false;
        this.$emit('countDownStart', this.Time.isShow);
        this.setClock(this._countTime, this.showEndMessage, true)
      },
      /**
       * 倒计时结束的事件信息
       */
      showEndMessage() {
        this.Time.isShow = false;
        this.Tip = {
          isShow: true,
          content: this.endText
        };
        this.$emit('countDownEnd', this.Time.isShow);
      },
    }
  }
  //返回两位数字
  function handleDoubleDigits(num) {
    return num < 10 ? '0' + num : num;
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  $pink: #ff2a48;
  .count-down {
    .number {
      font-size: 0.3rem;
      color: #fff;
      width: 0.3rem;
      height: 0.5rem;
      display: inline-block;
      background-color: #421308;
      border-radius: 4px;
      margin-right: 0.04rem;
      text-align: center;
      line-height: 0.48rem;
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
    .clock {
      font-size: 0.24rem;
      color: #fff;
      opacity: 0.5;
      width: 0.38rem;
      text-align: center;
      display: inline-block;
    }
    .ms {
      width: 0.3rem;
      height: 0.5rem;
      display: inline-block;
      background-color: #FFB931;
      vertical-align: bottom;
      border-radius: 4px;
      line-height: 0.48rem;
      font-size: 0.3rem;
      color: #fff;
    }
  }
</style>
