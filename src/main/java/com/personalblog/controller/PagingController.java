package com.personalblog.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.personalblog.entity.Blog;
import com.personalblog.entity.Blogger;
import com.personalblog.pojo.Page;
import com.personalblog.pojo.Pagea;
import com.personalblog.service.AttentionService;
import com.personalblog.service.BlogService;
import com.personalblog.service.BloggerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Controller
public class PagingController {
    @Autowired
    private BlogService blogService;
    @Autowired
    private BloggerService bloggerService;
    @Autowired
    private AttentionService attentionService;

//    @RequestMapping(value = "/paging",method = RequestMethod.GET)
//    public void nothing(HttpServletRequest request,HttpServletResponse response) throws IOException {
//        request.setCharacterEncoding( "utf-8" );
//        response.setHeader( "Content-Type" , "text/html" );
//        System.out.println("我进了get");
//        response.getWriter().write("我进了get");
//    }

    @RequestMapping(value = "/paging",method = RequestMethod.POST)
    public void dealHomePaging(@RequestBody Pagea pagea, HttpSession session, HttpServletResponse response) throws IOException {
        int type = pagea.getType();
        switch (type){
            case 1:
                Page pageJava = new Page(pagea.getOnePageNum(),blogService.getBlogNumByType("java"),pagea.getCurrentPage());
                List<Blog> javaBlogList =  blogService.pagingByType(pageJava,"java");
                response.getWriter().write(JSONArray.toJSONString(javaBlogList));
                break;
            case 2:
                Page pageMysql = new Page(pagea.getOnePageNum(),blogService.getBlogNumByType("mysql"),pagea.getCurrentPage());
                List<Blog> mysqlBlogList =  blogService.pagingByType(pageMysql,"mysql");
                response.getWriter().write(JSONArray.toJSONString(mysqlBlogList));
                break;
            case 3:
                Page pageDataStructure = new Page(pagea.getOnePageNum(),blogService.getBlogNumByType("dataStructure"),pagea.getCurrentPage());
                List<Blog> dataStructureBlogList =  blogService.pagingByType(pageDataStructure,"dataStructure");
                response.getWriter().write(JSONArray.toJSONString(dataStructureBlogList));
                break;
            case 4:
                Page pageArithmetic = new Page(pagea.getOnePageNum(),blogService.getBlogNumByType("arithmetic"),pagea.getCurrentPage());
                List<Blog> arithmeticBlogList =  blogService.pagingByType(pageArithmetic,"arithmetic");
                response.getWriter().write(JSONArray.toJSONString(arithmeticBlogList));
                break;
            case 5:
                Page pageHtml = new Page(pagea.getOnePageNum(),blogService.getBlogNumByType("html"),pagea.getCurrentPage());
                List<Blog> htmlBlogList =  blogService.pagingByType(pageHtml,"html");
                response.getWriter().write(JSONArray.toJSONString(htmlBlogList));
                break;
            case 6:
                Page pageJavaScript = new Page(pagea.getOnePageNum(),blogService.getBlogNumByType("javaScript"),pagea.getCurrentPage());
                List<Blog> javaScriptBlogList =  blogService.pagingByType(pageJavaScript,"javaScript");
                response.getWriter().write(JSONArray.toJSONString(javaScriptBlogList));
                break;
            case 7:
                Page pageJQuery = new Page(pagea.getOnePageNum(),blogService.getBlogNumByType("jQuery"),pagea.getCurrentPage());
                List<Blog> jQueryBlogList =  blogService.pagingByType(pageJQuery,"jQuery");
                response.getWriter().write(JSONArray.toJSONString(jQueryBlogList));
                break;
            case 8:
                Page pageOther = new Page(pagea.getOnePageNum(),blogService.getBlogNumByType("other"),pagea.getCurrentPage());
                List<Blog> otherBlogList =  blogService.pagingByType(pageOther,"other");
                response.getWriter().write(JSONArray.toJSONString(otherBlogList));
                break;
            case 9:
                //  home博文页分页查找
                Blogger blogger = (Blogger)session.getAttribute("blogger");
                Integer id = blogger.getId();
                Page page = new Page(pagea.getOnePageNum(),blogService.getBlogNumByBloggerId(id),pagea.getCurrentPage());
                List<Blog> blogList =  blogService.pagingByBloggerId(page,blogger.getId());
                response.getWriter().write(JSONArray.toJSONString(blogList));
                break;
            case 10:
                //  personal页分页
                int bloggerId = pagea.getBloggerId();
                Page personalPage = new Page(pagea.getOnePageNum(),pagea.getAllPage(),pagea.getCurrentPage());
                List<Blog> personalBlogList =  blogService.pagingByBloggerId(personalPage,bloggerId);
                response.getWriter().write(JSONArray.toJSONString(personalBlogList));
                break;
            default://  处理home的关注分页
                Blogger bloggerAtt = (Blogger)session.getAttribute("blogger");
                Integer idAtt = bloggerAtt.getId();
                Page pageAtt = new Page(pagea.getOnePageNum(),blogService.getBlogNumByBloggerId(idAtt),pagea.getCurrentPage());
                List<Integer> attentionNums = attentionService.pagingAttention(pageAtt,idAtt);
                List<Blogger> attentionBloggers = new ArrayList<Blogger>();
                for (Integer i:attentionNums){
                    Blogger attentionBlogger = bloggerService.getBloggerById(i);
                    attentionBloggers.add(attentionBlogger);
                }
                response.getWriter().write(JSONArray.toJSONString(attentionBloggers));
        }
    }
}
