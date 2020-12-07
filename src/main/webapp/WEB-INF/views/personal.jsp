<%--
  Created by IntelliJ IDEA.
  User: 1294
  Date: 2020/6/27
  Time: 12:46
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <% String resource = "resource";%>
    <link rel="stylesheet" type="text/css" href="<%=resource%>/css/personal.css">
</head>
<body>
<jsp:include page="head.jsp"></jsp:include>
<div class="mainbody">
    <div class="left">
        <div class="blogMsg">
            <div class="top">
                <a href="<%=request.getContextPath()%>/personal?id=${blogger.id}">
                    <img src="${blogger.headPortrait}">
                </a>
                <div id="blogger-id" hidden>${blogger.id}</div>
                <span id="blogger-name">${blogger.name}</span>
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
                    <span>${blogNum}</span>
                </li>
            </ul>
        </div>
    </div>
    <div class="right">
        <div class="personalBlog" id="cPersonalBlog">
            <div class="title">
                <span>TA的博文</span>
            </div>
            <ul id="blog-ul">
                <c:forEach items="${blogs}" var="blog">
                    <li><a href="<%=request.getContextPath()%>/read?id=${blog.id}">${blog.title}</a></li>
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
    </div>
    <div style="font: 0px/0px sans-serif;clear: both;display: block"> </div>
</div>
<jsp:include page="foot.jsp"></jsp:include>
</body>
<script src="resource/js/jquery-2.2.3.min.js"></script>
<script>
    // 分页
    var firstPage = document.getElementById("first-page");
    var lastPage = document.getElementById("lastPage");
    var nextPage = document.getElementById("nextPage");
    var currentPage = document.getElementById("currentPage");
    var endPage = document.getElementById("endPage");
    var allPage = document.getElementById("pageNum");
    var blogUl = document.getElementById("blog-ul");
    var bloggerId = document.getElementById("blogger-id").innerHTML;
    //  关注
    var attentionChar = document.getElementById("attention-char");
    var attentionNum = document.getElementById("attention-num");

    // 如果当前页为第一页，首页键不显示
    if (currentPage.innerHTML==1){
        firstPage.style.display = "none";
    }
    //	记录页数为0或为1
    if(allPage.innerHTML==0 || allPage.innerHTML==1){
        lastPage.style.display = "none";
        nextPage.style.display = "none";
        endPage.style.display = "none";
        allPage.innerHTML = 1;
        firstPage.style.display = "none";
    }
    // 将当前页码数据存入page
    var page = new Object();
    page.bloggerId = bloggerId;
    page.type = 10;
    page.onePageNum = 10;
    page.currentPage = currentPage.innerHTML;
    page.allPage = parseInt(allPage.innerHTML);
    // 点击首页
    function clickFirstPage() {
        page.currentPage = 1;
        currentPage.innerHTML = page.currentPage;
        lastPage.style.display = "none";
        if(nextPage.style.display =="none"){
            nextPage.style.display = "inline-block";
        }
        if (endPage.style.display == "none"){
            endPage.style.display = "inline-block";
        }
        uploadPage(page);
    }
    //	点击上一页
    function clickLastPage() {
        page.currentPage = currentPage.innerHTML-1;
        currentPage.innerHTML = page.currentPage;
        if (currentPage.innerHTML <= 1){
            lastPage.style.display = "none";
        }
        if(nextPage.style.display =="none"){
            nextPage.style.display = "inline-block";
        }
        if (currentPage.innerHTML==1){
            firstPage.style.display = "none";
        }
        if (endPage.style.display == "none"){
            endPage.style.display = "inline-block";
        }
        uploadPage(page);
    }
    // 点击下一页
    function clickNextPage() {
        page.currentPage = parseInt(currentPage.innerHTML)+1;
        currentPage.innerHTML = page.currentPage;
        if (currentPage.innerHTML >= allPage.innerHTML){
            nextPage.style.display = "none";
        }
        if (lastPage.style.display =="none"){
            lastPage.style.display = "inline-block";
        }
        if (firstPage.style.display == "none"){
            firstPage.style.display = "inline-block"
        }
        if (currentPage.innerHTML == allPage.innerHTML){
            endPage.style.display = "none";
        }
        uploadPage(page);
    }
    // 点击跳至尾页
    function clickEndPage() {
        page.currentPage = allPage.innerHTML;
        currentPage.innerHTML = page.currentPage;
        nextPage.style.display = "none";
        if (currentPage.innerHTML!=1 && lastPage.style.display == "none"){
            lastPage.style.display = "inline-block"
        }
        if (firstPage.style.display == "none"){
            firstPage.style.display = "inline-block"
        }
        if(currentPage.innerHTML == allPage.innerHTML){
            endPage.style.display = "none";
        }
        uploadPage(page);
    }

    //	提交页码
    function uploadPage(p) {
        $.ajax({
            url:"paging",
            data:JSON.stringify(p),
            type:"post",
            contentType: "application/json;charset=UTF-8",
            dataType:"text",
            success:function (data) {
                acceptDate(data);
            }
        })
    }
    // 	接收数据并展示数据
    function acceptDate(d) {
        /*<a href="<%=request.getContextPath()%>/read?id=${blog.id}"><li>${blog.title}</li></a>;*/
        var blogList = JSON.parse(d);
        var contextPath = getContextPath();
        var str = "";
        for(var i=0;i<blogList.length;i++) {
            str += "<li><a href="+getContextPath()+"/read?id="+blogList[i].id+">"+blogList[i].title+"</a></li>";
        }
        blogUl.innerHTML = str;
    }
    //	获取上下文路径
    function getContextPath(){
        var pathName = document.location.pathname;
        var index = pathName.substr(1).indexOf("/");
        var result = pathName.substr(0,index+1);
        return result;
    }

    //  处理关注
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
</script>
</html>
