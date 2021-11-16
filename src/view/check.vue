<template>
  <div>
    <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="back" />
    <van-notice-bar left-icon="info-o">当前溯源码：{{ code }}</van-notice-bar>
    <van-search
        v-model="securityCode"
        show-action
        placeholder="请输入校验码"
        @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">查询</div>
      </template>
    </van-search>
  </div>
</template>

<script>
import {
  Toast,
  NavBar,
  NoticeBar,
  Search
} from 'vant';

export default {
  components: {
    [NavBar.name]: NavBar,
    [NoticeBar.name]: NoticeBar,
    [Search.name]: Search
  },
  data() {
    return {
      title: this.$route.meta.title,
      code: this.$route.query.code,
      securityCode: undefined
    };
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    onSearch(val) {
      Toast(val)
    }
  }
};
</script>
<style lang="less">
</style>
