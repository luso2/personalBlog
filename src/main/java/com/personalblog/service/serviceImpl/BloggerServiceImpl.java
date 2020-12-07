package com.personalblog.service.serviceImpl;

import com.personalblog.entity.Blogger;
import com.personalblog.mapper.BloggerMapper;
import com.personalblog.service.BloggerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.logging.Logger;

@Service
@Transactional
public class BloggerServiceImpl implements BloggerService {
    @Autowired
    private BloggerMapper bloggerMapper;

    @Override
    public int add(Blogger blogger) {
        Blogger blogger1 = bloggerMapper.getBloggerByName(blogger.getName());
        //  数据库已存在该用户名，插入失败
        if (null!=blogger1){
            return 0;
        }
        return bloggerMapper.add(blogger);
    }

    @Override
    public int delete(int bloggerId) {
        return 0;
    }

    @Override
    public int update(Blogger blogger) {
        Blogger dataBaseBlogger = bloggerMapper.getBloggerByName(blogger.getName());
        //  数据库不存在此用户名，修改成功
        if(dataBaseBlogger == null){
            return bloggerMapper.update(blogger);
        }
        //  如果数据库存在该用户名且该用户是自己，修改成功
        if (dataBaseBlogger != null && blogger.getId() == dataBaseBlogger.getId()){
            return bloggerMapper.update(blogger);
        }
        return 0;
    }

    @Override
    public int updateHeadPortrait(String newHeadPortrait, int bloggerId) {
        return bloggerMapper.updateHeadPortrait(newHeadPortrait,bloggerId);
    }

    @Override
    public List<Blogger> getAllBloggers() {
        return bloggerMapper.getAllBloggers();
    }

    @Override
    public int getBloggerNum() {
        return bloggerMapper.getBloggerNum();
    }

    @Override
    public Blogger getBloggerById(int bloggerId) {
        Blogger blogger = bloggerMapper.getBloggerById(bloggerId);
        return blogger;
    }

    @Override
    public Blogger getBloggerByName(String bloggerName) {
        return bloggerMapper.getBloggerByName(bloggerName);
    }

    @Override
    public List<Blogger> getThreeBlogger() {
        List<Blogger> bloggers = new LinkedList<Blogger>();
        Blogger blogger;
        int i = 1;
        for (Blogger b:bloggerMapper.getThreeBlogger()){
            if (i>3){
                break;
            }
            bloggers.add(b);
            i++;
        }
        return bloggers;
    }

    @Override
    public Blogger checkUser(String name, String password) {
        return bloggerMapper.checkUser(name,password);
    }
}
