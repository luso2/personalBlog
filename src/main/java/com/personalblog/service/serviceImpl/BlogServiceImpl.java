package com.personalblog.service.serviceImpl;

import com.personalblog.entity.Blog;
import com.personalblog.mapper.BlogMapper;
import com.personalblog.pojo.Page;
import com.personalblog.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;

@Service
@Transactional
public class BlogServiceImpl implements BlogService {

    @Autowired
    private BlogMapper blogMapper;

    @Override
    public int add(Blog blog) {
        //  如果博文标题和博文类型为空，添加失败
        if ("".equals(blog.getTitle())||"".equals(blog.getType())){
            return 0;
        }
        return blogMapper.add(blog);
    }

    @Override
    public int delete(int blogId) {
        return blogMapper.delete(blogId);
    }

    @Override
    public int update(Blog blog) {
        return blogMapper.update(blog);
    }

    @Override
    public int setViewNum(int blogId, int viewNum) {
        return blogMapper.setViewNum(blogId,viewNum);
    }

    @Override
    public int getBlogNum() {
        return blogMapper.getBlogNum();
    }

    @Override
    public int getBlogNumByType(String type) {
        return blogMapper.getBlogNumByType(type);
    }

    @Override
    public int getBlogNumByBloggerId(int bloggerId) {
        return blogMapper.getBlogNumByBloggerId(bloggerId);
    }

    @Override
    public Blog getBlogById(int blogId) {
        return blogMapper.getBlogById(blogId);
    }

    @Override
    public List<Blog> getBlogByTitle(String blogTitle) {
        return blogMapper.getBlogByTitle(blogTitle);
    }

    @Override
    public List<Blog> getBlogsByType(String type) {
        return blogMapper.getBlogsByType(type);
    }

    @Override
    public List<Blog> getBlogsByPraiseNum() {//获取获赞数排名前十的博客
//        List<Blog> blogs = new LinkedList<Blog>();
//        Blog blog;
//        int i = 1;
//        for (Blog b:blogMapper.getBlogsByPraiseNum()){
//            if (i>10){
//                break;
//            }
//            blogs.add(b);
//            i++;
//        }
//        return blogs;
        return blogMapper.getBlogsByPraiseNum();
    }

    @Override
    public int setParise(int blogId, int pariseNum) {
        return blogMapper.setParise(blogId,pariseNum);
    }

    @Override
    public List<Blog> getBlogsByBloggerId(int bloggerId) {
        return blogMapper.getBlogsByBloggerId(bloggerId);
    }

    @Override
    public List<Blog> pagingByType(Page page, String type) {
        return blogMapper.pagingByType(page,type);
    }

    @Override
    public List<Blog> pagingByBloggerId(Page page, int bloggerId) {
        return blogMapper.pagingByBloggerId(page,bloggerId);
    }

    @Override
    public List<Blog> getNewBlogs() {
        return blogMapper.getNewBlogs();
    }
}
