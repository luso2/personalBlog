package com.personalblog.entity;

import java.io.Serializable;
import java.util.Date;

public class Blogger{

    private Integer id;         //  博主ID
    private String name;        //  博主用户名
    private String password;    //  密码
    private char sex;           //  性别
    private String profession;  //  职业
    private String introduction;//  简介
    private Date lastLoginTime; //  上次登陆时间
    private Integer role;       //  权限
    private String headPortrait;//  头像
    private Date registerTime;  //  注册时间

    public Blogger(){}

    public Blogger(Integer id, String name, String password, char sex, String profession, String introduction) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.sex = sex;
        this.profession = profession;
        this.introduction = introduction;
    }

    public Blogger(Integer id, String name, String password, char sex, String profession, String introduction,
                   Date lastLoginTime, Integer role, String headPortrait, Date registerTime) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.sex = sex;
        this.profession = profession;
        this.introduction = introduction;
        this.lastLoginTime = lastLoginTime;
        this.role = role;
        this.headPortrait = headPortrait;
        this.registerTime = registerTime;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public char getSex() {
        return sex;
    }

    public void setSex(char sex) {
        this.sex = sex;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public Date getLastLoginTime() {
        return lastLoginTime;
    }

    public void setLastLoginTime(Date lastLoginTime) {
        this.lastLoginTime = lastLoginTime;
    }

    public Integer getRole() {
        return role;
    }

    public void setRole(Integer role) {
        this.role = role;
    }

    public String getHeadPortrait() {
        return headPortrait;
    }

    public void setHeadPortrait(String headPortrait) {
        this.headPortrait = headPortrait;
    }

    public Date getRegisterTime() {
        return registerTime;
    }

    public void setRegisterTime(Date registerTime) {
        this.registerTime = registerTime;
    }


}
