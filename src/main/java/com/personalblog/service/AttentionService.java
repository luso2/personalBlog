package com.personalblog.service;

import com.personalblog.pojo.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface AttentionService {
    //  增
    int add(int focusId,int beFocusedId);
    //  删
    int delete(int focusId,int beFocusedId);
    //  查博主被别人关注的人数
    int getAttentionNum(int bloggerId);
    //  查博主关注它人的人数
    int getAttentionNumByBlogger(int bloggerId);
    //  查询博主的所有关注
    List<Integer> getAttentions(int bloggerId);
    //  检查两人关注关系是否存在
    int checkAttention(int focusId,int beFocusedId);
    //  分页查找
    List<Integer> pagingAttention(Page page,int bloggerId);
}
