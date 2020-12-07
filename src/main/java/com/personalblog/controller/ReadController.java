package com.personalblog.controller;

import com.personalblog.entity.Blog;
import com.personalblog.entity.Blogger;
import com.personalblog.service.AttentionService;
import com.personalblog.service.BlogService;
import com.personalblog.service.BloggerService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.SimpleDateFormat;

@Controller
public class ReadController {
    @Autowired
    private BloggerService bloggerService;
    @Autowired
    private BlogService blogService;
    @Autowired
    private AttentionService attentionService;

    @RequestMapping(value = "/read",method = RequestMethod.GET)
    public String goRead(){
        return "read";
    }
    @RequestMapping(value = "/read",method = RequestMethod.GET,params = {"id"})
    public String goRead(@Param("id") int id, Model model,HttpSession session){
        //  获取当前博文
        Blog blog = blogService.getBlogById(id);
        //  更新该博文浏览量
        blog.setViewNum(blog.getViewNum()+1);
        blogService.setViewNum(id,blog.getViewNum());
        //  博文发布时间
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String publishTime = simpleDateFormat.format(blog.getPublishTime());
        //  获取当前博文博主
        Blogger bloggerR = bloggerService.getBloggerById(blog.getBloggerId());
        //  获取当前博文博主文章数
        int blogNum = blogService.getBlogNumByBloggerId(blog.getBloggerId());
        //  关注博主的人数
        int attentionNum = attentionService.getAttentionNum(bloggerR.getId());
        //  我与博文主的关注关系
        Blogger sessionBlogger = (Blogger)session.getAttribute("blogger");
        int attRelation = attentionService.checkAttention(sessionBlogger.getId(),blog.getBloggerId());
        model.addAttribute("bloggerR",bloggerR);
        model.addAttribute("blogNum",blogNum);
        model.addAttribute("blog",blog);
        model.addAttribute("publishTime",publishTime);
        model.addAttribute("attentionNum",attentionNum);
        model.addAttribute("attRelation",attRelation);
        return "read";
    }
    @PostMapping(value = "/read",params = {"id","type"})
    public void dealParise(@RequestParam("id")int blogId,@RequestParam("type")int type,HttpServletResponse response) throws IOException {
        //  获取被点赞的博文当前获赞数
        Blog blog = blogService.getBlogById(blogId);
        int pariseNum = blog.getPraiseNum();
        if (type == 1){//  处理点赞
            int result = blogService.setParise(blogId,pariseNum+1);
            if (result == 1){
                response.getWriter().write("点赞成功");
            }else {
                response.getWriter().write("点赞失败");
            }
        }else {// 处理取消点赞
            int result1 = blogService.setParise(blogId,pariseNum-1);
            if (result1 == 1){
                response.getWriter().write("取消点赞成功");
            }else {
                response.getWriter().write("取消点赞失败");
            }
        }
    }
}
