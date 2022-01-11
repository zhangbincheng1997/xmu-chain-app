<template>
  <div>
    <van-cell-group inset>
      <van-cell title="店铺信息" />
      <van-cell>
        <div style="float: left;">
          <img :src="IPFS_GATEWAY + '/' + shop.icon" height="120px" alt="">
        </div>
        <div style="margin-left: 20px; display: inline-block; vertical-align: middle;">
          <strong>{{ shop.name }}</strong>
          <p><small>{{ shop.content }}</small></p>
          <p><van-button type="info" size="mini" icon="shop" :url="shop.url">进入官方店铺</van-button></p>
        </div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import {
  Cell,
  CellGroup,
  Button
} from 'vant';

export default {
  name: 'Shop',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button
  },
  props: {
    shop: {
      type: Object,
      required: true
    }
  }
}
</script>
