<template>
  <div>
    <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="back" />
    <van-notice-bar left-icon="info-o">当前溯源码：{{ code }}</van-notice-bar>
  </div>
</template>

<script>
import {
  NavBar,
  NoticeBar
} from 'vant';

export default {
  components: {
    [NavBar.name]: NavBar,
    [NoticeBar.name]: NoticeBar,
  },
  data() {
    return {
      title: this.$route.meta.title,
      code: this.$route.query.code
    };
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
};
</script>
<style lang="less">
</style>
