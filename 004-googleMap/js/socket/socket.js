/**
 * Created by liying30 on 2017/3/23.
 */

var ws =null;
/* ------------------------------------websocket接收实时数据-----------------------------------------------*/

if ('ws' in window) {
    console.log("ws");
    ws = new ReconnectingWebSocket("ws://192.168.23.1:2002");
}

// 当websocket创建成功时，即会触发onopen事件
ws.onopen = function () {
    console.log("Websocket Open");
};

// 当客户端收到服务端发来的消息时，会触发onmessage事件，参数evt.data中包含server传输过来的数据
ws.onmessage = function (evt)
{
    if(evt.data != undefined | evt.data != null)
    {
        var data = JSON.parse(evt.data);
        //var pointArray = data.result;
        console.log(data.result);
        processPlaneRealTimeData(data);
    }

};

// 当客户端收到服务端发送的关闭连接的请求时，触发onclose事件
ws.onclose = function (evt) {
    console.log("WebSocket Closed!");
};

// 如果出现连接，处理，接收，发送数据失败的时候就会触发onerror事件
ws.onerror = function (evt)
{
    console.log("WebSocket Error! begin to reconnection...");
    if ('ws' in window) {
        ws = new ReconnectingWebSocket("ws://192.168.23.1:2002");//更改地址
    }
};