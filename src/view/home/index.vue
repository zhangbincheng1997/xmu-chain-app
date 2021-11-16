<template>
  <div>
    <van-cell title="XMU-食品溯源" icon="home-o" />
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image" alt="" style="width: 100%;">
      </van-swipe-item>
    </van-swipe>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">食品溯源</van-divider>
    <van-grid :column-num="3">
      <van-grid-item icon="http://qiniu.littleredhat1997.com/xmu/info.png" text="基本信息" />
      <van-grid-item icon="http://qiniu.littleredhat1997.com/xmu/grow.png" text="生长情况" />
      <van-grid-item icon="http://qiniu.littleredhat1997.com/xmu/farm.png" text="农事情况" />
      <van-grid-item icon="http://qiniu.littleredhat1997.com/xmu/process.png" text="加工情况" />
      <van-grid-item icon="http://qiniu.littleredhat1997.com/xmu/check.png" text="防伪查询" />
      <van-grid-item icon="http://qiniu.littleredhat1997.com/xmu/blockchain.png" text="区块详情" />
      <van-grid-item icon="http://qiniu.littleredhat1997.com/xmu/wechat.png" text="联系客服" />
      <van-grid-item icon="http://qiniu.littleredhat1997.com/xmu/website.jpg" text="技术支持" url="https://github.com/zhangbincheng1997" />
      <van-grid-item icon="http://qiniu.littleredhat1997.com/xmu/website.jpg" text="官方网站" url="https://www.pzcnet.com/home" />
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
  Col,
  Row,
  Divider,
  Empty,
  Search,
  Swipe,
  SwipeItem,
  Grid,
  GridItem
} from 'vant';

export default {
  components: {
    [Cell.name]: Cell,
    [Col.name]: Col,
    [Row.name]: Row,
    [Divider.name]: Divider,
    [Empty.name]: Empty,
    [Search.name]: Search,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  },
  data() {
    return {
      images: [
        'http://qiniu.littleredhat1997.com/dawn.jpg',
        'http://qiniu.littleredhat1997.com/dusk.jpg'
      ],
      numberHead: [
        { text: '节点个数', value: '4', icon: 'http://qiniu.littleredhat1997.com/xmu/nodes.png' },
        { text: '已部署的智能合约', value: '99+', icon: 'http://qiniu.littleredhat1997.com/xmu/contract_img.png' },
        { text: '区块数量', value: '99+', icon: 'http://qiniu.littleredhat1997.com/xmu/block.png' },
        { text: '交易数量', value: '99+', icon: 'http://qiniu.littleredhat1997.com/xmu/transation.png' }
      ]
    };
  },
  methods: {
    onSearch(val) {
      Toast(val);
    },
    sorry() {
      Toast('暂无后续逻辑~');
    }
  }
};
</script>
<style lang="less">
</style>
