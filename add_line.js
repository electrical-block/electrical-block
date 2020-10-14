var add_line_data = { add_line_flag: 0/*旗標*/, add_line_element: 0/*儲存當前物件*/ ,NS_element_pin:0/**儲存磁力的PIN物件*/};//add_line相關參數
var NS_line_flag = 0;// 0:沒有磁力 1:有磁力
var line_json = { id: 0, path: { d: "M 0 0 L 1 1", stroke: "#7cfc00", "stroke-width": "5", } };//線的JSON資料
pin_sys()
svg.addEventListener("mousemove", pin_line_move, false)
svg.addEventListener("mousedown", pin_line_down, false)

function pin_sys() {//pin_fun設定函數
    Array.from(document.getElementsByClassName('pin')).forEach(element => {
        element.removeEventListener("mousedown", pin_sys_fun, false)//刪全事件函數
        element.addEventListener("mousedown", pin_sys_fun, false)//加全事件函數
    })
}
function pin_sys_fun(e) {//給pin_sys()引用
    e.stopPropagation();//阻止冒泡
    var element = e.path[0];//取得該PIN父物件
    if (add_line_data.add_line_flag == 0) {//第一個點
        add_line_data.add_line_flag = 1;
        var j = get_pin_xy(element);//取得pin_XY參數
        var a = cli2svg(e)//取得滑鼠SVG_XY
        line_json.path.d = "M " + str(j.x) + " " + str(j.y) + " L " + str(a.x) + " " + str(a.y);//記憶第1個點&第二個點
        line_json.id = _uuid();
        add_line_data.add_line_element = add_component("g", line_json, line_main);//建立新物件 儲存物件
    } else {
        var j = get_pin_xy(element);//取得pin_XY參數
        const el = add_line_data.add_line_element.childNodes[0];
        var line_XY = el.getAttribute('d').split(" ")
        el.setAttribute('d', "M " + line_XY[1] + " " + line_XY[2] + " L " + String(j.x) + " " + String(j.y))//丟入第二個點XY
        add_line_data.add_line_element = 0;
        add_line_data.add_line_flag = 0;//旗標清除
    }
}

function pin_line_move(e) {
    if (add_line_data.add_line_flag == 1) {//線移動
        var pin_line_move_flag = 1;
        //////////////////////////////////////////////////////////////////////////////////////
        const el = add_line_data.add_line_element.childNodes[0];//記憶住的線
        var a = cli2svg(e)//取得滑鼠SVG_XY;
        var line_XY = el.getAttribute('d').split(" ")
        ////////////////////////////////////////////////////////線磁力//////////////////////////////////////////////
        Array.from(document.getElementsByClassName('pin')).forEach(any_pin => {//全pin物件forEach
            var pin_xy = get_pin_xy(any_pin)//記憶該pin_XY
            var L = Math.sqrt(Math.pow((a.x - pin_xy.x), 2) + Math.pow((a.y - pin_xy.y), 2))//計算距離
            if (L < length) {//距離過近
                el.setAttribute('d', "M " + line_XY[1] + " " + line_XY[2] + " L " + str(pin_xy.x) + " " + str(pin_xy.y))//丟入第二個點XY
                pin_line_move_flag = 0;
                NS_line_flag = 1;
                add_line_data.NS_element_pin=any_pin;
            }
        })
        if (pin_line_move_flag) {
            NS_line_flag = 0;
            add_line_data.NS_element_pin=0;
            el.setAttribute('d', "M " + line_XY[1] + " " + line_XY[2] + " L " + String(a.x) + " " + String(a.y))//丟入第二個點XY    
        }
    }
}
function pin_line_down(e) {
    if (NS_line_flag == 1 && add_line_data.NS_element_pin!=0) {
        add_line_data.add_line_element = 0;
        add_line_data.add_line_flag = 0;//旗標清除
        NS_line_flag = 0;
    }
}