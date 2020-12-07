package com.personalblog.entity;

import java.io.Serializable;
import java.util.Date;

public class Blog{

    private Integer id;             //  博客ID
    private String title;           //  博客主题
    private String content;         //  博客内容
    private String type;            //  博客类型
    private Date publishTime;      //   发表时间
    private Integer bloggerId;      //  文章博主id
    private Integer praiseNum;      //  获赞数
    private Integer viewNum;        //  浏览量


    public Blog(Integer id, String title, String content, String type, Date publishTime, Integer bloggerId, Integer praiseNum, Integer viewNum) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.type = type;
        this.publishTime = publishTime;
        this.bloggerId = bloggerId;
        this.praiseNum = praiseNum;
        this.viewNum = viewNum;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getPublishTime() {
        return publishTime;
    }

    public void setPublishTime(Date publishTime) {
        this.publishTime = publishTime;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getPraiseNum() {
        return praiseNum;
    }

    public void setPraiseNum(Integer praiseNum) {
        this.praiseNum = praiseNum;
    }

    public Integer getBloggerId() {
        return bloggerId;
    }

    public void setBloggerId(Integer bloggerId) {
        this.bloggerId = bloggerId;
    }

    public Integer getViewNum() {
        return viewNum;
    }

    public void setViewNum(Integer viewNum) {
        this.viewNum = viewNum;
    }

}
