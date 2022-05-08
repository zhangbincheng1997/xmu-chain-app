const ipfsGatewayKey = 'IPFS_GATEWAY'

export function getIpfsGateway() {
  return window.localStorage.getItem(ipfsGatewayKey)
}

export function setIpfsGateway(gateway) {
  window.localStorage.setItem(ipfsGatewayKey, gateway)
}
