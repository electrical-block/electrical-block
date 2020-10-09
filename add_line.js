var add_line_data = { add_line_flag: 0/*旗標*/, add_line_element: 0/*儲存當前物件*/ };//add_line相關參數
svg.addEventListener("mousemove", pin_line_move, false)
var pin_event_num = 0;
var line_json = {id:0,path:{d:"M 0 0 L 1 1",stroke:"#3b8ed7","stroke-width":"5",}};//線的JSON資料


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
        var a = cli2svg(e)//取得滑鼠SVG_XY
        line_json.path.d="M "+str(j.x)+" "+str(j.y)+" L "+str(a.x)+" "+str(a.y);//記憶第1個點&第二個點
        line_json.id = _uuid();
        add_line_data.add_line_element = add_component("g", line_json, line_main);//建立新物件 儲存物件
    } else {
        var j = get_pin_xy(element);//取得pin_XY參數
        const el = add_line_data.add_line_element.childNodes[0];
        var line_XY = el.getAttribute('d').split(" ")
        el.setAttribute('d',"M "+line_XY[1]+" "+line_XY[2]+" L "+String(j.x)+" "+String(j.y))//丟入第二個點XY
        add_line_data.add_line_element = 0;
        add_line_data.add_line_flag = 0;//旗標清除
    }
}

function pin_line_move(e) {
    if (add_line_data.add_line_flag == 1) {//線移動
        //////////////////////////////////////////////////////////////////////////////////////
        const el = add_line_data.add_line_element.childNodes[0];//記憶住的線
        var a = cli2svg(e)//取得滑鼠SVG_XY;
        var line_XY = el.getAttribute('d').split(" ")
        el.setAttribute('d',"M "+line_XY[1]+" "+line_XY[2]+" L "+String(a.x)+" "+String(a.y))//丟入第二個點XY
        //////////////////////////////////////////////////////////////////////////////////////
    }
}