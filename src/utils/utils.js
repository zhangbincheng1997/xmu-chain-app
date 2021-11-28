import { Toast } from 'vant'

export function back() {
    this.$router.go(-1)
}

export function copyText(val) {
    this.$copyText(val).then(() => {
        Toast('复制成功！')
    })
}

export function linkTransaction(val) {
    this.$router.push({
        path: '/transDetail',
        query: {
            transHash: val
        }
    })
}

export function splitAddress(val) {
    if (!val) return
    let startStr = ''
    let endStr = ''
    let str = ''
    startStr = val.substring(0, 12)
    endStr = val.substring(val.length - 6)
    str = `${startStr}...${endStr}`
    return str
}
