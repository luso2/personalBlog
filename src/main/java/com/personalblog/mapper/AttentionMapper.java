package com.personalblog.mapper;

import com.personalblog.pojo.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface AttentionMapper {
    //  增
    int add(@Param("focusId") int focusId,@Param("beFocusedId") int beFocusedId);
    //  删
    int delete(@Param("focusId") int focusId,@Param("beFocusedId") int beFocusedId);
    //  查博主被别人关注的人数
    int getAttentionNum(int bloggerId);
    //  查博主关注它人的人数
    int getAttentionNumByBlogger(int bloggerId);
    //  查询博主的所有关注
    List<Integer> getAttentions(int bloggerId);
    //  检查两人关注关系是否存在
    int checkAttention(@Param("focusId") int focusId,@Param("beFocusedId") int beFocusedId);
    //  分页查找
    List<Integer> pagingAttention(@Param("page") Page page, @Param("bloggerId") int bloggerId);
}
