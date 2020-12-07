<%--
  Created by IntelliJ IDEA.
  User: 1294
  Date: 2020/6/27
  Time: 10:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>阅读</title>
	<% String resource = "resource"; %>
    <link rel="stylesheet" type="text/css" href="<%=resource%>/css/read.css">
	<link rel="stylesheet" href="<%=resource%>/views/editor/examples/css/style.css" />
	<link rel="stylesheet" href="<%=resource%>/views/editor/css/editormd.css" />
</head>
<body>
<jsp:include page="head.jsp"></jsp:include>
<div class="mainbody">
	<div class="left">
		<div class="blogMsg">
			<div class="top">
				<a href="<%=request.getContextPath()%>/personal?id=${bloggerR.id}">
					<img src="${bloggerR.headPortrait}">
				</a>
				<div id="blogger-id" hidden>${bloggerR.id}</div>
				<span>${bloggerR.name}</span>
			</div>
			<ul>
				<li>
					<div onclick="changeAttention()">
						<span id="attention-char"><c:choose><c:when test="${attRelation == 1}">取消关注</c:when><c:otherwise>关注</c:otherwise></c:choose></span>
					</div>
					<span id="attention-num">${attentionNum}</span>
				</li>
				<li>
					<span>文章</span>
					<div id="blog-id" hidden>${blog.id}</div>
					<span>${blogNum}</span>
				</li>
			</ul>
		</div>
	</div>
	<div class="right">
		<div class="separate-trunkone"></div>
		<div class="title">
			<b><span>${blog.title}</span></b>
		</div>
		<div class="blog-date-praise">
			<div class="blog-date">
				<span>文章发布时间:</span>
				<span>${publishTime}</span>
			</div>
			<div class="page-view">
				<img src="resource/images/pageview.png">
				<span>${blog.viewNum}</span>
			</div>
			<a id="blog-praise">
				<img  id="praise-img" src="resource/images/zanwhite.png" onclick="dealPraise()">
				<span id="praise-num">${blog.praiseNum}</span>
			</a>

		</div>
		<div class="content">${blog.content}</div>
	</div>
    <div class="separate-trunktwo"></div>
	<!--清除浮动-->
	<div style="font: 0px/0px sans-serif;clear: both;display: block"> </div>
</div>
<jsp:include page="foot.jsp"></jsp:include>
</body>
<script src="resource/js/jquery-2.2.3.min.js"></script>
<script type="text/javascript">
	//  关注
	var attentionChar = document.getElementById("attention-char");
	var attentionNum = document.getElementById("attention-num");
	var bloggerId = document.getElementById("blogger-id").innerHTML;
	var sessionBloggerId = document.getElementById("session-bloggerId").innerHTML;
	//  处理关注
	if (bloggerId == sessionBloggerId){	// 如果正在看自己文章,关注无效
		changeAttention = function () {}
	}
	function changeAttention() {
		if (attentionChar.innerHTML == "关注"){
			$.post(getContextPath()+"/personal",
					{
						id: bloggerId,
						type: 1
					},
					function(data,status){
						if (data == "关注成功"){
							attentionChar.innerHTML = "取消关注";
							attentionNum.innerHTML = parseInt(attentionNum.innerHTML)+1;
						}
					});
		}else {
			$.post(getContextPath()+"/personal",
					{
						id: bloggerId,
						type: 0
					},
					function(data,status){
						if (data == "取消关注成功"){
							attentionChar.innerHTML = "关注";
							attentionNum.innerHTML = parseInt(attentionNum.innerHTML)-1;
						}
					});
		}
	}
	//	处理点赞
	var praiseNum = document.getElementById("praise-num");
	var praiseImg = document.getElementById("praise-img");
	var blogId = document.getElementById("blog-id").innerHTML;
	//	如果该文章属于自己，则不能点赞
	if (bloggerId == sessionBloggerId){
		praiseNum.style.display = "none";
		praiseImg.style.display = "none";
	}

	function dealPraise() {
		if (praiseImg.src ==  "http://"+getLocationHost()+getContextPath()+"/resource/images/zanwhite.png"){

			$.post(getContextPath()+"/read",
					{
						id: blogId,
						type: 1
					},
					function(data,status){
						if (data == "点赞成功"){
							praiseImg.src = "resource/images/zanred.png";
							praiseNum.innerHTML = parseInt(praiseNum.innerHTML)+1;
						}
					});
		}else {
			$.post(getContextPath()+"/read",
					{
						id: blogId,
						type: 0
					},
					function(data,status){
						if (data == "取消点赞成功"){
							praiseImg.src = "resource/images/zanwhite.png";
							praiseNum.innerHTML = parseInt(praiseNum.innerHTML)-1;
						}
					});
		}
	}
	//	获取上下文路径
	function getContextPath(){
		var pathName = document.location.pathname;
		var index = pathName.substr(1).indexOf("/");
		var result = pathName.substr(0,index+1);
		return result;
	}
	//  获取当前窗口的主机名 例如:http://localhost:8080	window.location.host
	function getLocationHost() {
		return window.location.host;
	}

</script>
</html>

