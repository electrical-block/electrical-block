var move_safe_data = { flag: 0, x: 0, y: 0, id: 0 };//move_safe相關參數
svg.addEventListener("mousemove", safe_move, false)
document.addEventListener("mouseup", document_up, false)
var safe = svg.getElementById('');
class_sys()
function safe_move(e) {
    if (move_safe_data.flag == 1) {//物件移動
        //////////////////////////////////////////////////////////////////////////////
        var a = cli2svg(e)//取得滑鼠SVG_XY
        safe.setAttribute('transform', "translate(" + String(a.x - move_safe_data.x) + "," + String(a.y - move_safe_data.y) + ")")//更新SVG_translate  
        /////////////////////////////////////////////////////////////////////////////
    }
}
function document_up(e) {//在網頁中放開執行
    move_safe_data.flag = 0;
}
function class_sys() {//設定class事件(ps:會重複觸發)
    Array.from(document.getElementsByClassName('safe_text')).forEach(element => {//刷Class物件
        element.addEventListener("mousedown", function (e) {
            move_safe_data.flag = 1;//移動物件旗標
            e.stopPropagation();//阻止冒泡
            var a = cli2svg(e)//取得滑鼠SVG_XY
            var k = get_transfrom(element)//取得transfrom
            move_safe_data.x = a.x - k.x//回推X
            move_safe_data.y = a.y - k.y//回推Y
            safe = svg.getElementById(element.id)//回傳物件ID
            move_safe_data.id = element.id//紀錄id名
        });
    });
}

