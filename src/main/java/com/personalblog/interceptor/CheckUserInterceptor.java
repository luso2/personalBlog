package com.personalblog.interceptor;

import com.personalblog.entity.Blogger;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

//  用户单点登录拦截
public class CheckUserInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
        HttpSession session = httpServletRequest.getSession();
        Blogger blogger = (Blogger) session.getAttribute("blogger");
        String path = httpServletRequest.getRequestURI();
        if (path.equals("/personalBlog_war_exploded/login")|| path.equals("/personalBlog_war_exploded/index")){
            return true;
        }
        if (blogger==null){
           httpServletResponse.sendRedirect("/personalBlog_war_exploded/login");
            return false;
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}
