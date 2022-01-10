<template>
  <div>
    <van-cell-group inset>
      <van-cell :title="items.name" />
      <van-cell>
        <van-form label-width="100px">
          <van-field v-for="(item, i) in items.content" :key="i" :label="item.title">
            <template #input>
              <span v-if="item.type === 'text'">{{ item.value }}</span>
              <ImagePreview v-if="item.type === 'image'" :image="item.value" :width="200" />
              <video v-if="item.type === 'video'" controls style="width: 200px;"><source :src="IPFS_GATEWAY + '/' + item.value"></video>
              <audio v-if="item.type === 'audio'" controls style="width: 200px;"><source :src="IPFS_GATEWAY + '/' + item.value"></audio>
              <a v-if="item.type === 'file'" :href="IPFS_GATEWAY + '/' + item.value" download>{{ item.value }}</a>
            </template>
          </van-field>
        </van-form>
      </van-cell>
      <van-cell is-link @click="showClick">
        <van-tag type="success" plain round>
          <van-icon name="lock" />已上链：{{ items.txId.substring(0, 36) + '...' }}
        </van-tag>
      </van-cell>
    </van-cell-group>

    <van-dialog v-model="show" title="保全证书" close-on-click-overlay>
      <div style="text-align: center;">
        <img id="image" src="" alt="" style="height: 400px">
      </div>
    </van-dialog>
  </div>
</template>

<script>
import {
  Cell,
  CellGroup,
  Dialog,
  Icon,
  Form,
  Field,
  Tag,
} from 'vant';
import { verify } from '../../api/trace'
import ImagePreview from '../ImagePreview'

export default {
  name: 'ItemsCard',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Dialog.Component.name]: Dialog.Component,
    [Icon.name]: Icon,
    [Form.name]: Form,
    [Field.name]: Field,
    [Tag.name]: Tag,
    ImagePreview
  },
  props: {
    items: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    showClick() {
      this.show = true
      this.$nextTick(() => {
        verify(this.items.txId).then(res => {
          const { evidenceHash, txId, blockHeight, blockTime } = res.data
          this.draw(evidenceHash, txId, blockHeight, blockTime)
        })
      })
    },
    draw(evidenceHash, txId, blockHeight, blockTime) {
      let image = document.getElementById('image');
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      let img = new Image()
      img.src = require('../../images/evidence.jpg')
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0, img.width, img.height)
        ctx.fillStyle = '#000'
        // 上
        ctx.font = '48px bold Microsoft YaHei'
        ctx.fillText(evidenceHash.substring(0, 48), 800, 1050)
        ctx.fillText(evidenceHash.substring(48), 800, 1100)
        ctx.fillText(txId.substring(0, 48), 800, 1250)
        ctx.fillText(txId.substring(48), 800, 1300)
        // 下
        ctx.font = '36px Microsoft YaHei'
        ctx.fillText('0x9bd3ae811324424bf3a29fcca7a9a317b735e869 ', 800, 1520)
        ctx.fillText('食品溯源', 800, 1620)
        ctx.fillText(blockTime, 800, 1720)
        ctx.fillText('XMU-CHAIN', 800, 1880)
        image.src = canvas.toDataURL('image/jpg')
      }
    }
  }
}
</script>
