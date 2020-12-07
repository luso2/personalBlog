package com.personalblog.controller;

import com.personalblog.entity.Attention;
import com.personalblog.entity.Blog;
import com.personalblog.entity.Blogger;
import com.personalblog.pojo.Page;
import com.personalblog.service.AttentionService;
import com.personalblog.service.BlogService;
import com.personalblog.service.BloggerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Controller
public class HomeController {

    @Autowired
    private BloggerService bloggerService;
    @Autowired
    private BlogService blogService;
    @Autowired
    private AttentionService attentionService;

    @RequestMapping(value = "/home",method = RequestMethod.GET)
    public String goHome(HttpSession session, Model model){
        // 获取博主博文
        Blogger blogger = (Blogger)session.getAttribute("blogger");
        int bloggerId = blogger.getId();
        Page page = new Page(10,blogService.getBlogNumByBloggerId(bloggerId),1);
        List<Blog> blogs = blogService.pagingByBloggerId(page,blogger.getId());
        //  博主关注对象
        Page attentionPage = new Page(12,attentionService.getAttentionNumByBlogger(bloggerId),1);
        List<Integer> attentionNums = attentionService.pagingAttention(attentionPage,bloggerId);
        List<Blogger> attentionBloggers = new ArrayList<Blogger>();
        for (Integer id:attentionNums){
            Blogger attentionBlogger = bloggerService.getBloggerById(id);
            attentionBloggers.add(attentionBlogger);
        }
        model.addAttribute("page",page);
        model.addAttribute("attentionPage",attentionPage);
        model.addAttribute("blogs",blogs);
        model.addAttribute("attentionBloggers",attentionBloggers);
        return "home";
    }
    @RequestMapping(value = "/home",method = RequestMethod.POST,params = {"id","name","sex","profession","introduction"})
    public void updateBloggerMsg( int id,  String name, char sex,
                                 String profession, String introduction, HttpServletResponse response,HttpSession session) throws IOException {
        if ("".equals(id) || "".equals(name) || "".equals(sex) || "".equals(profession)){
                response.getWriter().write("修改失败");
        }
        Blogger sessionBlogger = (Blogger) session.getAttribute("blogger");
        Blogger blogger = new Blogger(id,name,sessionBlogger.getPassword(),sex,profession,introduction);
        int result = bloggerService.update(blogger);
        if(result == 0){
            response.getWriter().write("修改失败");
        }else {
            Blogger newSessionBlogger = bloggerService.getBloggerById(id);
            session.removeAttribute("blogger");
            session.setAttribute("blogger",newSessionBlogger);
            response.getWriter().write("修改成功");
        }

    }
    @RequestMapping(value = "/home/delete",method = RequestMethod.POST,params = {"deleteBlogId"})
    public void deleteBlog(@RequestParam("deleteBlogId") int id,HttpServletResponse response) throws IOException {
        int result = blogService.delete(id);
        if (result == 1){
            response.getWriter().write("删除成功");
        }else {
            response.getWriter().write("删除失败");
        }
    }
}
