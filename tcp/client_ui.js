/*
 * 往页面中添加一个客户端信息，包括左侧客户端条目、右侧操作面板
 */
function addClient(protocol, clientId, host)
{
	// 判断客户端是否已存在
	var client_div_id = "client_div___" + clientId;
	if(document.getElementById(client_div_id))
	{
		return;
	}

	/*
	 * 在TCP客户端列表面板添加一条在线客户端显示信息
	 */
	// 获取客户端列表的面板
	if(protocol == "TCP")
	{
		var ClientPanel = document.getElementById("tcp_client_panel");
		if(document.getElementById("tcpDefaultMsg"))
		{
			var tcpDefaultMsg = document.getElementById("tcpDefaultMsg")
			ClientPanel.removeChild(tcpDefaultMsg);
		}
	}
	else if(protocol == "UDP")
	{
		var ClientPanel = document.getElementById("udp_client_panel");
		if(document.getElementById("udpDefaultMsg"))
		{
			var udpDefaultMsg = document.getElementById("udpDefaultMsg");
			ClientPanel.removeChild(udpDefaultMsg);
		}
	}
	else
	{
		console.log("addClientToPage Error, illgal protocol: " + protocol);
	}
	
	// 创建一个div
	var div_button_body = document.createElement("div");
	div_button_body.className = "col-md-12 panel-body-button";
	div_button_body.id = "client_div___" + clientId;
	// 创建一个用于显示客户端信息按钮组的div
	var div_btn_group = document.createElement("div");
	div_btn_group.className = "btn-group btn-group-sm";
	div_button_body.appendChild(div_btn_group);
	// 在按钮组中创建一个用于显示协议的按钮
	var button_protocol = document.createElement("button");
	button_protocol.type = "button";
	button_protocol.className = "btn btn-default btn-protocol";
	if(protocol == "TCP")
	{
		button_protocol.innerHTML = "TCP";
	}
	else
	{
		button_protocol.innerHTML = "UDP";
	}
	div_btn_group.appendChild(button_protocol);
	// 在按钮组中创建一个用于显示客户端IP、端口信息和跳转table页面的标签
	var button_host = document.createElement("a");
	button_host.href = "#clientTab___" + clientId;
	button_host.className = "btn btn-success btn-host";
	button_host.setAttribute("data-toggle", "tab");
	button_host.innerHTML = host;
	button_host.onclick = show_select_client;
	div_btn_group.appendChild(button_host);
	//创建一个断开连接按钮
	var button_disconnect = document.createElement("button");
	button_disconnect.type = "button";
	button_disconnect.className = "btn btn-default btn-danger btn-disconnect";
	button_disconnect.innerHTML = "断开";
	button_disconnect.id = "button_disconnect___" + clientId;
	div_btn_group.appendChild(button_disconnect);
	button_disconnect.onclick = removeClientByClick;
	//将之前为选中状态的客户端修改为非选中状态

	var tcpActiveClient = document.getElementById("tcp_client_panel").getElementsByClassName("btn-success");
	console.log("Get TCP Active Client: " + tcpActiveClient.length);
	for(i=0; i<tcpActiveClient.length; i++)
	{
		tcpActiveClient[i].className = "btn btn-default btn-host";
	}

	var udpActiveClient = document.getElementById("udp_client_panel").getElementsByClassName("btn-success");
	console.log("Get UDP Active Client: " + udpActiveClient.length);
	for(i=0; i<udpActiveClient.length; i++)
	{
		udpActiveClient[i].className = "btn btn-default btn-host";
	}

	// 添加整个客户端状态信息
	ClientPanel.appendChild(div_button_body);


	/*
	 * 在页面中添加一个tab页，用于显示当前连接接收到的数据和其它信息
	 */
	 var clientTabPage = document.getElementById("clientTabPage");
	 // 创建整个模块的盒子
	 var tab_panel = document.createElement("div");
	 tab_panel.className = "tab-pane fade in active";
	 tab_panel.id = "clientTab___" + clientId;
	 //创建接收文本框
	 var recv_div = document.createElement("div");
	 recv_div.className = "col-md-12 column";
	 tab_panel.appendChild(recv_div);

	 var recv_box_div = document.createElement("div");
	 recv_box_div.className = "col-md-12 tab-element";
	 recv_div.appendChild(recv_box_div);

	 var recv_box = document.createElement("textarea");
	 recv_box.className = "box-recv";
	 recv_box.setAttribute("readonly","readonly");
	 recv_box.id = "recv_box___" + clientId;
	 recv_box_div.appendChild(recv_box);
	 // 创建统计框
	 var count_div = document.createElement("div");
	 count_div.className = "col-md-12 column";
	 tab_panel.appendChild(count_div);

	 // 接收统计
	 var count_div_recv = document.createElement("div");
	 count_div_recv.className = "col-md-4 column tab-element";
	 count_div.appendChild(count_div_recv);

	 var count_div_recv_inputGroup = document.createElement("div");
	 count_div_recv_inputGroup.className = "col-md-12 column input-group";
	 count_div_recv.appendChild(count_div_recv_inputGroup);

	 var span_head = document.createElement("span");
	 span_head.className = "input-group-addon";
	 span_head.innerHTML = "Recv:";
	 count_div_recv_inputGroup.appendChild(span_head);

	 var count_input = document.createElement("input");
	 count_input.type = "number";
	 count_input.className = "form-control";
	 count_input.setAttribute("readonly","readonly");
	 count_input.id = "recv_count___" + clientId;
	 count_input.value = 0;
	 count_div_recv_inputGroup.appendChild(count_input);

	 var span_tail = document.createElement("span");
	 span_tail.className = "input-group-addon";
	 span_tail.innerHTML = "B";
	 count_div_recv_inputGroup.appendChild(span_tail);
	 //发送统计
	 var count_div_send = document.createElement("div");
	 count_div_send.className = "col-md-4 column tab-element";
	 count_div.appendChild(count_div_send);

	 var count_div_send_inputGroup = document.createElement("div");
	 count_div_send_inputGroup.className = "col-md-12 column input-group";
	 count_div_send.appendChild(count_div_send_inputGroup);

	 var span_send_head = document.createElement("span");
	 span_send_head.className = "input-group-addon";
	 span_send_head.innerHTML = "Send:";
	 count_div_send_inputGroup.appendChild(span_send_head);

	 var send_count_input = document.createElement("input");
	 send_count_input.type = "number";
	 send_count_input.className = "form-control";
	 send_count_input.setAttribute("readonly","readonly");
	 send_count_input.id = "send_count___" + clientId;
	 send_count_input.value = 0;
	 count_div_send_inputGroup.appendChild(send_count_input);

	 var send_span_tail = document.createElement("span");
	 send_span_tail.className = "input-group-addon";
	 send_span_tail.innerHTML = "B";
	 count_div_send_inputGroup.appendChild(send_span_tail);


	 // 添加16进制接收、发送选择框
	 var hexbutton_group = document.createElement("div");
	 hexbutton_group.className = "col-md-4 column tab-element";
	 count_div.appendChild(hexbutton_group);

 	 var hexbuttoncheck = document.createElement("div");
	 hexbuttoncheck.className = "col-md-12 column input-group";
	 hexbutton_group.appendChild(hexbuttoncheck);

	 var span_checkbox = document.createElement("span");
	 span_checkbox.className = "input-group-addon";
	 hexbuttoncheck.appendChild(span_checkbox);
	 // 创建HEX发送勾选用的checkbox
	 var input_checkbox = document.createElement("input");
	 input_checkbox.type = "checkbox";
	 input_checkbox.id = "hexsend_checkbox___" + clientId;
	 span_checkbox.appendChild(input_checkbox);
	 // 创建“HEX发送”文本框
	 var span_tip1 = document.createElement("span");
	 span_tip1.className = "input-group-addon hex-tip";
	 span_tip1.innerHTML = "HEX发送";
	 hexbuttoncheck.appendChild(span_tip1);

	 var span_checkbox = document.createElement("span");
	 span_checkbox.className = "input-group-addon";
	 hexbuttoncheck.appendChild(span_checkbox);
	 // 创建HEX接收勾选用的checkbox
	 var input_checkbox = document.createElement("input");
	 input_checkbox.type = "checkbox";
	 input_checkbox.id = "hexrecv_checkbox___" + clientId;
	 span_checkbox.appendChild(input_checkbox);
	 // 创建“HEX接收”文本框
	 var span_tip1 = document.createElement("span");
	 span_tip1.className = "input-group-addon hex-tip";
	 span_tip1.innerHTML = "HEX接收";
	 hexbuttoncheck.appendChild(span_tip1);

	 // var hexbuttoncheck = document.createElement("div");
	 // hexbuttoncheck.className = "col-md-12 column btn-group";
	 // hexbuttoncheck.setAttribute("data-toggle", "buttons");
	 // hexbutton_group.appendChild(hexbuttoncheck);

	 // var label = document.createElement("label");
	 // label.className = "btn btn-primary btn-block col-md-6 column";
	 // hexbuttoncheck.appendChild(label);

	 // var input = document.createElement("input");
	 // input.type = "checkbox";
	 // input.value = "HEX发送";
	 // input.id = "hexsend_checkbox___" + clientId;
	 // label.appendChild(input);

	 // var label = document.createElement("label");
	 // label.className = "btn btn-primary btn-block col-md-6 column";
	 // hexbuttoncheck.appendChild(label);

	 // var input = document.createElement("input");
	 // input.type = "checkbox";
	 // input.value = "HEX接收";
	 // input.id = "hexrecv_checkbox___" + clientId;
	 // label.appendChild(input);


	 // 创建发送文本框
	 var send_div = document.createElement("div");
	 send_div.className = "col-md-12 column";
	 tab_panel.appendChild(send_div);

	 var send_box_div = document.createElement("div");
	 send_box_div.className = "col-md-10 tab-element";
	 send_div.appendChild(send_box_div);

	 var send_box = document.createElement("textarea");
	 send_box.className = "box-send";
	 send_box.id = "send_box___" + clientId;
	 send_box_div.appendChild(send_box);

	  // 创建发送按钮
	 var send_button_div = document.createElement("div");
	 send_button_div.className = "col-md-2 column tab-element";
	 send_div.appendChild(send_button_div);

	 var send_button = document.createElement("button");
	 send_button.className = "btn btn-primary btn-block";
	 send_button.type = "button";
	 send_button.id = "send_button___" + clientId;
	 send_button.innerHTML = "发送";
	 send_button.style="min-height: 100px;margin:5px";
	 send_button.onclick = sendData;
	 send_button_div.appendChild(send_button);

	 // 创建按钮组
	 var button_line_div = document.createElement("div");
	 button_line_div.className = "col-md-12 column";
	 tab_panel.appendChild(button_line_div);


	 // 创建循环按钮组合
	 var button_group_div = document.createElement("div");
	 button_group_div.className = "col-md-5 column tab-element";
	 button_line_div.appendChild(button_group_div);

	 var auto_send_group = document.createElement("div");
	 auto_send_group.className = "col-md-12 column input-group";
	 button_group_div.appendChild(auto_send_group);

	 var span_checkbox2 = document.createElement("span");
	 span_checkbox2.className = "input-group-addon";
	 auto_send_group.appendChild(span_checkbox2);
	 // 创建定时发送勾选用的checkbox
	 var input_checkbox = document.createElement("input");
	 input_checkbox.type = "checkbox";
	 input_checkbox.id = "auto_send_checkbox___" + clientId;
	 input_checkbox.onclick = timer_send_handler;
	 span_checkbox2.appendChild(input_checkbox);
	 // 创建“定时发送”文本框
	 var span_tip1 = document.createElement("span");
	 span_tip1.className = "input-group-addon";
	 span_tip1.innerHTML = "定时发送";
	 auto_send_group.appendChild(span_tip1);
	 // 创建定时发送间隔输出框
	 var input_interval = document.createElement("input");
	 input_interval.type = "text";
	 input_interval.className = "form-control";
	 input_interval.id = "input_interval___" + clientId;
	 input_interval.readOnly = ""
	 auto_send_group.appendChild(input_interval);
	 // 创建“ms”文本框
	 var span_tip2 = document.createElement("span");
	 span_tip2.className = "input-group-addon";
	 span_tip2.innerHTML = "ms";
	 auto_send_group.appendChild(span_tip2);
	 // 创建发送次数输出框
	 var input_count = document.createElement("input");
	 input_count.type = "text";
     input_count.className = "form-control";
	 input_count.id = "input_count___" + clientId;
	 auto_send_group.appendChild(input_count);
	 // 创建“次”文本框
	 var span_tip3 = document.createElement("span");
	 span_tip3.className = "input-group-addon";
	 span_tip3.innerHTML = "次";
	 auto_send_group.appendChild(span_tip3);


	 // 创建随机字符串按钮组合
	 var button_group_random_div = document.createElement("div");
	 button_group_random_div.className = "col-md-4 column tab-element";
	 button_line_div.appendChild(button_group_random_div);

	 var auto_send_random_group = document.createElement("div");
	 auto_send_random_group.className = "col-md-12 column input-group";
	 button_group_random_div.appendChild(auto_send_random_group);

	//创建checkbox
	 var span_checkbox3 = document.createElement("span");
	 span_checkbox3.className = "input-group-addon";
	 auto_send_random_group.appendChild(span_checkbox3);

 	// 创建定时发送勾选用的checkbox
	 var input_random_checkbox = document.createElement("input");
	 input_random_checkbox.type = "checkbox";
	 input_random_checkbox.id = "auto_send_random_checkbox___" + clientId;
	 input_random_checkbox.onclick = random_string_check;
	 span_checkbox3.appendChild(input_random_checkbox);
	 // 创建“定时发送”文本框
	 var span_tip4 = document.createElement("span");
	 span_tip4.className = "input-group-addon";
	 span_tip4.innerHTML = "随机字符串长度";
	 auto_send_random_group.appendChild(span_tip4);
	 // 创建定时发送间隔输出框
	 var input_random_length = document.createElement("input");
	 input_random_length.type = "text";
	 input_random_length.className = "form-control";
	 input_random_length.id = "input_random_length___" + clientId;
	 input_random_length.readOnly = ""
	 auto_send_random_group.appendChild(input_random_length);

	 // 创建递增按钮组合
	 var button_group_increase_div = document.createElement("div");
	 button_group_increase_div.className = "col-md-3 column tab-element";
	 button_line_div.appendChild(button_group_increase_div);

	 var auto_send_increase_group = document.createElement("div");
	 auto_send_increase_group.className = "col-md-12 column input-group";
	 button_group_increase_div.appendChild(auto_send_increase_group);

	 var span_checkbox4 = document.createElement("span");
	 span_checkbox4.className = "input-group-addon";
	 auto_send_increase_group.appendChild(span_checkbox4);
 	// 创建递增发送勾选用的checkbox
	 var input_increase_checkbox = document.createElement("input");
	 input_increase_checkbox.type = "checkbox";
	 input_increase_checkbox.id = "auto_send_increase_checkbox___" + clientId;
	 input_increase_checkbox.onclick = increase_value_check;
	 span_checkbox4.appendChild(input_increase_checkbox);
	 // 创建“递增起始”文本框
	 var span_tip5 = document.createElement("span");
	 span_tip5.className = "input-group-addon";
	 span_tip5.innerHTML = "递增起始值";
	 auto_send_increase_group.appendChild(span_tip5);
	 // 创建递增起始值输出框
	 var input_increase_value = document.createElement("input");
	 input_increase_value.type = "text";
	 input_increase_value.className = "form-control";
	 input_increase_value.id = "input_increase_value___" + clientId;
	 input_increase_value.readOnly = ""
	 auto_send_increase_group.appendChild(input_increase_value);
	 	

	  // 创建按钮组
	  var button_clearline_div = document.createElement("div");
	  button_clearline_div.className = "col-md-12 column";
	  tab_panel.appendChild(button_clearline_div);


	 // 创建清空接收按钮
	 var clear_recv_div = document.createElement("div");
	 clear_recv_div.className = "col-md-4 column tab-element";
	 button_clearline_div.appendChild(clear_recv_div);

	 var clear_recv_button = document.createElement("button");
	 clear_recv_button.type = "button";
	 clear_recv_button.className = "btn btn-primary btn-block";
	 clear_recv_button.innerHTML = "清空接收"
	 clear_recv_button.id = "clear_recv_button___" + clientId;
	 clear_recv_button.onclick = clearRecvBoxByClick;
	 clear_recv_div.appendChild(clear_recv_button);

	 // 创建清空发送按钮
	 var clear_send_div = document.createElement("div");
	 clear_send_div.className = "col-md-4 column tab-element";
	 button_clearline_div.appendChild(clear_send_div);

	 var clear_send_button = document.createElement("button");
	 clear_send_button.type = "button";
	 clear_send_button.className = "btn btn-primary btn-block";
	 clear_send_button.innerHTML = "清空发送";
	 clear_send_button.id = "clear_send_button___" + clientId;
	 clear_send_button.onclick = clear_send_box;
	 clear_send_div.appendChild(clear_send_button);

	 // 创建清空统计按钮
	 var clear_count_div = document.createElement("div");
	 clear_count_div.className = "col-md-4 column tab-element";
	 button_clearline_div.appendChild(clear_count_div);

	 var clear_count_button = document.createElement("button");
	 clear_count_button.type = "button";
	 clear_count_button.className = "btn btn-primary btn-block";
	 clear_count_button.innerHTML = "清空统计";
	 clear_count_button.id = "clear_count_button___" + clientId;
	 clear_count_button.onclick = clear_count_info;
	 clear_count_div.appendChild(clear_count_button);

	 // 将整个tab页面添加到table页中
	 var activeTablePage = clientTabPage.getElementsByClassName("in active");
	 for(i=0; i<activeTablePage.length; i++)
	 {
	 	activeTablePage[i].className = "tab-pane fade";
	 }
	 // 将当前添客户端设置为当前激活tab页
	 clientTabPage.appendChild(tab_panel);
}


/*
 * 客户端条目点击时响应函数，将其它选中条目设置为非选中状态，当前条目配色为选中状态
 */
function show_select_client()
{
	var tcpActiveClient = document.getElementById("tcp_client_panel").getElementsByClassName("btn-success");
	console.log("Get TCP Active Client: " + tcpActiveClient.length);
	for(i=0; i<tcpActiveClient.length; i++)
	{
		tcpActiveClient[i].className = "btn btn-default btn-host";
	}

	var udpActiveClient = document.getElementById("udp_client_panel").getElementsByClassName("btn-success");
	console.log("Get UDP Active Client: " + udpActiveClient.length);
	for(i=0; i<udpActiveClient.length; i++)
	{
		udpActiveClient[i].className = "btn btn-default btn-host";
	}

	this.className = "btn btn-success btn-host active";
}



function removeClientByClick()
{
	var elementId = this.id;
	var clientId = elementId.split("___")[1];

	console.log("RemoveClient, ID: " + clientId);
	var client_list_id = "client_div___" + clientId;
	if(document.getElementById(client_list_id))
	{
		var client_list = document.getElementById(client_list_id);
		client_list.parentNode.removeChild(client_list);
	}
	
	var client_tab_id = "clientTab___" + clientId;
	if(document.getElementById(client_tab_id))
	{
		var client_tab = document.getElementById(client_tab_id);
		client_tab.parentNode.removeChild(client_tab);
	}

	var tcpClient = document.getElementById("tcp_client_panel").getElementsByTagName("a");
	var udpClient = document.getElementById("udp_client_panel").getElementsByTagName("a");
	var tcp_p_tag = document.getElementById("tcp_client_panel").getElementsByTagName("p");
	var udp_p_tag = document.getElementById("udp_client_panel").getElementsByTagName("p");
	console.log("tcpClient Count: " + tcpClient.length);
	console.log("udpClient Count: " + udpClient.length);

	if(tcpClient.length == 0 && tcp_p_tag.length == 0)
	{
		var p_element = document.createElement("p");
		p_element.innerHTML = "当前没有在线客户端";
		p_element.id = "tcpDefaultMsg";
		document.getElementById("tcp_client_panel").appendChild(p_element);
	}

	if(udpClient.length == 0 && udp_p_tag.length == 0)
	{
		var p_element = document.createElement("p");
		p_element.innerHTML = "当前没有在线客户端";
		p_element.id = "udpDefaultMsg";
		document.getElementById("udp_client_panel").appendChild(p_element);
	}

	/*
	 * 添加向服务器发送数据动作
	 */
	 var close_msg_json = {"type":"close","clientId":clientId};
	 websocket_send(JSON.stringify(close_msg_json, null, 4));
}

function removeClientByBtnId(clientBtnId)
{
	var clientId = clientBtnId.split("___")[1];

	console.log("RemoveClient, ID: " + clientId);
	var client_list_id = "client_div___" + clientId;
	if(document.getElementById(client_list_id))
	{
		var client_list = document.getElementById(client_list_id);
		client_list.parentNode.removeChild(client_list);
	}
	
	var client_tab_id = "clientTab___" + clientId;
	if(document.getElementById(client_tab_id))
	{
		var client_tab = document.getElementById(client_tab_id);
		client_tab.parentNode.removeChild(client_tab);
	}

	var tcpClient = document.getElementById("tcp_client_panel").getElementsByTagName("a");
	var udpClient = document.getElementById("udp_client_panel").getElementsByTagName("a");
	var tcp_p_tag = document.getElementById("tcp_client_panel").getElementsByTagName("p");
	var udp_p_tag = document.getElementById("udp_client_panel").getElementsByTagName("p");
	console.log("tcpClient Count: " + tcpClient.length);
	console.log("udpClient Count: " + udpClient.length);

	if(tcpClient.length == 0 && tcp_p_tag.length == 0)
	{
		var p_element = document.createElement("p");
		p_element.innerHTML = "当前没有在线客户端";
		p_element.id = "tcpDefaultMsg";
		document.getElementById("tcp_client_panel").appendChild(p_element);
	}

	if(udpClient.length == 0 && udp_p_tag.length == 0)
	{
		var p_element = document.createElement("p");
		p_element.innerHTML = "当前没有在线客户端";
		p_element.id = "udpDefaultMsg";
		document.getElementById("udp_client_panel").appendChild(p_element);
	}

	/*
	 * 添加向服务器发送数据动作
	 */
	 var close_msg_json = {"type":"close","clientId":clientId};
	 websocket_send(JSON.stringify(close_msg_json, null, 4));
}



function removeClientById(clientId)
{
	// var elementId = this.id;
	// var clientId = elementId.split("___")[1];

	console.log("RemoveClient, ID: " + clientId);
	var client_list_id = "client_div___" + clientId;
	if(document.getElementById(client_list_id))
	{
		var client_list = document.getElementById(client_list_id);
		client_list.parentNode.removeChild(client_list);
	}
	
	var client_tab_id = "clientTab___" + clientId;
	if(document.getElementById(client_tab_id))
	{
		var client_tab = document.getElementById(client_tab_id);
		client_tab.parentNode.removeChild(client_tab);
	}
	
	var tcpClient = document.getElementById("tcp_client_panel").getElementsByTagName("a");
	var udpClient = document.getElementById("udp_client_panel").getElementsByTagName("a");
	var tcp_p_tag = document.getElementById("tcp_client_panel").getElementsByTagName("p");
	var udp_p_tag = document.getElementById("udp_client_panel").getElementsByTagName("p");
	console.log("tcpClient Count: " + tcpClient.length);
	console.log("udpClient Count: " + udpClient.length);

	if(tcpClient.length == 0 && tcp_p_tag.length == 0)
	{
		var p_element = document.createElement("p");
		p_element.innerHTML = "当前没有在线客户端";
		p_element.id = "tcpDefaultMsg";
		document.getElementById("tcp_client_panel").appendChild(p_element);
	}

	if(udpClient.length == 0 && udp_p_tag.length == 0)
	{
		var p_element = document.createElement("p");
		p_element.innerHTML = "当前没有在线客户端";
		p_element.id = "udpDefaultMsg";
		document.getElementById("udp_client_panel").appendChild(p_element);
	}
	
}

function removeAllClientByClick()
{
	var elements = document.getElementById("udp_client_panel")
	var oButt=elements.getElementsByClassName("btn btn-default btn-danger btn-disconnect");
	var i=0;
	var length = oButt.length;
	for(i=length;i>0;i--)
	{
		console.log("disconnet_udp_client:"+oButt[i-1].id);
		removeClientByBtnId(oButt[i-1].id);
	};
}

function clearRecvBoxById(clientId)
{
	var recv_box_id = "recv_box___" + clientId;
	document.getElementById(recv_box_id).value = "";
}


function clearRecvBoxByClick()
{
	var clientId = this.id.split("___")[1];
	var recv_box_id = "recv_box___" + clientId;
	document.getElementById(recv_box_id).value = "";
}


function sendData()
{

	

	var clientId = this.id.split("___")[1];

	var random_input_id = "auto_send_random_checkbox___" + clientId;
	
	var send_box_id = "send_box___" + clientId;
	var send_increase_checkbox_id = "auto_send_increase_checkbox___" + clientId;

	if(document.getElementById(random_input_id).checked)
	{
		var random_input_length_id = "input_random_length___" + clientId;
		var length =  Number(document.getElementById(random_input_length_id).value);
		var random = randomString(length);
		document.getElementById(send_box_id).value = random;
		
	}
	else if(document.getElementById(send_increase_checkbox_id).checked)
		{
			var input_increase_value_id = "input_increase_value___" + clientId;
			var value =  Number(document.getElementById(input_increase_value_id).value);
			document.getElementById(send_box_id).value = value;
			document.getElementById(input_increase_value_id).value = ++value;
		}

	
	var data = document.getElementById(send_box_id).value;
	if(websocket.readyState == 1)
	{
		var hexsend_checkbox_id = "hexsend_checkbox___" + clientId;
		if(document.getElementById(hexsend_checkbox_id).checked)
		{
			var json_msg = {"username":username,"type":"message","data":data,"clientId":clientId,"datatype":"hexstring"};
			var data_length = Math.ceil(data.length/2);
		}
		else
		{
			var json_msg = {"username":username,"type":"message","data":data,"clientId":clientId};
			var data_length = data.length;
		}
		
		websocket_send(JSON.stringify(json_msg, null, 4));
	}

	var send_count_id = "send_count___" + clientId;
	document.getElementById(send_count_id).value = data_length + Number(document.getElementById(send_count_id).value);
}

function clear_send_box()
{
	var clientId = this.id.split("___")[1];
	var send_box_id = "send_box___" + clientId;
	document.getElementById(send_box_id).value = "";
}


function clear_count_info()
{
	var clientId = this.id.split("___")[1];
	var send_count_id = "send_count___" + clientId;
	document.getElementById(send_count_id).value = 0;

	var recv_count_id = "recv_count___" + clientId;
    document.getElementById(recv_count_id).value = 0;
}


function random_string_check()
{
	var clientId = this.id.split("___")[1];
	var random_input_length_id = "input_random_length___" + clientId;
	var send_box_id = "send_box___" + clientId;

	var send_increase_checkbox_id = "auto_send_increase_checkbox___" + clientId;
	var input_increase_value_id = "input_increase_value___" + clientId;
	
	var length =  Number(document.getElementById(random_input_length_id).value);

	if(length>0)
	{
		document.getElementById(random_input_length_id).readOnly = this.checked?"readOnly":"";
		document.getElementById(send_box_id).value = ""
		document.getElementById(send_box_id).readOnly = this.checked?"readOnly":"";
		document.getElementById(send_increase_checkbox_id).checked = false;
		document.getElementById(input_increase_value_id).readOnly = "";
		
	}
	else
	{
		this.checked = false;
	}
}

function increase_value_check()
{
	var clientId = this.id.split("___")[1];
	var input_increase_value_id = "input_increase_value___" + clientId;
	var send_box_id = "send_box___" + clientId;
	var random_input_id = "auto_send_random_checkbox___" + clientId;
	var random_input_length_id = "input_random_length___" + clientId;
	var value = document.getElementById(input_increase_value_id).value.trim();
	if(value !== "")
	{
		var length =  Number(value);
		document.getElementById(input_increase_value_id).readOnly = this.checked?"readOnly":"";
		document.getElementById(send_box_id).value = ""
		document.getElementById(send_box_id).readOnly = this.checked?"readOnly":"";
		document.getElementById(random_input_id).checked = false;
		document.getElementById(random_input_length_id).readOnly = "";
	}
	else
	{
		this.checked = false;
	}
}


function randomString(e) {  
  e = e || 32;
  var t = "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
  a = t.length,
  n = "";
  for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n
}


var send_timer = new Array();
function timer_send_handler()
{
	var clientId = this.id.split("___")[1];
	var interval_id = "input_interval___" + clientId;
	var count_id =  "input_count___" + clientId;
	if(this.checked)
	{
		var interval = Number(document.getElementById(interval_id).value);
		console.log("Start Timer Send, Client: " + clientId + "Interval: " + interval);
		document.getElementById(interval_id).readOnly = "readOnly";
		document.getElementById(count_id).readOnly = "readOnly";

		
		send_timer[clientId] = window.setInterval(function(){

		var random_input_id = "auto_send_random_checkbox___" + clientId;
		var send_increase_checkbox_id = "auto_send_increase_checkbox___" + clientId;
		
		var send_box_id = "send_box___" + clientId;

		var interval_input_id = "auto_send_checkbox___" + clientId;


	
			var send_count_content =  document.getElementById(count_id).value.trim();
			var count = send_count_content === ""?-1:Number(document.getElementById(count_id).value)

		if(document.getElementById(random_input_id).checked&&count>-1&&count>0)
		{
			var random_input_length_id = "input_random_length___" + clientId;
			var length =  Number(document.getElementById(random_input_length_id).value);
			var random = randomString(length);
			document.getElementById(send_box_id).value = random;
		
		}
		else if(document.getElementById(send_increase_checkbox_id).checked&&count>-1&&count>0)
		{
			var input_increase_value_id = "input_increase_value___" + clientId;
			var value =  Number(document.getElementById(input_increase_value_id).value);
			document.getElementById(send_box_id).value = value;
			document.getElementById(input_increase_value_id).value = ++value;
		}
						
			if(document.getElementById(send_box_id)&&interval>0&&count>-1&&count>0)
			{
				var data = document.getElementById(send_box_id).value;
				if(websocket.readyState == 1)
				{
					var hexsend_checkbox_id = "hexsend_checkbox___" + clientId;
					if(document.getElementById(hexsend_checkbox_id).checked)
					{
						var json_msg = {"username":username,"type":"message","data":data,"clientId":clientId,"datatype":"hexstring"};
						var data_length = Math.ceil(data.length/2);
					}
					else
					{
						var json_msg = {"username":username,"type":"message","data":data,"clientId":clientId};
						var data_length = data.length;
					}
					websocket_send(JSON.stringify(json_msg, null, 4));
				}

				var send_count_id = "send_count___" + clientId;
				document.getElementById(send_count_id).value = data_length + Number(document.getElementById(send_count_id).value);
				document.getElementById(count_id).value = --count;
				

			}
			else
			{
				window.clearInterval(send_timer[clientId]);
				document.getElementById(interval_id).readOnly = "";
				document.getElementById(count_id).readOnly = "";
				document.getElementById(random_input_id).checked = false;
				document.getElementById(interval_input_id).checked = false;
				
				
				
			}
			
		}, interval);
	}
	else
	{
		console.log("Stop Timer, clientId: " + clientId);
		window.clearInterval(send_timer[clientId]);
		document.getElementById(interval_id).readOnly = "";
		document.getElementById(count_id).readOnly = "";
	}
}


function autoSendClientData()
{
	clientId = this.id.split("___")[1];
	var send_box_id = "send_box___" + clientId;
	var data = document.getElementById(send_box_id).value;
	if(websocket.readyState == 1)
	{
		var json_msg = {"username":username,"type":"message","data":data,"clientId":clientId};
		websocket_send(JSON.stringify(json_msg, null, 4));
	}

	var send_count_id = "send_count___" + clientId;
	document.getElementById(send_count_id).value = data.length + Number(document.getElementById(send_count_id).value);
}


