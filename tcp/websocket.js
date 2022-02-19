//检查浏览器是否支持WebSocket
if(window.WebSocket)
{
    console.log('This browser supports WebSocket');
}
else
{
    console.log('This browser does not supports WebSocket');
    alert("This browser does not supports WebSocket");
}

/* websocket地址 */
//var wsUri ="ws://116.144.151:1001";
//var wsUri ="ws://192.168.240.138:1001";
var wsUri ="ws://120.27.12.119:1001";

/* 初始化Websocket */
var websocket;
function websocket_init()
{
    websocket = new WebSocket(wsUri); 
    websocket.onopen = function(evt) { 
        onOpen(evt) 
    };
    websocket.onclose = function(evt) { 
        onClose(evt) 
    };
    websocket.onmessage = function(evt) { 
        onMessage(evt) 
    };
    websocket.onerror = function(evt) { 
        onError(evt) 
    };
}

/* 打开连接成功回调 */
function onOpen(evt)
{
    console.log("WebSocket Connect OK!, ReadyState: " + websocket.readyState);
    var authMsg = "{\"type\":\"auth\",\"username\":\"" + username + "\"}";
    websocket_send(authMsg);
    window.setInterval(websocket_heartbeat, 30*1000);
}

/* Close回调 */
function onClose(evt)
{    
    console.log("WebSocket Disconnect!");
    websocket_init();
}

/* 收到数据回调 */
function onMessage(evt)
{
    console.log("WebSocket Recv: " + evt.data);
    var msgObj = JSON.parse(evt.data);
    var type = msgObj.type;
    var clientId = msgObj.clientId;
    var protocol = msgObj.protocol;
    var data = msgObj.data;
    var data_length = msgObj.data_length;
    var host = msgObj.host;
    var time = msgObj.time;

    if(type == "connect")
    {
        for(i=0; i<clientId.length; i++)
        {
            addClient(protocol, clientId[i], host[i]);
        }
    }
    else if(type == "message")
    {
        var client_list_id = "client_div___" + clientId;
        if(!document.getElementById(client_list_id))
        {
            addClient(protocol, clientId, host);
        }

        var recv_count_id = "recv_count___" + clientId;
        document.getElementById(recv_count_id).value = data_length + Number(document.getElementById(recv_count_id).value);

        var recv_box_id = "recv_box___" + clientId;
        if(document.getElementById(recv_box_id).value.length + data_length > 10000)
        {
            var hexrecv_checkbox_id = "hexrecv_checkbox___" + clientId;
            if(document.getElementById(hexrecv_checkbox_id).checked)  //以16进制显示
            {
                document.getElementById(recv_box_id).value = "[" + time + "]" + data + "\n";
            }
            else
            {
                document.getElementById(recv_box_id).value = "[" + time + "]" + hexCharCodeToStr(data) + "\n";
            }
        }
        else
        {
            var hexrecv_checkbox_id = "hexrecv_checkbox___" + clientId;
            if(document.getElementById(hexrecv_checkbox_id).checked)  //以16进制显示
            {
                document.getElementById(recv_box_id).value = document.getElementById(recv_box_id).value + "[" + time + "] " + data + "\n";
            }
            else
            {
                document.getElementById(recv_box_id).value = document.getElementById(recv_box_id).value + "[" + time + "] " + hexCharCodeToStr(data) + "\n";
            }
        }

    }
    else if(type == "close")
    {
        removeClientById(clientId);
    }
    else
    {
        console.log("WebSocket Error Type: " + type);
    }
}

/* 错误回调 */
function onError(evt)
{
    console.log("WebSocket Error: " + evt.data);
    // websocket_init();
}

function websocket_send(msg)
{
    websocket.send(msg);
    console.log("websocket Send: " + msg);
}

function websocket_heartbeat()
{
    var heart_json = {"type":"heartbeat","username":username};
    websocket.send(JSON.stringify(heart_json, null, 4));
    console.log("WebSocket HeartBeat");
}

function hexCharCodeToStr(hexCharCodeStr) 
{
    var len = hexCharCodeStr.length;
    if(len % 2 !== 0) 
    {
        console.log("Error HexString: " + hexCharCodeStr);
        return "";
    }
    console.log("HexString: " + hexCharCodeStr);
    var curCharCode;
    var resultStr = [];
    for(var i = 0; i < len; i = i + 2) 
    {
         curCharCode = parseInt(hexCharCodeStr.substr(i, 2), 16); 
         resultStr.push(String.fromCharCode(curCharCode));
    }
    console.log(resultStr);
    return resultStr.join("");
}


// DOM加载完成后，开始websocket连接
window.addEventListener("load", websocket_init, false);  
