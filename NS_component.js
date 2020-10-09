var NS_data = { NS_flag: 0, x: 0, y: 0 };//磁力相關參數
var length = 12;//磁力範圍
svg.addEventListener("mousemove", NS_move, false)
function NS_move(e) {
    if (move_component_data.flag == 1/**確認有再移動物件 */) {//物件pin磁力

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var a = cli2svg(e)//取得滑鼠SVG_XY
        var main_element_all = document.getElementById(move_component_data.id).getElementsByClassName('pin')//將主物件pin陣列儲存
        Array.from(document.getElementsByClassName('pin')).forEach(from_element => {//全pin物件forEach
            if (Array.from(main_element_all).indexOf(from_element) == -1) {//判斷是否為主物件pin(只通過非主物件pin)
                var from_xy = get_pin_xy(from_element)//記憶該pin_XY
                Array.from(main_element_all).forEach(main_element => {//主物件pin_forEach
                    var main_xy = get_pin_xy(main_element)//主物件pin_XY
                    var L = Math.sqrt(Math.pow((main_xy.x - from_xy.x), 2) + Math.pow((main_xy.y - from_xy.y), 2))//計算距離
                    if (L < length) {//距離過近
                        NS_data.flag = 1;
                        if (NS_data.x == 0 && NS_data.y == 0) {//記憶吸住點
                            NS_data.x = a.x;
                            NS_data.y = a.y;
                        }
                        var x = from_xy.x - main_xy.cx//反推translate_x
                        var y = from_xy.y - main_xy.cy//反推translate_y
                        component.setAttribute('transform', "translate(" + x + "," + y + ")")
                    }
                }
                )
            }
        })
        if (Math.sqrt(Math.pow((NS_data.x - a.x), 2) + Math.pow((NS_data.y - a.y), 2)) > length)//距離過遠
        {
            NS_data.flag = 0;//清旗標
            NS_data.x = 0;//清
            NS_data.y = 0;//清
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}
