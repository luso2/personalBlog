package com.personalblog.service.serviceImpl;

import com.personalblog.mapper.AttentionMapper;
import com.personalblog.pojo.Page;
import com.personalblog.service.AttentionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("attentionService")
@Transactional
public class AttentionServiceImpl implements AttentionService {
    @Autowired
    private AttentionMapper attentionMapper;
    @Override
    public int add(int focusId, int beFocusedId) {
        //  判断是否存在关注关系，以及判断关注对象不是本人
        if (attentionMapper.checkAttention(focusId,beFocusedId) == 0 && focusId != beFocusedId){
            return attentionMapper.add(focusId,beFocusedId);
        }
        return 0;
    }

    @Override
    public int delete(int focusId, int beFocusedId) {
        return attentionMapper.delete(focusId,beFocusedId);
    }

    @Override
    public int getAttentionNum(int bloggerId) {
        return attentionMapper.getAttentionNum(bloggerId);
    }

    @Override
    public int getAttentionNumByBlogger(int bloggerId) {
        return attentionMapper.getAttentionNumByBlogger(bloggerId);
    }

    @Override
    public List<Integer> getAttentions(int bloggerId) {
        return attentionMapper.getAttentions(bloggerId);
    }

    @Override
    public int checkAttention(int focusId, int beFocusedId) {
        return attentionMapper.checkAttention(focusId,beFocusedId);
    }

    @Override
    public List<Integer> pagingAttention(Page page, int bloggerId) {
        return attentionMapper.pagingAttention(page,bloggerId);
    }

}
