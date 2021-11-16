<template>
  <div>
    <van-nav-bar :title="'溯源码：' + code" left-text="返回" left-arrow @click-left="back" />
  </div>
</template>

<script>
import {
  NavBar
} from 'vant';

export default {
  components: {
    [NavBar.name]: NavBar,
  },
  data() {
    return {
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
