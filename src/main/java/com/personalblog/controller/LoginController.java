package com.personalblog.controller;


import com.personalblog.entity.Blogger;
import com.personalblog.service.BloggerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Controller
public class LoginController {

    @Autowired
    private BloggerService bloggerService;

    @RequestMapping(value = "/login",method = RequestMethod.GET)
    public String goLogin(){
        return "login";
    }

    @RequestMapping(value = "/login/logout",method = RequestMethod.POST)
    public void logout(HttpServletResponse response,HttpSession session) throws IOException {
        session.removeAttribute("blogger");
        response.getWriter().write("注销成功");
    }

    @RequestMapping(value = "/login",params = {"name","password"},method = RequestMethod.POST)
    public String doPost(@RequestParam(value = "name") String name, @RequestParam(value = "password")String password, HttpSession session){
        Blogger blogger = bloggerService.checkUser(name,password);
        if (blogger==null){
            return "login";
        }
        session.setAttribute("blogger",blogger);
        return "redirect:index.jsp";
    }
}
