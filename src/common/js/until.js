/**
 * 解析url参数
 * @example ?id=123456&a=b
 * @return Object {id:12345,a:b}
 */
 
export function urlParse () {
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg) // ['?id=123456', '&a=b']
  // encodeURIComponent()对URI编码
  // decodeURIComponent()对encodeURIComponent()编码的URI解码
  arr.forEach(ele => {
    let eleArr = ele.substr(1).split('=')
    let key = decodeURIComponent(eleArr[0])
    let value = decodeURIComponent(eleArr[1])
    obj[key] = value
  })
}