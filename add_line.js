var add_line_data = { add_line_flag: 0/*旗標*/, add_line_element: 0/*儲存當前物件*/ };//add_line相關參數
svg.addEventListener("mousemove", pin_line_move, false)
var pin_event_num = 0;
var line_json = { class: "line", id: _uuid(), x1: 0, y1: 0, x2: 10, y2: 10, stroke: "red", "stroke-width": 2 };//線的JSON資料
pin_sys()
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
        line_json.x1 = j.x//記憶第1個點XY
        line_json.y1 = j.y//記憶第1個點XY
        var a = cli2svg(e)//取得滑鼠SVG_XY
        line_json.x2 = a.x//記憶第2個點XY
        line_json.y2 = a.y//記憶第2個點XY
        add_line_data.add_line_element = add_component("line", line_json, line_main);//建立新物件 儲存物件
    } else {
        var j = get_pin_xy(element);//取得pin_XY參數
        const el = add_line_data.add_line_element;
        el.setAttribute("x2", String(j.x));//丟入第二個點X
        el.setAttribute("y2", String(j.y));//丟入第二個點Y
        add_line_data.add_line_element = 0;
        add_line_data.add_line_flag = 0;//旗標清除
    }
}

function pin_line_move(e) {
    if (add_line_data.add_line_flag == 1) {//線移動
        //////////////////////////////////////////////////////////////////////////////////////
        const el = add_line_data.add_line_element;//記憶住的線
        var a = cli2svg(e)//取得滑鼠SVG_XY;
        el.setAttribute("x2", String(a.x));//當前位置變化Line第二個點
        el.setAttribute("y2", String(a.y));//當前位置變化Line第二個點
        //////////////////////////////////////////////////////////////////////////////////////
    }
}