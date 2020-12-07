package com.personalblog.service;

import com.personalblog.entity.Blogger;

import java.util.List;

public interface BloggerService {
    //  增
    int add(Blogger blog);
    //  删
    int delete(int bloggerId);
    //  改
    int update(Blogger blog);
    //  改头像
    int updateHeadPortrait(String newHeadPortrait,int bloggerId);
    //  查询所有博主
    List<Blogger> getAllBloggers();
    // 查询所有博主数
    int getBloggerNum();
    //  通过id查
    Blogger getBloggerById(int bloggerId);
    //  通过name查
    Blogger getBloggerByName(String bloggerName);
    //  查询博客数量排名前三的博主
    List<Blogger> getThreeBlogger();
    //  用户登陆验证
    Blogger checkUser(String name,String password);
}
