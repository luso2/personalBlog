package com.personalblog.pojo;

// 用于前端分页
public class Pagea {
    private Integer onePageNum;
    private Integer currentPage;
    private Integer allPage;
    private Integer type;
    private Integer bloggerId;

    public Pagea(){}

    public Pagea(Integer onePageNum, Integer currentPage, Integer allPage, Integer type, Integer bloggerId) {
        this.onePageNum = onePageNum;
        this.currentPage = currentPage;
        this.allPage = allPage;
        this.type = type;
        this.bloggerId = bloggerId;
    }

    public Integer getOnePageNum() {
        return onePageNum;
    }

    public void setOnePageNum(Integer onePageNum) {
        this.onePageNum = onePageNum;
    }

    public Integer getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(Integer currentPage) {
        this.currentPage = currentPage;
    }

    public Integer getAllPage() {
        return allPage;
    }

    public void setAllPage(Integer allPage) {
        this.allPage = allPage;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getBloggerId() {
        return bloggerId;
    }

    public void setBloggerId(Integer bloggerId) {
        this.bloggerId = bloggerId;
    }
}
