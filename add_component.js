//已完全隔離
function RX_data() {//回傳電阻_json
    return {
        path: { d: "M3.69-3.66c0-2.16,1.11-2.67,1.11-5.53s-3.35-3.81-3.58-4.55c-0.17-0.53-0.19-0.95-0.19-0.95s0.05-0.25-0.56-0.28s-1.49,0.28-1.49,0.28s-0.02,0.41-0.19,0.95C-1.45-13.01-4.8-12.06-4.8-9.2s1.11,3.37,1.11,5.53c0,0.99,0,6.05,0,7.04c0,2.16-1.11,2.67-1.11,5.53s3.35,3.81,3.58,4.55c0.17,0.53,0.19,0.95,0.19,0.95s-0.01,0.42,0.5,0.42s1.55-0.42,1.55-0.42s0.02-0.41,0.19-0.95c0.23-0.74,3.58-1.69,3.58-4.55S3.69,5.53,3.69,3.38C3.69,2.39,3.69-2.68,3.69-3.66z" }
        , circle: { class: "pin", cx: "0", cy: "-15" }
        , circle_: { class: "pin", cx: "0", cy: "15" }
        , class: "component_text", transform: "translate(50,50)", id: _uuid()
    }
}
function add_component(class_name/*物件型態*/, data/*JSON*/, and_id/*放置目標ID*/) {//建立新物件
    var c = document.createElementNS('http://www.w3.org/2000/svg', class_name.replace("_", ""));
    Object.keys(data).forEach(e => {
        if (typeof (data[e]) != "object") {//in
            c.setAttribute(e/*參數名*/, data[e]/*參數*/);
        }
    })
    var on_id = and_id.appendChild(c)
    Object.keys(data).forEach(e => {
        if (typeof (data[e]) == "object") {
            add_component(e, data[e], on_id)
        }
    })
    return on_id//回傳建立後的物件
}
function add_R() {
    var element=add_component("g", RX_data(), component_main);//加入電阻物件
    class_set_up(element)//class事件設定
    pin_sys()//pin事件設定
}