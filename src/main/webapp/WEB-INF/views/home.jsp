<%--
  Created by IntelliJ IDEA.
  User: 1294
  Date: 2020/6/26
  Time: 13:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
	<meta charset="utf-8">
    <title>个人中心</title>
    <link rel="stylesheet" type="text/css" href="resource/css/home.css">
</head>
<body>
<%@include file="head.jsp"%>
<div class="mainbody">
	<div class="left">
		<ul>
			<div class="rectangle"></div>
			<div class="rectangle2"></div>
				<li id="personalMsg">个人资料</li>
			<div class="rectangle"></div>
			<div class="rectangle2"></div>
				<li id="personalBlog">个人博文</li>
			<div class="rectangle"></div>
			<div class="rectangle2"></div>
				<li id="myAttention">我的关注</li>
			<div class="rectangle"></div>
			<div class="rectangle2"></div>
			<div class="rectangle"></div>
			<div class="rectangle2"></div>
			<div class="rectangle"></div>
			<div class="rectangle2"></div>
			<div class="rectangle"></div>
			<div class="rectangle2"></div>
		</ul>
	</div>
	<div class="right">
		<div class="personalMsg" id="cPersonalMsg">
			<div class="personalMsg-top">
				<img id="head-img" src="${sessionScope.blogger.headPortrait}">
				<input type="file" id="head-portrait" style="display: block;height: 0px;width: 0px;" hidden>
				<a onclick="updateHeadProtrait()">更换头像</a>
			</div>
			<div class="personalMsg-bottom">
                    <input id="bloggerId" value="5" hidden>
					<p>用户名</p>
					<input type="text" id="name" value="${sessionScope.blogger.name}">
					<p>性别</p>
					<input type="" id="sex" value="${sessionScope.blogger.sex}"/>
					<p>职业</p>
					<input type="text" id="profession" list="pro" value="${sessionScope.blogger.profession}">
					<datalist id="pro">
						<option value="学生">
						<option value="教师">
						<option value="javaWeb开发工程师">
						<option value="web前端开发工程师">
						<option value="系统架构师">
						<option value="算法工程师">
						<option value="社会人">
					</datalist>
					<p>个人简介</p>
					<textarea id="introduction">${sessionScope.blogger.introduction}</textarea>
					<input type="button" name="submit"	onclick="updateMsg()" value="修改信息">
			</div>
		</div>
		<div class="personalBlog" id="cPersonalBlog">
			<div class="title">
				<span>我的博文</span>
			</div>
			<ul id="blog-ul">
				<c:forEach items="${blogs}" var="blog">
					<li><a href="<%=request.getContextPath()%>/read?id=${blog.id}">${blog.title}</a></li>
                    <a class="delete" onclick="deleteBlog(${blog.id})">删除</a>
				</c:forEach>
			</ul>
			<div class="cpage">
				<a  id="first-page" onclick="clickFirstPage()" style="display: none;">首页</a>
				<a  id="lastPage" onclick="clickLastPage()" style="display: none;">上一页</a>
				<a >第<span id="currentPage">1</span>页</a>
				<a  id="nextPage" onclick="clickNextPage()">下一页</a>
				<a id="endPage" onclick="clickEndPage()">跳至尾页</a>
				<a>共<span id="pageNum">${page.allPage}</span>页</a>
			</div>
		</div>
		<div class="myAttention" id="cAttention">
			<div class="title">
				<span>我的关注</span>
			</div>
			<div class="mainbody" id="mainBody">
				<c:forEach items="${attentionBloggers}" var="attentionBlogger">
					<div class="blogger">
						<div class="blogger-photo">
							<a href="<%=request.getContextPath()%>/personal?id=${attentionBlogger.id}"><img src="${attentionBlogger.headPortrait}"></a>
						</div>
						<div class="blogger-msg">
							<p>${attentionBlogger.name}</p>
							<p>${attentionBlogger.profession}</p>
						</div>
						<div class="introduction">
							<p>${attentionBlogger.introduction}</p>
						</div>
					</div>
				</c:forEach>
			</div>
			<div class="cpage">
				<a  id="att-first-page" onclick="clickFirstPageAtt()" style="display: none;">首页</a>
				<a  id="att-lastPage" onclick="clickLastPageAtt()" style="display: none;">上一页</a>
				<a >第<span id="att-currentPage">1</span>页</a>
				<a  id="att-nextPage" onclick="clickNextPageAtt()">下一页</a>
				<a id="att-endPage" onclick="clickEndPageAtt()">跳至尾页</a>
				<a>共<span id="att-pageNum">${attentionPage.allPage}</span>页</a>
			</div>
		</div>
	</div>
	<div style="font: 0px/0px sans-serif;clear: both;display: block"> </div>
</div>
<jsp:include page="foot.jsp"></jsp:include>
<script src="resource/js/jquery-2.2.3.min.js"></script>
<script src="resource/js/home.js"></script>
<script type="text/javascript">
</script>
</body>
</html>
