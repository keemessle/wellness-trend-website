package com.trend.project1.dto.user.request;

public class UserCreateRequest {

    private String userid;
    private String password;

    public String getUserid() {
        return userid;}

    public String getPassword() {
        return password;
    }

//    public void setUserid(String userid) {
//        this.userid = userid;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }

    // 아이디 비밀번호 유효성 검사
    public void validate() {

        if (!userid.matches(".*[a-zA-Z].*")) { // 영문자가 포함되어 있는지 확인
            throw new IllegalArgumentException("아이디는 반드시 영문자를 포함해야 합니다.");
        }
        if (password == null || password.length() < 4) {
            throw new IllegalArgumentException("비밀번호는 최소 4자리 이상이어야 합니다.");
        }

    }
}
