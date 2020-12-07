<%--
  Created by IntelliJ IDEA.
  User: 1294
  Date: 2020/6/26
  Time: 21:34
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="zh">
<head>
    <meta charset="utf-8" />
    <title>Simple example - Editor.md examples</title>
    <% String resource= "resource";%>
    <link rel="stylesheet" href="<%=resource%>/views/editor/examples/css/style.css" />
    <link rel="stylesheet" href="<%=resource%>/views/editor/css/editormd.css" />
<%--    <link rel="shortcut icon" href="https://pandao.github.io/editor.md/favicon.ico" type="image/x-icon" />--%>
</head>
<%@include file="../../head.jsp"%>
<body>
<div id="layout">
    <header>
        <h1>编写博文</h1>
        <div class="container">
            <span>博文类型：</span>
            <select name="type" id="type">
                <option></option>
                <option value="java">java</option>
                <option value="mysql">mysql</option>
                <option value="dataStructure">数据结构</option>
                <option value="arithmetic">算法</option>
                <option value="html">html</option>
                <option value="javaScript">javascript</option>
                <option value="jQuery">jquery</option>
                <option value="other">其它</option>
            </select>
            <span>博文标题:</span>
            <input type="text" id="title" required="required">
            <input type="button" id="submit" value="提交" onclick="ajax()">
            <span id="msg"></span>
        </div>
        <p class="content"></p>
    </header>
    <div id="test-editormd">
                <textarea style="display:none;"></textarea>
    </div>
</div>
<script src="resource/views/editor/examples/js/jquery.min.js"></script>
<script src="resource/views/editor/editormd.min.js"></script>
<script type="text/javascript">
    var testEditor;
    var msg = document.getElementById('msg');
    $(function() {
        testEditor = editormd("test-editormd", {
            width   : "90%",
            height  : 500,
            syncScrolling : "single",
            path    : "resource/views/editor/lib/",
            imageUpload : true,
            imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            imageUploadURL : "<%=request.getContextPath()%>/uploadfile",
        });


    });
    function getContextPath(){
        var pathName = document.location.pathname;
        var index = pathName.substr(1).indexOf("/");
        var result = pathName.substr(0,index+1);
        return result;
    }
    <!-- 检验title   -->
    function checkTitle(title,type) {
        if(title==""&&type==""){
            msg.innerHTML = "请选择博客类型并输入博客标题";
        }
        if (title==""&&type!=""){
            msg.innerHTML = "请输入博客标题";
        }
        if (type==""&&title!=""){
            msg.innerHTML = "请选择博客类型";
        }
    }
    function ajax() {
        var path = getContextPath()+'/write';
        var content = $(".editormd-preview").html();
        var options=$("#type option:selected");
        var type = options.val();
        var title = $("#title").val();
        checkTitle(title,type);
        $.post(path,
        {
            title: title,
            type:  type,
            content: content
        },
        function (date,status) {
            if (date=="提交成功"){
                msg.innerHTML = "提交成功";
            }
        }
        )
    }
</script>
</body>
<%@include file="../../foot.jsp"%>
</html>