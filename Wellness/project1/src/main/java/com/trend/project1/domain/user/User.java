package com.trend.project1.domain.user;

public class User {
    private String userid;
    private String password;

    public User(String userid, String password){

        // 이름 빈칸 방지
        if (userid == null || userid.isBlank()){
            throw new IllegalArgumentException(String.format("다시 입력해주세요", userid));
        }
        //생성자
        this.userid = userid;
        this.password = password;
    }

    public String getUserid() {
        return userid;
    }
    public String getPassword() {
        return password;
    }
}
