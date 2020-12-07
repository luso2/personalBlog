package com.personalblog.entity;

import java.io.Serializable;

public class Attention{
    private Integer focusId;        //关注人
    private Integer beFocusId;      //被关注人
    public Attention(){}

    public Integer getFocusId() {
        return focusId;
    }

    public void setFocusId(Integer focusId) {
        this.focusId = focusId;
    }

    public Integer getBeFocusId() {
        return beFocusId;
    }

    public void setBeFocusId(Integer beFocusId) {
        this.beFocusId = beFocusId;
    }
}
