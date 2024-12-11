package com.trend.project1.Controller.user;

import com.trend.project1.dto.user.request.UserCreateRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    //MySQL 테이블에 USER 정보 저장
    private final JdbcTemplate jdbcTemplate;

    public UserController(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserCreateRequest request) {
        String sql = "SELECT COUNT(*) FROM users WHERE userid = ? AND password = ?";
        int count = jdbcTemplate.queryForObject(sql, new Object[]{request.getUserid(), request.getPassword()}, Integer.class);

        if (count == 1) {
            // 로그인 성공
            return ResponseEntity.status(HttpStatus.OK).body("로그인 완료!");
        } else {
            // 로그인 실패
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호가 잘못되었습니다.");
        }

    }

    @PostMapping("/signup") // POST /signup
    public ResponseEntity<String> saveUser(@RequestBody UserCreateRequest request){
        try{
            request.validate();

            String checkUserSql = "SELECT COUNT(*) FROM users WHERE userid = ?";
            int count = jdbcTemplate.queryForObject(checkUserSql, new Object[]{request.getUserid()}, Integer.class);

            if (count > 0) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 존재하는 아이디입니다.");
            }

            String sql = "INSERT INTO users (userid, password) VALUES (?,?)";
            jdbcTemplate.update(sql, request.getUserid(), request.getPassword());

            return ResponseEntity.status(HttpStatus.CREATED).body("성공적으로 완료되었습니다!");
        }catch (IllegalArgumentException e) {
            // 비밀번호 유효성 검사 실패
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    } // 200 ok 반환
}
