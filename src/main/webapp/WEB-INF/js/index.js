window.onload = function() {
    var container = document.getElementById('container');
    var list = document.getElementById('list');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1;
    var timer;

    function animate(offset) {
        var newLeft = parseInt(list.style.left) + offset;
        list.style.left = newLeft + 'px';
        //ÎÞÏÞ¹ö¶¯ÅÐ¶Ï
        if (newLeft > -700) {
            list.style.left = -3500 + 'px';
        }
        if (newLeft < -3500) {
            list.style.left = -700 + 'px';
        }
    }

    function play() {
        timer = setInterval(function () {
            next.onclick();
        }, 2500)
    }

    function stop() {
        clearInterval(timer);
    }

    function buttonsShow() {
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className == "on") {
                buttons[i].className = "";
            }
        }
        buttons[index - 1].className = "on";
    }

    prev.onclick = function () {
        index -= 1;
        if (index < 1) {
            index = 5
        }
        buttonsShow();
        animate(700);
    };

    next.onclick = function () {
        index += 1;
        if (index > 5) {
            index = 1
        }
        animate(-700);
        buttonsShow();
    };

    for (var i = 0; i < buttons.length; i++) {
        (function (i) {
            buttons[i].onclick = function () {


                var clickIndex = parseInt(this.getAttribute('index'));
                var offset = 700 * (index - clickIndex);
                animate(offset);
                index = clickIndex;
                buttonsShow();
            }
        })(i)
    }

    container.onmouseover = stop;
    container.onmouseout = play;
    play();
}

    //<%-----------------------------java分页----------------------------------------%>
    var firstPageJava= document.getElementById("java-first-page");
    var lastPageJava = document.getElementById("java-lastPage");
    var nextPageJava = document.getElementById("java-nextPage");
    var currentPageJava = document.getElementById("java-currentPage");
    var endPageJava = document.getElementById("java-endPage");
    var allPageJava = document.getElementById("java-pageNum");
    var changeJava = document.getElementById("java-change");

    // 如果当前页为第一页，首页键不显示
    if (currentPageJava.innerHTML==1){
        firstPageJava.style.display = "none";
    }

    //	记录页数为0或为1
    if(allPageJava.innerHTML==0 || allPageJava.innerHTML==1){
        lastPageJava.style.display = "none";
        nextPageJava.style.display = "none";
        endPageJava.style.display = "none";
        allPageJava.innerHTML = 1;
        firstPageJava.style.display = "none";
    }

    // 将当前页码数据存入page
    var pageJava = new Object();
    pageJava.bloggerId = 1;
    pageJava.type = 1;
    pageJava.onePageNum = 10;
    pageJava.currentPage = currentPageJava.innerHTML;
    pageJava.allPage = parseInt(allPageJava.innerHTML);

    // 点击首页
    function clickFirstPageJava() {
        pageJava.currentPage = 1;
        currentPageJava.innerHTML = pageJava.currentPage;
        lastPageJava.style.display = "none";
        firstPageJava.style.display = "none";
        if(nextPageJava.style.display =="none"){
            nextPageJava.style.display = "inline-block";
        }
        if (endPageJava.style.display == "none"){
            endPageJava.style.display = "inline-block";
        }
        uploadPageJava(pageJava);
    }

    //  点击上一页
    function clickLastPageJava() {
        pageJava.currentPage = currentPageJava.innerHTML-1;
        currentPageJava.innerHTML = pageJava.currentPage;
        if (currentPageJava.innerHTML <= 1){
            lastPageJava.style.display = "none";
        }
        if(nextPageJava.style.display =="none"){
            nextPageJava.style.display = "inline-block";
        }
        if (currentPageJava.innerHTML==1){
            firstPageJava.style.display = "none";
        }
        if (endPageJava.style.display == "none"){
            endPageJava.style.display = "inline-block";
        }
        uploadPageJava(pageJava);
    }

    // 点击下一页
    function clickNextPageJava() {
        pageJava.currentPage = parseInt(currentPageJava.innerHTML)+1;
        currentPageJava.innerHTML = pageJava.currentPage;
        if (currentPageJava.innerHTML >= allPageJava.innerHTML){
            nextPageJava.style.display = "none";
        }
        if (lastPageJava.style.display =="none"){
            lastPageJava.style.display = "inline-block";
        }
        if (firstPageJava.style.display == "none"){
            firstPageJava.style.display = "inline-block"
        }
        if (currentPageJava.innerHTML == allPageJava.innerHTML){
            endPageJava.style.display = "none";
        }
        uploadPageJava(pageJava);
    }

    // 点击跳至尾页
    function clickEndPageJava() {
        pageJava.currentPage = allPageJava.innerHTML;
        currentPageJava.innerHTML = pageJava.currentPage;
        nextPageJava.style.display = "none";
        if (currentPageJava.innerHTML!=1 && lastPageJava.style.display == "none"){
            lastPageJava.style.display = "inline-block"
        }
        if (firstPageJava.style.display == "none"){
            firstPageJava.style.display = "inline-block"
        }
        if(currentPageJava.innerHTML == allPageJava.innerHTML){
            endPageJava.style.display = "none";
        }
        uploadPageJava(pageJava);
    }


    //	提交页码
    function uploadPageJava(page) {
        // alert("onePageNum:"+page.onePageNum+"currentPage:"+page.currentPage+"allPage:"+page.allPage);
        var data = JSON.stringify(page);
        $.ajax({
            url:"paging",
            data:data,
            type:"post",
            contentType: "application/json;charset=UTF-8",
            dataType:"text",
            success:function (data) {
                acceptDateJava(data);
            }
        })
    }
    // 	接收数据并展示数据
    function acceptDateJava(d) {
        var blogList = JSON.parse(d);
        var contextPath = getContextPath();
        var str = "";
        for(var i=0;i<blogList.length;i++) {
            str += "<a href="+getContextPath()+"/read?id="+blogList[i].id+"><li>"+blogList[i].title+"</li></a>";
        }
        changeJava.innerHTML = str;
    }
//<%-----------------------------mysql分页----------------------------------------%>
    var firstPageMysql = document.getElementById("mysql-first-page");
    var lastPageMysql = document.getElementById("mysql-lastPage");
    var nextPageMysql = document.getElementById("mysql-nextPage");
    var currentPageMysql = document.getElementById("mysql-currentPage");
    var endPageMysql = document.getElementById("mysql-endPage");
    var allPageMysql = document.getElementById("mysql-pageNum");
    var mysqlChange = document.getElementById("mysql-change");

// 如果当前页为第一页，首页键不显示
    if (currentPageMysql.innerHTML==1){
        firstPageMysql.style.display = "none";
    }
//	记录页数为0
    if(allPageMysql.innerHTML==0 || allPageMysql.innerHTML==1){
        lastPageMysql.style.display = "none";
        nextPageMysql.style.display = "none";
        endPageMysql.style.display = "none";
        allPageMysql.innerHTML = 1;
        firstPageMysql.style.display = "none";
    }
// 将当前页码数据存入page
    var pageMysql = new Object();
    pageMysql.bloggerId = 1;
    pageMysql.type = 2;
    pageMysql.onePageNum = 10;
    pageMysql.currentPage = currentPageMysql.innerHTML;
    pageMysql.allPage = parseInt(allPageMysql.innerHTML);
// 点击首页
    function clickFirstPageMysql() {
        pageMysql.currentPage = 1;
        currentPageMysql.innerHTML = pageMysql.currentPage;
        lastPageMysql.style.display = "none";
        firstPageMysql.style.display = "none";
        if(nextPageMysql.style.display =="none"){
            nextPageMysql.style.display = "inline-block";
        }
        if (endPageMysql.style.display == "none"){
            endPageMysql.style.display = "inline-block";
        }
        uploadPageMysql(pageMysql);
    }
//	点击上一页
    function clickLastPageMysql() {
        pageMysql.currentPage = currentPageMysql.innerHTML-1;
        currentPageMysql.innerHTML = pageMysql.currentPage;
        if (currentPageMysql.innerHTML <= 1){
            lastPageMysql.style.display = "none";
        }
        if(nextPageMysql.style.display =="none"){
            nextPageMysql.style.display = "inline-block";
        }
        if (currentPageMysql.innerHTML==1){
            firstPageMysql.style.display = "none";
        }
        if (endPageMysql.style.display == "none"){
            endPageMysql.style.display = "inline-block";
        }
        uploadPageMysql(pageMysql);
    }
// 点击下一页
    function clickNextPageMysql() {
        pageMysql.currentPage = parseInt(currentPageMysql.innerHTML)+1;
        currentPageMysql.innerHTML = pageMysql.currentPage;
        if (currentPageMysql.innerHTML >= allPageMysql.innerHTML){
            nextPageMysql.style.display = "none";
        }
        if (lastPageMysql.style.display =="none"){
            lastPageMysql.style.display = "inline-block";
        }
        if (firstPageMysql.style.display == "none"){
            firstPageMysql.style.display = "inline-block"
        }
        if (currentPageMysql.innerHTML == allPageMysql.innerHTML){
            endPageMysql.style.display = "none";
        }
        uploadPageMysql(pageMysql);
    }
// 点击跳至尾页
    function clickEndPageMysql() {
        pageMysql.currentPage = allPageMysql.innerHTML;
        currentPageMysql.innerHTML = pageMysql.currentPage;
        nextPageMysql.style.display = "none";
        if (currentPageMysql.innerHTML!=1 && lastPageMysql.style.display == "none"){
            lastPageMysql.style.display = "inline-block"
        }
        if (firstPageMysql.style.display == "none"){
            firstPageMysql.style.display = "inline-block"
        }
        if(currentPageMysql.innerHTML == allPageMysql.innerHTML){
            endPageMysql.style.display = "none";
        }
        uploadPageMysql(pageMysql);
    }

// 	接收数据并展示数据
    function acceptDateMysql(d) {
        var blogList = JSON.parse(d);
        var contextPath = getContextPath();
        var str = "";
        for(var i=0;i<blogList.length;i++) {
            str += "<li><a href="+getContextPath()+"/read?id="+blogList[i].id+">"+blogList[i].title+"</a></li>";

        }
        mysqlChange.innerHTML = str;
    }
//	提交页码
    function uploadPageMysql(p) {
        $.ajax({
            url:"paging",
            data:JSON.stringify(p),
            type:"post",
            contentType: "application/json;charset=UTF-8",
            dataType:"text",
            success:function (data) {
                acceptDateMysql(data);
            }
        })
    }
//<%-----------------------------dataStructure分页----------------------------------------%>
    var firstPageDataStructure = document.getElementById("dataStructure-first-page");
    var lastPageDataStructure = document.getElementById("dataStructure-lastPage");
    var nextPageDataStructure = document.getElementById("dataStructure-nextPage");
    var currentPageDataStructure = document.getElementById("dataStructure-currentPage");
    var endPageDataStructure = document.getElementById("dataStructure-endPage");
    var allPageDataStructure = document.getElementById("dataStructure-pageNum");
    var dataStructureChange = document.getElementById("dataStructure-change");

// 如果当前页为第一页，首页键不显示
    if (currentPageDataStructure.innerHTML==1){
        firstPageDataStructure.style.display = "none";
    }
//	记录页数为0
    if(allPageDataStructure.innerHTML==0 || allPageDataStructure.innerHTML==1){
        lastPageDataStructure.style.display = "none";
        nextPageDataStructure.style.display = "none";
        endPageDataStructure.style.display = "none";
        allPageDataStructure.innerHTML = 1;
        firstPageDataStructure.style.display = "none";
    }
// 将当前页码数据存入page
    var pageDataStructure = new Object();
    pageDataStructure.bloggerId = 1;
    pageDataStructure.type = 3;
    pageDataStructure.onePageNum = 10;
    pageDataStructure.currentPage = currentPageDataStructure.innerHTML;
    pageDataStructure.allPage = parseInt(allPageDataStructure.innerHTML);
// 点击首页
    function clickFirstPageDataStructure() {
        pageDataStructure.currentPage = 1;
        currentPageDataStructure.innerHTML = pageDataStructure.currentPage;
        lastPageDataStructure.style.display = "none";
        firstPageDataStructure.style.display = "none";
        if(nextPageDataStructure.style.display =="none"){
            nextPageDataStructure.style.display = "inline-block";
        }
        if (endPageDataStructure.style.display == "none"){
            endPageDataStructure.style.display = "inline-block";
        }
        uploadPageDataStructure(pageDataStructure);
    }
//	点击上一页
    function clickLastPageDataStructure() {
        pageDataStructure.currentPage = currentPageDataStructure.innerHTML-1;
        currentPageDataStructure.innerHTML = pageDataStructure.currentPage;
        if (currentPageDataStructure.innerHTML <= 1){
            lastPageDataStructure.style.display = "none";
        }
        if(nextPageDataStructure.style.display =="none"){
            nextPageDataStructure.style.display = "inline-block";
        }
        if (currentPageDataStructure.innerHTML==1){
            firstPageDataStructure.style.display = "none";
        }
        if (endPageDataStructure.style.display == "none"){
            endPageDataStructure.style.display = "inline-block";
        }
        uploadPageDataStructure(pageDataStructure);
    }
// 点击下一页
    function clickNextPageDataStructure() {
        pageDataStructure.currentPage = parseInt(currentPageDataStructure.innerHTML)+1;
        currentPageDataStructure.innerHTML = pageDataStructure.currentPage;
        if (currentPageDataStructure.innerHTML >= allPageDataStructure.innerHTML){
            nextPageDataStructure.style.display = "none";
        }
        if (lastPageDataStructure.style.display =="none"){
            lastPageDataStructure.style.display = "inline-block";
        }
        if (firstPageDataStructure.style.display == "none"){
            firstPageDataStructure.style.display = "inline-block"
        }
        if (currentPageDataStructure.innerHTML == allPageDataStructure.innerHTML){
            endPageDataStructure.style.display = "none";
        }
        uploadPageDataStructure(pageDataStructure);
    }
// 点击跳至尾页
    function clickEndPageDataStructure() {
        pageDataStructure.currentPage = allPageDataStructure.innerHTML;
        currentPageDataStructure.innerHTML = pageDataStructure.currentPage;
        nextPageDataStructure.style.display = "none";
        if (currentPageDataStructure.innerHTML!=1 && lastPageDataStructure.style.display == "none"){
            lastPageDataStructure.style.display = "inline-block"
        }
        if (firstPageDataStructure.style.display == "none"){
            firstPageDataStructure.style.display = "inline-block"
        }
        if(currentPageDataStructure.innerHTML == allPageDataStructure.innerHTML){
            endPageDataStructure.style.display = "none";
        }
        uploadPageDataStructure(pageDataStructure);
    }

// 	接收数据并展示数据
    function acceptDateDataStructure(d) {
        /*<a href="<%=request.getContextPath()%>/read?id=${blog.id}"><li>${blog.title}</li></a>;*/
        var blogList = JSON.parse(d);
        var contextPath = getContextPath();
        var str = "";
        for(var i=0;i<blogList.length;i++) {
            str += "<li><a href="+getContextPath()+"/read?id="+blogList[i].id+">"+blogList[i].title+"</a></li>";

        }
        dataStructureChange.innerHTML = str;
    }
//	提交页码
    function uploadPageDataStructure(p) {
        $.ajax({
            url:"paging",
            data:JSON.stringify(p),
            type:"post",
            contentType: "application/json;charset=UTF-8",
            dataType:"text",
            success:function (data) {
                acceptDateDataStructure(data);
            }
        })
    }

//<%-----------------------------arithmetic分页----------------------------------------%>
    var firstPageArithmetic = document.getElementById("arithmetic-first-page");
    var lastPageArithmetic = document.getElementById("arithmetic-lastPage");
    var nextPageArithmetic = document.getElementById("arithmetic-nextPage");
    var currentPageArithmetic = document.getElementById("arithmetic-currentPage");
    var endPageArithmetic = document.getElementById("arithmetic-endPage");
    var allPageArithmetic = document.getElementById("arithmetic-pageNum");
    var arithmeticChange = document.getElementById("arithmetic-change");

// 如果当前页为第一页，首页键不显示
    if (currentPageArithmetic.innerHTML==1){
        firstPageArithmetic.style.display = "none";
    }
//	记录页数为0
    if(allPageArithmetic.innerHTML==0 || allPageArithmetic.innerHTML==1){
        lastPageArithmetic.style.display = "none";
        nextPageArithmetic.style.display = "none";
        endPageArithmetic.style.display = "none";
        allPageArithmetic.innerHTML = 1;
        firstPageArithmetic.style.display = "none";
    }
// 将当前页码数据存入page
    var pageArithmetic = new Object();
    pageArithmetic.bloggerId = 1;
    pageArithmetic.type = 4;
    pageArithmetic.onePageNum = 10;
    pageArithmetic.currentPage = currentPageArithmetic.innerHTML;
    pageArithmetic.allPage = parseInt(allPageArithmetic.innerHTML);
// 点击首页
    function clickFirstPageArithmetic() {
        pageArithmetic.currentPage = 1;
        currentPageArithmetic.innerHTML = pageArithmetic.currentPage;
        lastPageArithmetic.style.display = "none";
        firstPageArithmetic.style.display = "none";
        if(nextPageArithmetic.style.display =="none"){
            nextPageArithmetic.style.display = "inline-block";
        }
        if (endPageArithmetic.style.display == "none"){
            endPageArithmetic.style.display = "inline-block";
        }
        uploadPageArithmetic(pageArithmetic);
    }
//	点击上一页
    function clickLastPageArithmetic() {
        pageArithmetic.currentPage = currentPageArithmetic.innerHTML-1;
        currentPageArithmetic.innerHTML = pageArithmetic.currentPage;
        if (currentPageArithmetic.innerHTML <= 1){
            lastPageArithmetic.style.display = "none";
        }
        if(nextPageArithmetic.style.display =="none"){
            nextPageArithmetic.style.display = "inline-block";
        }
        if (currentPageArithmetic.innerHTML==1){
            firstPageArithmetic.style.display = "none";
        }
        if (endPageArithmetic.style.display == "none"){
            endPageArithmetic.style.display = "inline-block";
        }
        uploadPageArithmetic(pageArithmetic);
    }
// 点击下一页
    function clickNextPageArithmetic() {
        pageArithmetic.currentPage = parseInt(currentPageArithmetic.innerHTML)+1;
        currentPageArithmetic.innerHTML = pageArithmetic.currentPage;
        if (currentPageArithmetic.innerHTML >= allPageArithmetic.innerHTML){
            nextPageArithmetic.style.display = "none";
        }
        if (lastPageArithmetic.style.display =="none"){
            lastPageArithmetic.style.display = "inline-block";
        }
        if (firstPageArithmetic.style.display == "none"){
            firstPageArithmetic.style.display = "inline-block"
        }
        if (currentPageArithmetic.innerHTML == allPageArithmetic.innerHTML){
            endPageArithmetic.style.display = "none";
        }
        uploadPageArithmetic(pageArithmetic);
    }
// 点击跳至尾页
    function clickEndPageArithmetic() {
        pageArithmetic.currentPage = allPageArithmetic.innerHTML;
        currentPageArithmetic.innerHTML = pageArithmetic.currentPage;
        nextPageArithmetic.style.display = "none";
        if (currentPageArithmetic.innerHTML!=1 && lastPageArithmetic.style.display == "none"){
            lastPageArithmetic.style.display = "inline-block"
        }
        if (firstPageArithmetic.style.display == "none"){
            firstPageArithmetic.style.display = "inline-block"
        }
        if(currentPageArithmetic.innerHTML == allPageArithmetic.innerHTML){
            endPageArithmetic.style.display = "none";
        }
        uploadPageArithmetic(pageArithmetic);
    }

// 	接收数据并展示数据
    function acceptDateArithmetic(d) {
        /*<a href="<%=request.getContextPath()%>/read?id=${blog.id}"><li>${blog.title}</li></a>;*/
        var blogList = JSON.parse(d);
        var contextPath = getContextPath();
        var str = "";
        for(var i=0;i<blogList.length;i++) {
            str += "<li><a href="+getContextPath()+"/read?id="+blogList[i].id+">"+blogList[i].title+"</a></li>";

        }
        arithmeticChange.innerHTML = str;
    }
//	提交页码
    function uploadPageArithmetic(p) {
        $.ajax({
            url:"paging",
            data:JSON.stringify(p),
            type:"post",
            contentType: "application/json;charset=UTF-8",
            dataType:"text",
            success:function (data) {
                acceptDateArithmetic(data);
            }
        })
    }

//<%-----------------------------html分页----------------------------------------%>
    var firstPageHtml = document.getElementById("html-first-page");
    var lastPageHtml = document.getElementById("html-lastPage");
    var nextPageHtml = document.getElementById("html-nextPage");
    var currentPageHtml = document.getElementById("html-currentPage");
    var endPageHtml = document.getElementById("html-endPage");
    var allPageHtml = document.getElementById("html-pageNum");
    var htmlChange = document.getElementById("html-change");

// 如果当前页为第一页，首页键不显示
    if (currentPageHtml.innerHTML==1){
        firstPageHtml.style.display = "none";
    }
//	记录页数为0
    if(allPageHtml.innerHTML==0 || allPageHtml.innerHTML==1){
        lastPageHtml.style.display = "none";
        nextPageHtml.style.display = "none";
        endPageHtml.style.display = "none";
        allPageHtml.innerHTML = 1;
        firstPageHtml.style.display = "none";
    }
// 将当前页码数据存入page
    var pageHtml = new Object();
    pageHtml.bloggerId = 1;
    pageHtml.type = 5;
    pageHtml.onePageNum = 10;
    pageHtml.currentPage = currentPageHtml.innerHTML;
    pageHtml.allPage = parseInt(allPageHtml.innerHTML);
// 点击首页
    function clickFirstPageHtml() {
        pageHtml.currentPage = 1;
        currentPageHtml.innerHTML = pageHtml.currentPage;
        lastPageHtml.style.display = "none";
        firstPageHtml.style.display = "none";
        if(nextPageHtml.style.display =="none"){
            nextPageHtml.style.display = "inline-block";
        }
        if (endPageHtml.style.display == "none"){
            endPageHtml.style.display = "inline-block";
        }
        uploadPageHtml(pageHtml);
    }
//	点击上一页
    function clickLastPageHtml() {
        pageHtml.currentPage = currentPageHtml.innerHTML-1;
        currentPageHtml.innerHTML = pageHtml.currentPage;
        if (currentPageHtml.innerHTML <= 1){
            lastPageHtml.style.display = "none";
        }
        if(nextPageHtml.style.display =="none"){
            nextPageHtml.style.display = "inline-block";
        }
        if (currentPageHtml.innerHTML==1){
            firstPageHtml.style.display = "none";
        }
        if (endPageHtml.style.display == "none"){
            endPageHtml.style.display = "inline-block";
        }
        uploadPageHtml(pageHtml);
    }
// 点击下一页
    function clickNextPageHtml() {
        pageHtml.currentPage = parseInt(currentPageHtml.innerHTML)+1;
        currentPageHtml.innerHTML = pageHtml.currentPage;
        if (currentPageHtml.innerHTML >= allPageHtml.innerHTML){
            nextPageHtml.style.display = "none";
        }
        if (lastPageHtml.style.display =="none"){
            lastPageHtml.style.display = "inline-block";
        }
        if (firstPageHtml.style.display == "none"){
            firstPageHtml.style.display = "inline-block"
        }
        if (currentPageHtml.innerHTML == allPageHtml.innerHTML){
            endPageHtml.style.display = "none";
        }
        uploadPageHtml(pageHtml);
    }
// 点击跳至尾页
    function clickEndPageHtml() {
        pageHtml.currentPage = allPageHtml.innerHTML;
        currentPageHtml.innerHTML = pageHtml.currentPage;
        nextPageHtml.style.display = "none";
        if (currentPageHtml.innerHTML!=1 && lastPageHtml.style.display == "none"){
            lastPageHtml.style.display = "inline-block"
        }
        if (firstPageHtml.style.display == "none"){
            firstPageHtml.style.display = "inline-block"
        }
        if(currentPageHtml.innerHTML == allPageHtml.innerHTML){
            endPageHtml.style.display = "none";
        }
        uploadPageHtml(pageHtml);
    }

// 	接收数据并展示数据
    function acceptDateHtml(d) {
        /*<a href="<%=request.getContextPath()%>/read?id=${blog.id}"><li>${blog.title}</li></a>;*/
        var blogList = JSON.parse(d);
        var contextPath = getContextPath();
        var str = "";
        for(var i=0;i<blogList.length;i++) {
            str += "<li><a href="+getContextPath()+"/read?id="+blogList[i].id+">"+blogList[i].title+"</a></li>";

        }
        htmlChange.innerHTML = str;
    }
//	提交页码
    function uploadPageHtml(p) {
        $.ajax({
            url:"paging",
            data:JSON.stringify(p),
            type:"post",
            contentType: "application/json;charset=UTF-8",
            dataType:"text",
            success:function (data) {
                acceptDateHtml(data);
            }
        })
    }
//<%-----------------------------javaScript分页----------------------------------------%>
    var firstPageJavaScript = document.getElementById("javaScript-first-page");
    var lastPageJavaScript = document.getElementById("javaScript-lastPage");
    var nextPageJavaScript = document.getElementById("javaScript-nextPage");
    var currentPageJavaScript = document.getElementById("javaScript-currentPage");
    var endPageJavaScript = document.getElementById("javaScript-endPage");
    var allPageJavaScript= document.getElementById("javaScript-pageNum");
    var javaScriptChange = document.getElementById("javaScript-change");

// 如果当前页为第一页，首页键不显示
    if (currentPageJavaScript.innerHTML==1){
        firstPageJavaScript.style.display = "none";
    }
//	记录页数为0
    if(allPageJavaScript.innerHTML==0 || allPageJavaScript.innerHTML==1){
        lastPageJavaScript.style.display = "none";
        nextPageJavaScript.style.display = "none";
        endPageJavaScript.style.display = "none";
        allPageJavaScript.innerHTML = 1;
        firstPageJavaScript.style.display = "none";
    }
// 将当前页码数据存入page
    var pageJavaScript = new Object();
    pageJavaScript.bloggerId = 1;
    pageJavaScript.type = 6;
    pageJavaScript.onePageNum = 10;
    pageJavaScript.currentPage = currentPageJavaScript.innerHTML;
    pageJavaScript.allPage = parseInt(allPageJavaScript.innerHTML);
// 点击首页
    function clickFirstPageJavaScript() {
        pageJavaScript.currentPage = 1;
        currentPageJavaScript.innerHTML = pageJavaScript.currentPage;
        lastPageJavaScript.style.display = "none";
        firstPageJavaScript.style.display = "none";
        if(nextPageJavaScript.style.display =="none"){
            nextPageJavaScript.style.display = "inline-block";
        }
        if (endPageJavaScript.style.display == "none"){
            endPageJavaScript.style.display = "inline-block";
        }
        uploadPageJavaScript(pageJavaScript);
    }
//	点击上一页
    function clickLastPageJavaScript() {
        pageJavaScript.currentPage = currentPageJavaScript.innerHTML-1;
        currentPageJavaScript.innerHTML = pageJavaScript.currentPage;
        if (currentPageJavaScript.innerHTML <= 1){
            lastPageJavaScript.style.display = "none";
        }
        if(nextPageJavaScript.style.display =="none"){
            nextPageJavaScript.style.display = "inline-block";
        }
        if (currentPageJavaScript.innerHTML==1){
            firstPageJavaScript.style.display = "none";
        }
        if (endPageJavaScript.style.display == "none"){
            endPageJavaScript.style.display = "inline-block";
        }
        uploadPageJavaScript(pageJavaScript);
    }
// 点击下一页
    function clickNextPageJavaScript() {
        pageJavaScript.currentPage = parseInt(currentPageJavaScript.innerHTML)+1;
        currentPageJavaScript.innerHTML = pageJavaScript.currentPage;
        if (currentPageJavaScript.innerHTML >= allPageJavaScript.innerHTML){
            nextPageJavaScript.style.display = "none";
        }
        if (lastPageJavaScript.style.display =="none"){
            lastPageJavaScript.style.display = "inline-block";
        }
        if (firstPageJavaScript.style.display == "none"){
            firstPageJavaScript.style.display = "inline-block"
        }
        if (currentPageJavaScript.innerHTML == allPageJavaScript.innerHTML){
            endPageJavaScript.style.display = "none";
        }
        uploadPageJavaScript(pageJavaScript);
    }
// 点击跳至尾页
    function clickEndPageJavaScript() {
        pageJavaScript.currentPage = allPageJavaScript.innerHTML;
        currentPageJavaScript.innerHTML = pageJavaScript.currentPage;
        nextPageJavaScript.style.display = "none";
        if (currentPageJavaScript.innerHTML!=1 && lastPageJavaScript.style.display == "none"){
            lastPageJavaScript.style.display = "inline-block"
        }
        if (firstPageJavaScript.style.display == "none"){
            firstPageJavaScript.style.display = "inline-block"
        }
        if(currentPageJavaScript.innerHTML == allPageJavaScript.innerHTML){
            endPageJavaScript.style.display = "none";
        }
        uploadPageJavaScript(pageJavaScript);
    }

// 	接收数据并展示数据
    function acceptDateJavaScript(d) {
        /*<a href="<%=request.getContextPath()%>/read?id=${blog.id}"><li>${blog.title}</li></a>;*/
        var blogList = JSON.parse(d);
        var contextPath = getContextPath();
        var str = "";
        for(var i=0;i<blogList.length;i++) {
            str += "<li><a href="+getContextPath()+"/read?id="+blogList[i].id+">"+blogList[i].title+"</a></li>";

        }
        javaScriptChange.innerHTML = str;
    }
//	提交页码
    function uploadPageJavaScript(p) {
        $.ajax({
            url:"paging",
            data:JSON.stringify(p),
            type:"post",
            contentType: "application/json;charset=UTF-8",
            dataType:"text",
            success:function (data) {
                acceptDateJavaScript(data);
            }
        })
    }
//<%-----------------------------jQuery分页----------------------------------------%>
    var firstPageJQuery = document.getElementById("jQuery-first-page");
    var lastPageJQuery = document.getElementById("jQuery-lastPage");
    var nextPageJQuery = document.getElementById("jQuery-nextPage");
    var currentPageJQuery = document.getElementById("jQuery-currentPage");
    var endPageJQuery = document.getElementById("jQuery-endPage");
    var allPageJQuery = document.getElementById("jQuery-pageNum");
    var jQueryChange = document.getElementById("jQuery-change");

// 如果当前页为第一页，首页键不显示
    if (currentPageJQuery.innerHTML==1){
        firstPageJQuery.style.display = "none";
    }
//	记录页数为0
    if(allPageJQuery.innerHTML==0 || allPageJQuery.innerHTML==1){
        lastPageJQuery.style.display = "none";
        nextPageJQuery.style.display = "none";
        endPageJQuery.style.display = "none";
        allPageJQuery.innerHTML = 1;
        firstPageJQuery.style.display = "none";
    }
// 将当前页码数据存入page
    var pageJQuery = new Object();
    pageJQuery.bloggerId = 1;
    pageJQuery.type = 7;
    pageJQuery.onePageNum = 10;
    pageJQuery.currentPage = currentPageJQuery.innerHTML;
    pageJQuery.allPage = parseInt(allPageJQuery.innerHTML);
// 点击首页
    function clickFirstPageJQuery() {
        pageJQuery.currentPage = 1;
        currentPageJQuery.innerHTML = pageJQuery.currentPage;
        lastPageJQuery.style.display = "none";
        firstPageJQuery.style.display = "none";
        if(nextPageJQuery.style.display =="none"){
            nextPageJQuery.style.display = "inline-block";
        }
        if (endPageJQuery.style.display == "none"){
            endPageJQuery.style.display = "inline-block";
        }
        uploadPageJQuery(pageJQuery);
    }
//	点击上一页
    function clickLastPageJQuery() {
        pageJQuery.currentPage = currentPageJQuery.innerHTML-1;
        currentPageJQuery.innerHTML = pageJQuery.currentPage;
        if (currentPageJQuery.innerHTML <= 1){
            lastPageJQuery.style.display = "none";
        }
        if(nextPageJQuery.style.display =="none"){
            nextPageJQuery.style.display = "inline-block";
        }
        if (currentPageJQuery.innerHTML==1){
            firstPageJQuery.style.display = "none";
        }
        if (endPageJQuery.style.display == "none"){
            endPageJQuery.style.display = "inline-block";
        }
        uploadPageJQuery(pageJQuery);
    }
// 点击下一页
    function clickNextPageJQuery() {
        pageJQuery.currentPage = parseInt(currentPageJQuery.innerHTML)+1;
        currentPageJQuery.innerHTML = pageJQuery.currentPage;
        if (currentPageJQuery.innerHTML >= allPageJQuery.innerHTML){
            nextPageJQuery.style.display = "none";
        }
        if (lastPageJQuery.style.display =="none"){
            lastPageJQuery.style.display = "inline-block";
        }
        if (firstPageJQuery.style.display == "none"){
            firstPageJQuery.style.display = "inline-block"
        }
        if (currentPageJQuery.innerHTML == allPageJQuery.innerHTML){
            endPageJQuery.style.display = "none";
        }
        uploadPageJQuery(pageJQuery);
    }
// 点击跳至尾页
    function clickEndPageJQuery() {
        pageJQuery.currentPage = allPageJQuery.innerHTML;
        currentPageJQuery.innerHTML = pageJQuery.currentPage;
        nextPageJQuery.style.display = "none";
        if (currentPageJQuery.innerHTML!=1 && lastPageJQuery.style.display == "none"){
            lastPageJQuery.style.display = "inline-block"
        }
        if (firstPageJQuery.style.display == "none"){
            firstPageJQuery.style.display = "inline-block"
        }
        if(currentPageJQuery.innerHTML == allPageJQuery.innerHTML){
            endPageJQuery.style.display = "none";
        }
        uploadPageJQuery(pageJQuery);
    }

// 	接收数据并展示数据
    function acceptDateJQuery(d) {
        /*<a href="<%=request.getContextPath()%>/read?id=${blog.id}"><li>${blog.title}</li></a>;*/
        var blogList = JSON.parse(d);
        var contextPath = getContextPath();
        var str = "";
        for(var i=0;i<blogList.length;i++) {
            str += "<li><a href="+getContextPath()+"/read?id="+blogList[i].id+">"+blogList[i].title+"</a></li>";

        }
        jQueryChange.innerHTML = str;
    }
//	提交页码
    function uploadPageJQuery(p) {
        $.ajax({
            url:"paging",
            data:JSON.stringify(p),
            type:"post",
            contentType: "application/json;charset=UTF-8",
            dataType:"text",
            success:function (data) {
                acceptDateJQuery(data);
            }
        })
    }
//  <%-----------------------------other分页----------------------------------------%>
    var firstPageOther = document.getElementById("other-first-page");
    var lastPageOther = document.getElementById("other-lastPage");
    var nextPageOther = document.getElementById("other-nextPage");
    var currentPageOther = document.getElementById("other-currentPage");
    var endPageOther = document.getElementById("other-endPage");
    var allPageOther = document.getElementById("other-pageNum");
    var otherChange = document.getElementById("other-change");

// 如果当前页为第一页，首页键不显示
    if (currentPageOther.innerHTML==1){
        firstPageOther.style.display = "none";
    }
//	记录页数为0
    if(allPageOther.innerHTML==0 || allPageOther.innerHTML==1){
        lastPageOther.style.display = "none";
        nextPageOther.style.display = "none";
        endPageOther.style.display = "none";
        allPageOther.innerHTML = 1;
        firstPageOther.style.display = "none";
    }
// 将当前页码数据存入page
    var pageOther = new Object();
    pageOther.bloggerId = 1;
    pageOther.type = 8;
    pageOther.onePageNum = 10;
    pageOther.currentPage = currentPageOther.innerHTML;
    pageOther.allPage = parseInt(allPageOther.innerHTML);
// 点击首页
    function clickFirstPageOther() {
        pageOther.currentPage = 1;
        currentPageOther.innerHTML = pageOther.currentPage;
        lastPageOther.style.display = "none";
        firstPageOther.style.display = "none";
        if(nextPageOther.style.display =="none"){
            nextPageOther.style.display = "inline-block";
        }
        if (endPageOther.style.display == "none"){
            endPageOther.style.display = "inline-block";
        }
        uploadPageOther(pageOther);
    }
//	点击上一页
    function clickLastPageOther() {
        pageOther.currentPage = currentPageOther.innerHTML-1;
        currentPageOther.innerHTML = pageOther.currentPage;
        if (currentPageOther.innerHTML <= 1){
            lastPageOther.style.display = "none";
        }
        if(nextPageOther.style.display =="none"){
            nextPageOther.style.display = "inline-block";
        }
        if (currentPageOther.innerHTML==1){
            firstPageOther.style.display = "none";
        }
        if (endPageOther.style.display == "none"){
            endPageOther.style.display = "inline-block";
        }
        uploadPageOther(pageOther);
    }
// 点击下一页
    function clickNextPageOther() {
        pageOther.currentPage = parseInt(currentPageOther.innerHTML)+1;
        currentPageOther.innerHTML = pageOther.currentPage;
        if (currentPageOther.innerHTML >= allPageOther.innerHTML){
            nextPageOther.style.display = "none";
        }
        if (lastPageOther.style.display =="none"){
            lastPageOther.style.display = "inline-block";
        }
        if (firstPageOther.style.display == "none"){
            firstPageOther.style.display = "inline-block"
        }
        if (currentPageOther.innerHTML == allPageOther.innerHTML){
            endPageOther.style.display = "none";
        }
        uploadPageOther(pageOther);
    }
// 点击跳至尾页
    function clickEndPageOther() {
        pageOther.currentPage = allPageOther.innerHTML;
        currentPageOther.innerHTML = pageOther.currentPage;
        nextPageOther.style.display = "none";
        if (currentPageOther.innerHTML!=1 && lastPageOther.style.display == "none"){
            lastPageOther.style.display = "inline-block"
        }
        if (firstPageOther.style.display == "none"){
            firstPageOther.style.display = "inline-block"
        }
        if(currentPageOther.innerHTML == allPageOther.innerHTML){
            endPageOther.style.display = "none";
        }
        uploadPageOther(pageOther);
    }

// 	接收数据并展示数据
    function acceptDateOther(d) {
        var blogList = JSON.parse(d);
        var contextPath = getContextPath();
        var str = "";
        for(var i=0;i<blogList.length;i++) {
            str += "<li><a href="+getContextPath()+"/read?id="+blogList[i].id+">"+blogList[i].title+"</a></li>";

        }
        otherChange.innerHTML = str;
    }
//	提交页码
    function uploadPageOther(p) {
        $.ajax({
            url:"paging",
            data:JSON.stringify(p),
            type:"post",
            contentType: "application/json;charset=UTF-8",
            dataType:"text",
            success:function (data) {
                acceptDateOther(data);
            }
        })
    }

    //	获取上下文路径
    function getContextPath(){
        var pathName = document.location.pathname;
        var index = pathName.substr(1).indexOf("/");
        var result = pathName.substr(0,index+1);
        return result;
    }
