<template>
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
      type: Number,
      require: false
    },
    height: {
      type: Number,
      require: false
    }
  },
  data() {
    return {
      style: {
        width: this.width + 'px',
        height: this.height + 'px'
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
