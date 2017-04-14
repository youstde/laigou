<template>
  <div class="count-down">
    <div v-if="Time.isShow">
      <span v-if="Time.day>0">
        <span class="number">{{Time.day}}</span>
      <span class="clock">天</span>
      </span>
      <span>
        <span class="number">{{Time.hour}}</span>
      <span class="clock">时</span>
      <span class="number">{{Time.minutes}}</span>
      <span class="clock">分</span>
      <span class="number">{{Time.seconds}}</span>
      <span class="clock">秒</span>
      <!--<span v-if="Time.millisecond>0">-->
          <!--<span class="number">{{Time.millisecond}}</span>-->
      <!--</span>-->
      </span>
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
      countTime () {
        //结束时间在当前时间之前
        this._countTime = this.countTime
        if (this.countTime < 0) {
          this.Time.isShow = false;
          this.showEndMessage();
        } else if (this.countTime > 0) {
          this.Tip.isShow = false;
          this.Time.isShow = true;
          this.$emit('countDownEnd', this.Time.isShow);
          this.setClock(this.countTime, this.showEndMessage, true)
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
      /**
       * 开始倒计时的事件信息
       */
      showStartMessage() {
        this.Tip.isShow = false;
        this.$emit('countDownStart', this.Time.isShow);
        this.setClock(this.start, this.end, this.showEndMessage, true)
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
    /*padding: 0.14rem 0;*/
    text-align: center;
    background-color: #fff;
    margin-bottom: 0.2rem;
    p {
      margin-bottom: 0.05rem;
      .has-caption {
        font-size: 0.24rem;
        color: #666;
      }
    }
    span {
      font-size: 0.24rem;
      color: #666;
      margin: 0 0.08rem;
    }
    .number {
      color: $pink;
      font-size: 0.32rem;
      position: relative;
      top: 0.02rem
    }
    .has-caption {
      display: inline-block;
      position: relative;
      &::before,
      &::after {
        content: "";
        display: inline-block;
        position: absolute;
        top: 0.14rem;
        width: 0.7rem;
        height: 1px;
        background-color: #eee;
      }
      &::before {
        right: 100%;
        margin-right: 0.36rem;
      }
      &::after {
        left: 100%;
        margin-left: 0.36rem;
      }
    }
  }
</style>
