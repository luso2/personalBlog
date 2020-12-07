package com.personalblog.mapper;

import com.personalblog.entity.Blog;
import com.personalblog.pojo.Page;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogMapper {
    //  增
    int add(Blog blog);
    //  删
    int delete(int blogId);
    //  改
    int update(Blog blog);
    //  更改浏览量
    int setViewNum(@Param("blogId") int blogId,@Param("viewNum") int viewNum);
    //  查询所有博客数
    int getBlogNum();
    //  查询所有某类型博客数
    int getBlogNumByType(String type);
    //  查询某博主所有博客数
    int getBlogNumByBloggerId(int bloggerId);
    //  通过id查
    Blog getBlogById(int blogId);
    //  通过标题查询所有博客
    List<Blog> getBlogByTitle(String blogTitle);
    //  通过类型查询所有博客
    List<Blog> getBlogsByType(String blogType);
    //  将所有博客按获赞数递减排序
    List<Blog> getBlogsByPraiseNum();
    //  点赞处理
    int setParise(@Param("blogId") int blogId,@Param("pariseNum") int pariseNum);
    //  通过博主ID查询博主所有博客
    List<Blog> getBlogsByBloggerId(int bloggerId);
    //  按类型分页查找
    List<Blog> pagingByType(@Param("page") Page page, @Param("type") String type);
    //  按博主id分页查找
    List<Blog> pagingByBloggerId(@Param("page") Page page, @Param("bloggerId") int bloggerId);
    //  获取最新博文
    List<Blog>  getNewBlogs();
}
