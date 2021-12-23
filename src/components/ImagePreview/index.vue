<template>
<!--  <van-image v-if="image" :src="ipfsImage" :width="width" :height="height" @click="preview" />-->
  <van-image v-if="image" :src="ipfsImage" :style="style" @click="preview" />
</template>

<script>
import {
  Image,
  ImagePreview
} from 'vant';

export default {
  name: 'ImagePreview',
  components: {
    [Image.name]: Image
  },
  props: {
    image: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      style: {
        width: this.width,
        height: this.height
      }
    }
  },
  computed: {
    ipfsImage() {
      return this.IPFS_GATEWAY + '/' + this.image
    }
  },
  methods: {
    preview() {
      ImagePreview([this.ipfsImage])
    }
  }
}
</script>
