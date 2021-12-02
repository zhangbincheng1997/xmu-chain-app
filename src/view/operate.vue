<template>
  <div>
    <van-nav-bar :title="'溯源码：' + code" left-text="返回" left-arrow @click-left="back()" />
    <div v-if="loading">
      <van-loading />
    </div>
    <div v-else>
      <van-tabs animated>
        <van-tab title="生长信息">
          <van-list finished-text="没有更多了">
            <van-cell-group v-for="(item, i) in growList" :key="i" :title="'# ' + (i+1) + ': ' + item.createTime">
              <van-image :src="item.image" />
              <van-cell title="温度" :value="item.temperature" />
              <van-cell title="湿度" :value="item.humidity" />
              <van-cell title="光照" :value="item.light" />
              <van-cell title="备注" :value="item.remark" />
              <van-cell title="用户地址" :value="item.fromAddr" is-link :to="'userDetail?address='+item.fromAddr" />
              <van-cell title="交易哈希" :value="item.transHash" is-link :to="'transDetail?transHash='+item.transHash" />
            </van-cell-group>
          </van-list>
        </van-tab>
        <van-tab title="农事信息">
          <van-list finished-text="没有更多了">
            <van-cell-group v-for="(item, i) in farmList" :key="i" :title="'# ' + (i+1) + ': ' + item.createTime">
              <van-image :src="item.image" />
              <van-cell title="内容" :value="item.content" />
              <van-cell title="备注" :value="item.remark" />
              <van-cell title="用户地址" :value="item.fromAddr" is-link :to="'userDetail?address='+item.fromAddr" />
              <van-cell title="交易哈希" :value="item.transHash" is-link :to="'transDetail?transHash='+item.transHash" />
            </van-cell-group>
          </van-list>
        </van-tab>
        <van-tab title="加工信息">
          <van-list finished-text="没有更多了">
            <van-cell-group v-for="(item, i) in processList" :key="i" :title="'# ' + (i+1) + ': ' + item.createTime">
              <van-image :src="item.image" />
              <van-cell title="内容" :value="item.content" />
              <van-cell title="备注" :value="item.remark" />
              <van-cell title="用户地址" :value="item.fromAddr" is-link :to="'userDetail?address='+item.fromAddr" />
              <van-cell title="交易哈希" :value="item.transHash" is-link :to="'transDetail?transHash='+item.transHash" />
            </van-cell-group>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import {
  Cell,
  CellGroup,
  Image,
  List,
  Loading,
  NavBar,
  Tab,
  Tabs
} from 'vant';
import { listGrow, listFarm, listProcess } from '../api/trace'

export default {
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Image.name]: Image,
    [List.name]: List,
    [Loading.name]: Loading,
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data() {
    return {
      code: this.$route.query.code,
      growList: [],
      farmList: [],
      processList: [],
      loading: false
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      Promise.all([
        listGrow(this.code).then(res => { this.growList = res.data }),
        listFarm(this.code).then(res => { this.farmList = res.data }),
        listProcess(this.code).then(res => { this.processList = res.data }),
      ]).then(() => {
        this.loading = false
      })
    }
  }
};
</script>
