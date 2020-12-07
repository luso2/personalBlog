package com.personalblog.controller;

import com.personalblog.entity.Blog;
import com.personalblog.entity.Blogger;
import com.personalblog.pojo.Page;
import com.personalblog.service.AttentionService;
import com.personalblog.service.BlogService;
import com.personalblog.service.BloggerService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@Controller
public class PersonalController {
    @Autowired
    private BloggerService bloggerService;
    @Autowired
    private BlogService blogService;
    @Autowired
    private AttentionService attentionService;

    @GetMapping(value = "/personal",params = {"id"})
    public String goPersonal(@Param(value = "id")int id, Model model, HttpSession session){
        Blogger sessionBlogger = (Blogger)session.getAttribute("blogger");
        int sessionBloggerId = sessionBlogger.getId();
        //  判断进入的是不是博主自己的personal,是就回自己home
        if (id == sessionBloggerId){
            return "redirect:/home";
        }
        //  博文博主
        Blogger blogger = bloggerService.getBloggerById(id);
        Page page = new Page(10,blogService.getBlogNumByBloggerId(blogger.getId()),1);
        //  获取当前博文博主文章数
        int blogNum = blogService.getBlogNumByBloggerId(id);
        //  博文列表
        List<Blog> blogs = blogService.getBlogsByBloggerId(id);
        //  关注博主的人数
        int attentionNum = attentionService.getAttentionNum(id);
        //  我与博文主的关注关系
        int attRelation = attentionService.checkAttention(sessionBloggerId,id);
        model.addAttribute("blogger",blogger);
        model.addAttribute("blogNum",blogNum);
        model.addAttribute("blogs",blogs);
        model.addAttribute("page",page);
        model.addAttribute("attentionNum",attentionNum);
        model.addAttribute("attRelation",attRelation);
        return "personal";
    }
    @PostMapping(value = "/personal",params = {"id","type"})
    public void dealAttention(@RequestParam("id")int id, @RequestParam("type") int type, HttpSession session, HttpServletResponse response) throws IOException {
        //  获取当前博主id
        Blogger sessionBlogger = (Blogger)session.getAttribute("blogger");
        int sessionBloggerId = sessionBlogger.getId();

        if (type ==1 ){ //  处理关注
            int result =  attentionService.add(sessionBloggerId,id);
            if (result == 1 ){
                response.getWriter().write("关注成功");
            }else {
                response.getWriter().write("关注失败");
            }
        }else {//   处理取消关注
            int result1 = attentionService.delete(sessionBloggerId,id);
            if (result1 == 1 ){
                response.getWriter().write("取消关注成功");
            }else {
                response.getWriter().write("取消关注失败");
            }
        }
    }
}
