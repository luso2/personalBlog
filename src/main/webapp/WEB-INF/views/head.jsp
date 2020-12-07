<%@ page import="javafx.application.Application" %><%--
  Created by IntelliJ IDEA.
  User: 1294
  Date: 2020/6/26
  Time: 8:16
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link href="resource/css/head.css" rel='stylesheet' type='text/css' />
</head>
<body>
<div class="deader">
    <div class="hcontent">
        <div class="nav">
            <ul>
                <a href="<%=request.getContextPath()%>/index"><li>回首页</li></a>
                <a href="<%=request.getContextPath()%>/write"><li>写博文</li></a>
<%--                <a href="resource/views/editor/examples/simple.html"><li>写博文</li></a>--%>
            </ul>
        </div>
        <div class="login">
                <a href="<%=request.getContextPath()%>/home">
                    <img  id="header-img" src="<c:choose>
                                    <c:when test="${sessionScope.blogger != null}">${sessionScope.blogger.headPortrait}</c:when>
                                    <c:otherwise>resource/images/headportrait.jpg</c:otherwise>
                                    </c:choose>"></a>
                <span id="header-blogger-name" style="font-weight: bold;color: rgb(56,3,87)"><c:if test="${sessionScope.blogger != null}">${sessionScope.blogger.name}</c:if></span>
                <a id="logout" style="color: rgba(52,118,123,0.67)" onclick="logout()">
                    <c:if test="${sessionScope.blogger != null}">注销</c:if>
                </a>
                <div id="session-bloggerId" hidden>${sessionScope.blogger.id}</div>
        </div>
    </div>
</div>
</body>
<script type="text/javascript">
function logout() {
    var path = getContextPath()+"/login/logout";
    $.post(
        path,
        function (data,status) {
            if (data == "注销成功"){
                var headerImg = document.getElementById("header-img");
                var headerBloggerName = document.getElementById("header-blogger-name");
                var logout = document.getElementById("logout");
                headerImg.src = "resource/images/headportrait.jpg";
                headerBloggerName.innerHTML = "";
                logout.innerHTML = "";
            }

        }
    )
}
//	获取上下文路径
function getContextPath(){
    var pathName = document.location.pathname;
    var index = pathName.substr(1).indexOf("/");
    var result = pathName.substr(0,index+1);
    return result;
}
</script>
</html>
