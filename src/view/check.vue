<template>
  <div>
    <van-nav-bar :title="'溯源码：' + code" left-text="返回" left-arrow @click-left="back" />
    <van-image src="http://qiniu.littleredhat1997.com/xmu/code.jpg" />
    <van-search
        v-model="securityCode"
        show-action
        shape="round"
        placeholder="请输入校验码（例如：88888888）"
        @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">查询</div>
      </template>
    </van-search>
    <div v-if="isOk === true">
      <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">查询结果</van-divider>
      <div v-if="list.length === 0">
        <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="success">防伪码正确！并且是首次查询！</van-notice-bar>
      </div>
      <div v-else>
        <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="success">防伪码正确！但不是首次查询！</van-notice-bar>
        <table>
          <tr>
            <th>#</th>
            <th v-for="(col, i) in column" :key="i">{{ col.label }}</th>
          </tr>
          <tr v-for="(item, i) in list" :key="i">
            <td>{{ i + 1 }}</td>
            <td v-for="(col, i) in column" :key="i">{{ item[col.prop] }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div v-if="isOk === false">
      <van-divider :style="{ color: '#f60', borderColor: '#f60', padding: '0 16px' }">查询结果</van-divider>
      <van-notice-bar left-icon="fail">防伪码错误！</van-notice-bar>
    </div>
  </div>
</template>

<script>
import {
  Divider,
  Image,
  NavBar,
  NoticeBar,
  Search,
} from 'vant';
import tag from '../api/tag'

export default {
  components: {
    [Divider.name]: Divider,
    [Image.name]: Image,
    [NavBar.name]: NavBar,
    [NoticeBar.name]: NoticeBar,
    [Search.name]: Search
  },
  data() {
    return {
      code: this.$route.query.code,
      securityCode: undefined,
      isOk: undefined,
      list: [],
      column: [
        { label: 'IP',  prop: 'ip' },
        { label: '地点',  prop: 'location' },
        { label: '查询时间',  prop: 'createTime' }
      ]
    };
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    onSearch() {
      this.isOk = undefined
      if (!this.code) return
      if (!this.securityCode) return
      tag.check(this.code, this.securityCode).then(res => {
        this.isOk = res.data.ok
        this.list = res.data.search
      })
    }
  }
};
</script>
<style lang="less">
</style>
