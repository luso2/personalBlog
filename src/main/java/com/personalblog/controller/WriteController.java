package com.personalblog.controller;

import com.personalblog.entity.Blog;
import com.personalblog.entity.Blogger;
import com.personalblog.service.BlogService;
import com.sun.deploy.net.HttpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Date;

@Controller
public class WriteController {

    @Autowired
    private BlogService blogService;
    @RequestMapping(value = "/write",method = RequestMethod.GET)
    public String goWrite(){
        return "editor/examples/write";
    }
    @RequestMapping(value = "/write",method = RequestMethod.POST)
    public void dealAjax(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession();
        Blogger blogger = (Blogger) session.getAttribute("blogger");
        String t = request.getParameter("title");
        String type = request.getParameter("type");
        //  转义标题带的标签
        String lt = t.replace("<","&lt");
        String title = lt.replace(">","&gt");
        String content = request.getParameter("content");
        Date date = new Date();
        Blog blog = new Blog(null,title,content,type,date,blogger.getId(),0,0);
        int result = blogService.add(blog);
        if (result==1){
            response.getWriter().write("提交成功");
        }else {
            response.getWriter().write("");
        }
    }
}
