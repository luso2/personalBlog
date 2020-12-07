<%--
  Created by IntelliJ IDEA.
  User: 1294
  Date: 2020/6/24
  Time: 14:38
  To change this template use File | Settings | File Templates.--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta charset="utf-8">
    <title>index</title>
    <% String resource= "resource";%>
    <link rel="stylesheet" type="text/css" href="<%=resource%>/css/index.css">
</head>
<%@include file="head.jsp"%>
<body>
	<div class="header">
		<div class="left-logo"><img src="resource/images/logo.png"></div>
      <div class="center-search">
      <div class="input">
        <input id="input" type="text" name="input" onfocus="saySorry()" onfocusout="moveOut()">
      </div>
      <input class="submit" type="submit" name="" value="搜索">
      </div>
      <div class="right-login">
        <img src="resource/images/xiaozhu.gif">
      </div>
	</div>
  <hr>
  <div class="content">
    <div class="content-top">
      <div class="classify">
        <ul>
          <a href="#java"><li>java</li></a>
          <a href="#mySQL"><li>mysql</li></a>
          <a href="#data-structure"><li>数据结构</li></a>
          <a href="#arithmetic"><li>算法</li></a>
          <a href="#html"><li>html</li></a>
          <a href="#javaScript"><li>javaScript</li></a>
          <a href="#jQuery"><li>jQuery</li></a>
           <a href="#other"><li>其它</li></a>
        </ul>
        <div class="recommend">
          <div class="title">
            <p><b>最新博文</b></p>
          </div>
          <ul>
            <c:forEach items="${newBlogs}" var="newBlog">
              <li><a href="<%=request.getContextPath()%>/read?id=${newBlog.id}">${newBlog.title}</a></li>
            </c:forEach>
          </ul>
        </div>
      </div>
      <div class="show">
        <div class="slideshow">
          <div id="container">
            <div id="list" style="left: -700px;">
                <a href=""><img src="resource/images/heike.jpg" alt="1" /></a>
                <a href=""><img src="resource/images/heike.jpg" alt="1" /></a>
                <a href=""><img src="resource/images/shangnao.jpg" alt="2" /></a>
                <a href=""><img src="resource/images/kaifa.jpg" alt="3" /></a>
                <a href=""><img src="resource/images/kanwode.jpg" alt="4" /></a>
                <a href=""><img src="resource/images/fangqi.jpg" alt="5" /></a>
                <a href=""><img src="resource/images/fangqi.jpg" alt="5" /></a>
            </div>
            <div id="buttons">
                <span index="1" class="on"></span>
                <span index="2"></span>
                <span index="3"></span>
                <span index="4"></span>
                <span index="5"></span>
            </div>
            <a href="javascript:;" id="prev" class="arrow"><!-- &lt; --></a>
            <a href="javascript:;" id="next" class="arrow"><!-- &gt; --></a>
        </div>
        </div>
        <div class="write">
          <a href="<%=request.getContextPath()%>/write">快来点我写下属于自己的博文吧</a>
        </div>
      </div>
      <div class="content-top-right">
        <div class="blogger-show">
          <div class="title">
            <div class="rectangle">
            </div>
            <div class="text">
              <span>活跃博主</span>
            </div>
          </div>
          <c:forEach items="${bloggers}" var="blogger">
          <div class="blogger">
            <div class="blogger-photo">
              <a href="<%=request.getContextPath()%>/personal?id=${blogger.id}"><img src="${blogger.headPortrait}"></a>
            </div>
            <div class="blogger-msg">
              <p>${blogger.name}</p>
              <p>${blogger.profession}</p>
            </div>
            <div class="introduction">
              <p>${blogger.introduction}</p>
            </div>
          </div>
          </c:forEach>
        </div>
        <div class="ranking-list">
          <div class="title">
            <div class="rectangle">
            </div>
            <div class="text">
              <span>获赞博文排行榜</span>
            </div>
          </div>
          <div class="list-content">
            <ul>
              <li><span>1.</span></li>
              <li><span>2.</span></li>
              <li><span>3.</span></li>
              <li><span>4.</span></li>
              <li><span>5.</span></li>
              <li><span>6.</span></li>
              <li><span>7.</span></li>
              <li><span>8.</span></li>
              <li><span>9.</span></li>
              <li><span>10.</span></li>
            </ul>
            <ul>
              <c:forEach items="${praiseBlogs}" var="praiseBlog">
                <li><a href="<%=request.getContextPath()%>/read?id=${praiseBlog.id}">${praiseBlog.title}</a></li>
              </c:forEach>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div id="java" class="about">
      <div class="title">
        <span>Java相关</span>
      </div>
      <div class="about-content">
        <ul id="java-change">
          <c:forEach items="${javaBlogs}" var="javaBlog">
            <li><a href="<%=request.getContextPath()%>/read?id=${javaBlog.id}">${javaBlog.title}</a></li>
          </c:forEach>
        </ul>
      </div>
      <div class="change-page" >
        <a  id="java-first-page" onclick="clickFirstPageJava()" style="display: none;">首页</a>
        <a  id="java-lastPage" onclick="clickLastPageJava()" style="display: none;">上一页</a>
        <a >第<span id="java-currentPage">1</span>页</a>
        <a  id="java-nextPage" onclick="clickNextPageJava()">下一页</a>
        <a id="java-endPage" onclick="clickEndPageJava()">跳至尾页</a>
        <a>共<span id="java-pageNum">${pageJava.allPage}</span>页</a>
      </div>
    </div>
    <div id="mySQL" class="about">
      <div class="title">
        <span>MySQL相关</span>
      </div>
      <div class="about-content">
        <ul id="mysql-change">
          <c:forEach items="${mysqlBlogs}" var="mysqlBlog">
            <li><a href="<%=request.getContextPath()%>/read?id=${mysqlBlog.id}">${mysqlBlog.title}</a></li>
          </c:forEach>
        </ul>
      </div>
      <div class="change-page">
        <a  id="mysql-first-page" onclick="clickFirstPageMysql()" style="display: none;">首页</a>
        <a  id="mysql-lastPage" onclick="clickLastPageMysql()" style="display: none;">上一页</a>
        <a >第<span id="mysql-currentPage">1</span>页</a>
        <a  id="mysql-nextPage" onclick="clickNextPageMysql()">下一页</a>
        <a id="mysql-endPage" onclick="clickEndPageMysql()">跳至尾页</a>
        <a>共<span id="mysql-pageNum">${pageMysql.allPage}</span>页</a>
      </div>
    </div>
    <div id="data-structure" class="about">
      <div class="title">
        <span>数据结构相关</span>
      </div>
      <div class="about-content">
        <ul id="dataStructure-change">
          <c:forEach items="${dataStructureBlogs}" var="dataStructureBlog">
            <li><a href="<%=request.getContextPath()%>/read?id=${dataStructureBlog.id}">${dataStructureBlog.title}</a></li>
          </c:forEach>
        </ul>
      </div>
      <div class="change-page" >
        <a  id="dataStructure-first-page" onclick="clickFirstPageDataStructure()" style="display: none;">首页</a>
        <a  id="dataStructure-lastPage" onclick="clickLastPageDataStructure()" style="display: none;">上一页</a>
        <a >第<span id="dataStructure-currentPage">1</span>页</a>
        <a  id="dataStructure-nextPage" onclick="clickNextPageDataStructure()">下一页</a>
        <a id="dataStructure-endPage" onclick="clickEndPageDataStructure()">跳至尾页</a>
        <a>共<span id="dataStructure-pageNum">${pageDataStructure.allPage}</span>页</a>
      </div>
    </div>
    <div id="arithmetic" class="about">
      <div class="title">
        <span>算法相关</span>
      </div>
      <div class="about-content">
        <ul id="arithmetic-change">
          <c:forEach items="${arithmeticBlogs}" var="arithmeticBlog">
            <li><a href="<%=request.getContextPath()%>/read?id=${arithmeticBlog.id}">${arithmeticBlog.title}</a></li>
          </c:forEach>
        </ul>
      </div>
      <div class="change-page">
        <div class="change-page" >
          <a  id="arithmetic-first-page" onclick="clickFirstPageArithmetic()" style="display: none;">首页</a>
          <a  id="arithmetic-lastPage" onclick="clickLastPageArithmetic()" style="display: none;">上一页</a>
          <a >第<span id="arithmetic-currentPage">1</span>页</a>
          <a  id="arithmetic-nextPage" onclick="clickNextPageArithmetic()">下一页</a>
          <a id="arithmetic-endPage" onclick="clickEndPageArithmetic()">跳至尾页</a>
          <a>共<span id="arithmetic-pageNum">${pageArithmetic.allPage}</span>页</a>
        </div>
      </div>
    </div>
    <div id="html" class="about">
      <div class="title">
        <span>HTML相关</span>
      </div>
      <div class="about-content">
        <ul id="html-change">
          <c:forEach items="${htmlBlogs}" var="htmlBlog">
            <li><a href="<%=request.getContextPath()%>/read?id=${htmlBlog.id}">${htmlBlog.title}</a></li>
          </c:forEach>
        </ul>
      </div>
      <div class="change-page">
        <div class="change-page" >
          <a  id="html-first-page" onclick="clickFirstPageHtml()" style="display: none;">首页</a>
          <a  id="html-lastPage" onclick="clickLastPageHtml()" style="display: none;">上一页</a>
          <a >第<span id="html-currentPage">1</span>页</a>
          <a  id="html-nextPage" onclick="clickNextPageHtml()">下一页</a>
          <a id="html-endPage" onclick="clickEndPageHtml()">跳至尾页</a>
          <a>共<span id="html-pageNum">${pageHtml.allPage}</span>页</a>
        </div>
      </div>
    </div>
    <div id="javaScript" class="about">
      <div class="title">
        <span>JavaScript相关</span>
      </div>
      <div class="about-content">
        <ul id="javaScript-change">
          <c:forEach items="${javaScriptBlogs}" var="javaScriptBlog">
            <li><a href="<%=request.getContextPath()%>/read?id=${javaScriptBlog.id}">${javaScriptBlog.title}</a></li>
          </c:forEach>
        </ul>
      </div>
      <div class="change-page">
        <div class="change-page" >
          <a  id="javaScript-first-page" onclick="clickFirstPageJavaScript()" style="display: none;">首页</a>
          <a  id="javaScript-lastPage" onclick="clickLastPageJavaScript()" style="display: none;">上一页</a>
          <a >第<span id="javaScript-currentPage">1</span>页</a>
          <a  id="javaScript-nextPage" onclick="clickNextPageJavaScript()">下一页</a>
          <a id="javaScript-endPage" onclick="clickEndPageJavaScript()">跳至尾页</a>
          <a>共<span id="javaScript-pageNum">${pageJavaScript.allPage}</span>页</a>
        </div>
      </div>
    </div>
    <div id="jQuery" class="about">
      <div class="title">
        <span>JQuery</span>
      </div>
      <div class="about-content">
        <ul id="jQuery-change">
          <c:forEach items="${jQueryBlogs}" var="jQueryBlog">
            <li><a href="<%=request.getContextPath()%>/read?id=${jQueryBlog.id}">${jQueryBlog.title}</a></li>
          </c:forEach>
        </ul>
      </div>
      <div class="change-page">
        <div class="change-page" >
          <a  id="jQuery-first-page" onclick="clickFirstPageJQuery()" style="display: none;">首页</a>
          <a  id="jQuery-lastPage" onclick="clickLastPageJQuery()" style="display: none;">上一页</a>
          <a >第<span id="jQuery-currentPage">1</span>页</a>
          <a  id="jQuery-nextPage" onclick="clickNextPageJQuery()">下一页</a>
          <a id="jQuery-endPage" onclick="clickEndPageJQuery()">跳至尾页</a>
          <a>共<span id="jQuery-pageNum">${pageJQuery.allPage}</span>页</a>
        </div>
      </div>
    </div>
    <div id="other" class="about" >
      <div class="title">
        <span>其它</span>
      </div>
      <div class="about-content">
        <ul id="other-change">
          <c:forEach items="${otherBlogs}" var="otherBlog">
            <li><a href="<%=request.getContextPath()%>/read?id=${otherBlog.id}">${otherBlog.title}</a></li>
          </c:forEach>
        </ul>
      </div>
      <div class="change-page">
        <div class="change-page" >
          <a  id="other-first-page" onclick="clickFirstPageOther()" style="display: none;">首页</a>
          <a  id="other-lastPage" onclick="clickLastPageOther()" style="display: none;">上一页</a>
          <a >第<span id="other-currentPage">1</span>页</a>
          <a  id="other-nextPage" onclick="clickNextPageOther()">下一页</a>
          <a id="other-endPage" onclick="clickEndPageOther()">跳至尾页</a>
          <a>共<span id="other-pageNum">${pageOther.allPage}</span>页</a>
        </div>
      </div>
    </div>
  </div>
</body>
<%@include file="foot.jsp"%>
<script src="resource/js/jquery-2.2.3.min.js"></script>
<script src="resource/js/index.js"></script>
<script>
  var input = document.getElementById("input");
function saySorry(){
  input.value = "Sorry!工程师正在努力开发此功能中。。。"
}
function moveOut(){
  input.value = "";
}
</script>
</html>
