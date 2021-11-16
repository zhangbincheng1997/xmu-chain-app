<template>
  <div>
    <van-nav-bar :title="'溯源码：' + code" left-text="返回" left-arrow @click-left="back" />
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
  Search
} from 'vant';

export default {
  components: {
    [NavBar.name]: NavBar,
    [Search.name]: Search
  },
  data() {
    return {
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
