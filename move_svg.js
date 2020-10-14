/////////////////////////變數/////////////////////////////
var svg_data = { flag: 0, x: 0, y: 0, view_Dx: 0, view_Dy: 0 };
var view = svg.getAttribute('viewBox').split(" ")
/////////////////////////設定FUN/////////////////////////
svg.addEventListener("mousemove", mouse_move, false)
svg.addEventListener('wheel', mouse_wheel, false)//縮放滑輪
svg.addEventListener("mousedown", mouse_down, false)
document.addEventListener("mouseup", document_up, false)
///////////////////////////函數///////////////////////////////////
function mouse_wheel(e) {//縮放函式
    view = svg.getAttribute('viewBox').split(" ");
    if (e.deltaY<0) {//放大
        view[0] = String(int(view[0]) - (int(view[2]) * 0.05));
        view[1] = String(int(view[1]) - (int(view[3]) * 0.05));
        view[2] *= 1.1;
        view[3] *= 1.1;
    } else {        //縮小
        view[0] = String(int(view[0]) + (int(view[2]) * 0.05));
        view[1] = String(int(view[1]) + (int(view[3]) * 0.05));
        view[2] /= 1.1;
        view[3] /= 1.1;
    }
    svg.setAttribute('viewBox', view[0] + ' ' + view[1] + ' ' + view[2] + ' ' + view[3]);
}
function mouse_move(e) {//
    if (svg_data.flag == 1 && move_component_data.flag != 1) {//移動SVG
        //PS:由於是用為一疊加的瞬間值太小會被稀釋
        //////////////////////////////////////////////////////////////////////////////////////////////////
        svg_data.view_Dx = svg_data.view_Dx + ((svg_data.x - e.offsetX) * (int(view[2]) / 600));//將位移疊加進Dx
        svg_data.view_Dy = svg_data.view_Dy + ((svg_data.y - e.offsetY) * (int(view[3]) / 300));//將位移疊加進Dy
        svg_data.x = e.offsetX;//紀錄現在位置
        svg_data.y = e.offsetY;//紀錄現在位置
        view[0] = String(svg_data.view_Dx);
        view[1] = String(svg_data.view_Dy);
        svg.setAttribute('viewBox', view[0] + ' ' + view[1] + ' ' + view[2] + ' ' + view[3]);
        //////////////////////////////////////////////////////////////////////////////////////////////////
    }
}
function mouse_down(e) {
    e.stopPropagation();//阻止冒泡
    svg_data.flag = 1;
    view = svg.getAttribute('viewBox').split(" ");
    svg_data.view_Dx = int(view[0]);//記住按下時的位置
    svg_data.view_Dy = int(view[1]);
    svg_data.x = e.offsetX;//記住按下時的位置
    svg_data.y = e.offsetY;
}
function document_up() {
    svg_data.flag = 0;//清空旗標
}
////////////////////////////////////////////////////////////////////////////////////////////////



/**讀取move_component中的參數
 * 
 * 在
 * if (svg_data.flag == 1 && move_component_data.flag != 1) {//移動SVG
 * 
 * 
 * 
 */

