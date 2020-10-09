var move_component_data = { flag: 0, x: 0, y: 0, id: 0 };//move_component相關參數
svg.addEventListener("mousemove", component_move, false)
document.addEventListener("mouseup", document_up, false)
var component = svg.getElementById('');
class_sys()
function component_move(e) {
    if (move_component_data.flag == 1) {//物件移動
        //////////////////////////////////////////////////////////////////////////////
        var a = cli2svg(e)//取得滑鼠SVG_XY
        component.setAttribute('transform', "translate(" + String(a.x - move_component_data.x) + "," + String(a.y - move_component_data.y) + ")")//更新SVG_translate  
        /////////////////////////////////////////////////////////////////////////////
    }
}
function document_up(e) {//在網頁中放開執行
    move_component_data.flag = 0;
}
function class_sys() {//設定class事件(ps:會重複觸發)
    Array.from(document.getElementsByClassName('component_text')).forEach(element => {//刷Class物件
        element.addEventListener("mousedown", function (e) {
            move_component_data.flag = 1;//移動物件旗標
            e.stopPropagation();//阻止冒泡
            var a = cli2svg(e)//取得滑鼠SVG_XY
            var k = get_transfrom(element)//取得transfrom
            move_component_data.x = a.x - k.x//回推X
            move_component_data.y = a.y - k.y//回推Y
            component = svg.getElementById(element.id)//回傳物件ID
            move_component_data.id = element.id//紀錄id名
        });
    });
}

