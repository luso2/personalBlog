package com.personalblog.controller;

import com.personalblog.entity.Blog;
import com.personalblog.entity.Blogger;
import com.personalblog.pojo.Page;
import com.personalblog.service.BlogService;
import com.personalblog.service.BloggerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
public class IndexController {
    @Autowired
    private BloggerService bloggerService;
    @Autowired
    private BlogService blogService;

    //  主页加载
    @RequestMapping(value = "/index",method = RequestMethod.GET)
    public String getIndex(Model model){
        //  活跃博主
        List<Blogger> bloggers = bloggerService.getThreeBlogger();
        //  最新博文
        List<Blog> newBlogs = blogService.getNewBlogs();
        //  获赞排名前十博客
        List<Blog> praiseBlogs = blogService.getBlogsByPraiseNum();
        // java类博客
        Page pageJava = new Page(10,blogService.getBlogNumByType("java"),1);
        List<Blog> javaBlogs = blogService.pagingByType(pageJava,"java");
        // mysql类博客
        Page pageMysql = new Page(10,blogService.getBlogNumByType("mysql"),1);
        List<Blog> mysqlBlogs = blogService.pagingByType(pageMysql,"mysql");
        // 数据结构类博客
        Page pageDataStructure = new Page(10,blogService.getBlogNumByType("dataStructure"),1);
        List<Blog> dataStructureBlogs = blogService.pagingByType(pageDataStructure,"dataStructure");
        // 算法类博客
        Page pageArithmetic = new Page(10,blogService.getBlogNumByType("arithmetic"),1);
        List<Blog> arithmeticBlogs = blogService.pagingByType(pageArithmetic,"arithmetic");
        // HTML类博客
        Page pageHtml = new Page(10,blogService.getBlogNumByType("html"),1);
        List<Blog> htmlBlogs = blogService.pagingByType(pageHtml,"html");
        // javaScript类博客
        Page pageJavaScript = new Page(10,blogService.getBlogNumByType("javaScript"),1);
        List<Blog> javaScriptBlogs = blogService.pagingByType(pageJavaScript,"javaScript");
        // jQuery类博客
        Page pageJQuery = new Page(10,blogService.getBlogNumByType("jQuery"),1);
        List<Blog> jQueryBlogs = blogService.pagingByType(pageJQuery,"jQuery");
        // other类博客
        Page pageOther = new Page(10,blogService.getBlogNumByType("other"),1);
        List<Blog> otherBlogs = blogService.pagingByType(pageOther,"other");

        // 添加博主
        model.addAttribute("bloggers",bloggers);
        // 添加最新博文
        model.addAttribute("newBlogs",newBlogs);
        // 添加获赞博文排行榜
        model.addAttribute("praiseBlogs",praiseBlogs);
        //  添加各类博文
        model.addAttribute("praiseBlogs",praiseBlogs);
        model.addAttribute("javaBlogs",javaBlogs);
        model.addAttribute("mysqlBlogs",mysqlBlogs);
        model.addAttribute("dataStructureBlogs",dataStructureBlogs);
        model.addAttribute("arithmeticBlogs",arithmeticBlogs);
        model.addAttribute("htmlBlogs",htmlBlogs);
        model.addAttribute("javaScriptBlogs",javaScriptBlogs);
        model.addAttribute("jQueryBlogs",jQueryBlogs);
        model.addAttribute("otherBlogs",otherBlogs);
        // 添加各类博文页
        model.addAttribute("pageJava",pageJava);
        model.addAttribute("pageMysql",pageMysql);
        model.addAttribute("pageDataStructure",pageDataStructure);
        model.addAttribute("pageArithmetic",pageArithmetic);
        model.addAttribute("pageHtml",pageHtml);
        model.addAttribute("pageJavaScript",pageJavaScript);
        model.addAttribute("pageJQuery",pageJQuery);
        model.addAttribute("pageOther",pageOther);
        return "index";

    }
    @RequestMapping(value = "/index",method = RequestMethod.POST)
    public String getLogin(){
            return "index";
    }
}
