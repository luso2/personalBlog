package com.personalblog.mapper;

import com.personalblog.entity.Blogger;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BloggerMapper {
    //  增
    int add(Blogger blogger);
    //  删
    int delete(int bloggerId);
    //  改
    int update(@Param("blogger") Blogger blogger);
    //  改头像
    int updateHeadPortrait(@Param("newHeadPortrait") String newHeadPortrait,@Param("bloggerId") int bloggerId);
    //  查询所有博主
    List<Blogger> getAllBloggers();
    // 查询所有博主数
    int getBloggerNum();
    //  通过id查
    Blogger getBloggerById(int bloggerId);
    //  通过name查
    Blogger getBloggerByName(String bloggerName);
    //  查询博客数量排名前三的博主,这里只是将博主按发布的博客数量递减拍虚了，具体实现在service层
    List<Blogger> getThreeBlogger();
    //  用户登陆验证
    Blogger checkUser(@Param("name") String name,@Param("password") String password);
}
