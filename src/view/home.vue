<template>
  <div>
    <van-nav-bar :title="'溯源码：' + code" />
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image" alt="" style="width: 100%;">
      </van-swipe-item>
    </van-swipe>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">食品溯源</van-divider>
    <van-grid clickable :column-num="3">
      <van-grid-item v-for="(item, i) in traceHead" :key="i" :icon="item.icon" :text="item.text"
                     :to="getTo(item.to)" :url="item.url" @click="item.click ? item.click() : undefined" />
    </van-grid>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">区块链</van-divider>
    <van-grid :column-num="2">
      <van-grid-item v-for="(item, i) in numberHead" :key="i" :icon="item.icon" :text="item.text" :badge="item.value" />
    </van-grid>
  </div>
</template>

<script>
import {
  Cell,
  Dialog,
  Divider,
  Grid,
  GridItem,
  NavBar,
  Search,
  Swipe,
  SwipeItem
} from 'vant';
import { getNumberData } from '../api/browser'

export default {
  components: {
    [Cell.name]: Cell,
    [Dialog.name]: Dialog,
    [Divider.name]: Divider,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [NavBar.name]: NavBar,
    [Search.name]: Search,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data() {
    return {
      code: this.$route.query.code,
      images: [
        'http://qiniu.littleredhat1997.com/xmu/chain-bg.png'
      ],
      traceHead: [
        { text: '基本信息', icon: 'http://qiniu.littleredhat1997.com/xmu/info.png', to: '/info' },
        { text: '溯源情况', icon: 'http://qiniu.littleredhat1997.com/xmu/operate.png', to: '/operate' },
        { text: '防伪查询', icon: 'http://qiniu.littleredhat1997.com/xmu/check.png', to: '/check' },
        { text: '区块链浏览器', icon: 'http://qiniu.littleredhat1997.com/xmu/browser.png', to: '/browser' },
        { text: '联系客服', icon: 'http://qiniu.littleredhat1997.com/xmu/wechat.png', click: this.wechat },
        { text: '官方网站', icon: 'http://qiniu.littleredhat1997.com/xmu/website.jpg', url: 'https://www.pzcnet.com/home' },
      ],
      numberHead: [
        { text: '节点个数', name: 'nodeCount', icon: 'http://qiniu.littleredhat1997.com/xmu/nodes.png', value: 0 },
        { text: '已部署的智能合约', name: 'contractCount', icon: 'http://qiniu.littleredhat1997.com/xmu/contract.png', value: 0 },
        { text: '区块数量', name: 'latestBlock', icon: 'http://qiniu.littleredhat1997.com/xmu/block.png', value: 0 },
        { text: '交易数量', name: 'transactionCount', icon: 'http://qiniu.littleredhat1997.com/xmu/transation.png', value: 0 }
      ]
    };
  },
  mounted() {
    if (!this.code) this.code = 100000 // for debug
    this.getNumberData()
  },
  methods: {
    getTo(to) {
      if (!to) return
      return to + '?code=' + this.code
    },
    wechat() {
      Dialog.alert({
        title: '联系客服',
        message: '<img src="http://qiniu.littleredhat1997.com/xmu/pzc.jpg" alt="" width="200px" height="200px" />'
      })
    },
    getNumberData() {
      getNumberData().then(res => {
        this.numberHead.forEach(function(value) {
          for (const i in res.data) {
            if (value.name === i) {
              value.value = res.data[i]
            }
          }
        })
      })
    }
  }
};
</script>
