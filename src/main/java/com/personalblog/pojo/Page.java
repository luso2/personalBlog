package com.personalblog.pojo;

//分页查询帮助类
public class Page {

    private Integer onePageNum;             //  每页记录数
    private Integer allNum;                 //  总记录数
    private Integer allPage;                //  总页数
    private Integer currentPage;            //  当前页
    private Integer start;                  //  开始查询记录序号

    public Page(Integer onePageNum, Integer allNum, Integer currentPage) {
        this.onePageNum = onePageNum;
        this.allNum = allNum;
        this.allPage = allNum % onePageNum==0? allNum/onePageNum:allNum/onePageNum+1;// 总记录数/每页记录数；如果余数不等于0，总页数+1；
        this.currentPage = currentPage;
        this.start = currentPage == 1? 0:(currentPage-1)*onePageNum;
    }

    public Integer getOnePageNum() {
        return onePageNum;
    }

    public void setOnePageNum(Integer onePageNum) {
        this.onePageNum = onePageNum;
    }

    public Integer getAllNum() {
        return allNum;
    }

    public void setAllNum(Integer allNum) {
        this.allNum = allNum;
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

    public Integer getStart() {
        return start;
    }

    public void setStart(Integer start) {
        this.start = start;
    }

    @Override
    public String toString() {
        return "Page{" +
                "onePageNum=" + onePageNum +
                ", allNum=" + allNum +
                ", allPage=" + allPage +
                ", currentPage=" + currentPage +
                ", start=" + start +
                '}';
    }
}
