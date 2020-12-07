<%--
  Created by IntelliJ IDEA.
  User: 1294
  Date: 2020/6/24
  Time: 14:33
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
    <meta charset="utf-8">
    <% String resource = "resource";%>
    <link href="<%=resource%>/css/style.css" rel='stylesheet' type='text/css' />
</head>
<body>
<h1 class="title-agile text-center">欢迎光临</h1>
<section id="hire">
    <div class="content-top-agile">
        <h2>微</h2>
    </div>
    <div class="content-bottom">
        <form action="<%=request.getContextPath()%>/login" method="post">
            <div class="field name-box">
                <input type="text" id="name" name="name" placeholder="请输入用户名" required/>
                <label for="name">用户名</label>
            </div>
            <div class="field msg-box">
                <input  type="text" id="password" name="password" placeholder="请输入密码" required></input>
                <label for="password">密码</label>
            </div>

            <input class="button" type="submit" value="登陆" />
            <div class="bottom">
                <a id="register">立即注册</a>
                <a id="forget-password">忘记密码</a>
            </div>
        </form>
    </div>
</section>
<div class="copy-wthree">
    <p>© 2020 廖小生
        <a href="1294393090@qq.com" target="_blank">廖小生的QQ邮箱</a>
    </p>
</div>
<script src="resource/js/jquery-2.2.3.min.js"></script>
<script src="resource/js/contact.js"></script>
</body>
</html>
