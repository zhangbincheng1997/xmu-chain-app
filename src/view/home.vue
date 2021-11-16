<template>
  <div>
    <van-cell :title="title" icon="home-o" />
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image" alt="" style="width: 100%;">
      </van-swipe-item>
    </van-swipe>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">食品溯源</van-divider>
    <van-notice-bar left-icon="info-o">当前溯源码：{{ code }}</van-notice-bar>
    <van-grid clickable :column-num="3">
      <van-grid-item v-for="(item, i) in traceHead" :key="i" :icon="item.icon" :text="item.text"
                     :to="getTo(item.to)" :url="item.url" @click="item.click" />
    </van-grid>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">区块链</van-divider>
    <van-grid :column-num="2">
      <van-grid-item v-for="(item, i) in numberHead" :key="i" :icon="item.icon" :text="item.text" :badge="item.value" />
    </van-grid>
  </div>
</template>

<script>
import {
  Toast,
  Cell,
  Dialog,
  Divider,
  Grid,
  GridItem,
  NoticeBar,
  Search,
  Swipe,
  SwipeItem
} from 'vant';

export default {
  components: {
    [Cell.name]: Cell,
    [Dialog.name]: Dialog,
    [Divider.name]: Divider,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [NoticeBar.name]: NoticeBar,
    [Search.name]: Search,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data() {
    return {
      title: this.$route.meta.title,
      code: this.$route.query.code,
      images: [
        'http://qiniu.littleredhat1997.com/dawn.jpg',
        'http://qiniu.littleredhat1997.com/dusk.jpg'
      ],
      traceHead: [
        { text: '基本信息', icon: 'http://qiniu.littleredhat1997.com/xmu/info.png', to: '/info' },
        { text: '生长情况', icon: 'http://qiniu.littleredhat1997.com/xmu/grow.png', to: '/grow' },
        { text: '农事情况', icon: 'http://qiniu.littleredhat1997.com/xmu/farm.png', to: '/farm' },
        { text: '加工情况', icon: 'http://qiniu.littleredhat1997.com/xmu/process.png', to: '/process' },
        { text: '防伪查询', icon: 'http://qiniu.littleredhat1997.com/xmu/check.png', to: '/check' },
        { text: '区块详情', icon: 'http://qiniu.littleredhat1997.com/xmu/blockchain.png', to: '/blockchain' },
        { text: '联系客服', icon: 'http://qiniu.littleredhat1997.com/xmu/contact.png', click: this.contact },
        { text: '技术支持', icon: 'http://qiniu.littleredhat1997.com/xmu/website.jpg', url: 'https://github.com/zhangbincheng1997' },
        { text: '官方网站', icon: 'http://qiniu.littleredhat1997.com/xmu/website.jpg', url: 'https://www.pzcnet.com/home' },
      ],
      numberHead: [
        { text: '节点个数', icon: 'http://qiniu.littleredhat1997.com/xmu/nodes.png', value: '4' },
        { text: '智能合约', icon: 'http://qiniu.littleredhat1997.com/xmu/contract.png', value: '10' },
        { text: '区块数量', icon: 'http://qiniu.littleredhat1997.com/xmu/block.png', value: '99+' },
        { text: '交易数量', icon: 'http://qiniu.littleredhat1997.com/xmu/transation.png', value: '99+' }
      ]
    };
  },
  mounted() {
    if (!this.code) this.code = 1 // for debug
  },
  methods: {
    getTo(to) {
      if (!to) return
      return to + '?code=' + this.code
    },
    contact() {
      Dialog.alert({
        title: '联系客服',
        message: '<img src="http://qiniu.littleredhat1997.com/xmu/pzc.jpg" alt="" width="200px" height="200px" />'
      })
    },
    sorry() {
      Toast('暂无后续逻辑~')
    }
  }
};
</script>
<style lang="less">
</style>
