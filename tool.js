function str(i){
  return String(i);
}
function _uuid() { //UUID製造函數
  var d = Date.now();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now(); //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}
function cli2svg(e) {//SVG_Cli 2 SVG_Cxy
  const clientPoint = svg.createSVGPoint()
  //	取得 CTM
  const CTM = svg.getScreenCTM()
  //  將 SVG 座標點的 x, y 設成 client(x, y)
  clientPoint.x = e.clientX
  clientPoint.y = e.clientY
  //	將 client 的座標點轉成 SVG 座標點
  SVGPoint = clientPoint.matrixTransform(CTM.inverse())
  //  將資訊顯示於視窗上
  return { x: int(SVGPoint.x.toFixed(0)), y: int(SVGPoint.y.toFixed(0)) }
}
function int(i) { //10進制轉換
  return parseInt(i, 10)
}
function get_pin_xy(pin_element) { //由於pin會放在父物件內，要回推pin_XY
  var dady_element = get_transfrom(pin_element.parentNode);//取得父物件svg位置
  dady_element.x = dady_element.x + int(pin_element.getAttribute('cx'))//取得pin在父物件座標中的x位置
  dady_element.y = dady_element.y + int(pin_element.getAttribute('cy'))//取得pin在父物件座標中的y位置
  return { x: dady_element.x, y: dady_element.y, cx: int(pin_element.getAttribute('cx')), cy: int(pin_element.getAttribute('cy')) }
}
function get_transfrom(element) { //取得該物件transfrom ps(必須要有 transfrom 參數)
  var k = "", l = 0;
  Array.from(element.getAttribute('transform')).forEach(s => {
    if (s == "(" || s == ")")
      l++
    else
      if (l == 1)
        k += s
  })
  k = k.split(",");
  return { x: int(k[0]), y: int(k[1]) }
}