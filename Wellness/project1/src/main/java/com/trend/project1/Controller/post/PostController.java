package com.trend.project1.Controller.post;

import com.trend.project1.domain.post.Post;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final JdbcTemplate jdbcTemplate;

    public PostController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // 게시글 작성
    @PostMapping("/create")
    public ResponseEntity<String> createPost(@RequestBody Post post) {
        String sql = "INSERT INTO posts (category, title, content, name, created_at, views, likes) VALUES (?, ?, ?, ?, NOW(), 0, 0)";
        jdbcTemplate.update(sql, post.getCategory(), post.getTitle(), post.getContent(), post.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body("작성 성공!");
    }

    // 게시글 조회
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        String sql = "SELECT * FROM posts ORDER BY created_at DESC"; // 최신순으로 정렬";
        List<Post> posts = jdbcTemplate.query(sql, (rs, rowNum) -> new Post(
                rs.getLong("id"),
                rs.getString("category"),
                rs.getString("title"),
                rs.getString("content"),
                rs.getString("name"),
                rs.getString("created_at"),
                rs.getInt("views"),
                rs.getInt("likes")
        ));
        return ResponseEntity.ok(posts);
    }

    // 카테고리별로 조회 //
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Post>> getPostsByCategory(@PathVariable String category) {
        String sql = "SELECT * FROM posts WHERE category = ? ORDER BY created_at DESC";
        List<Post> posts = jdbcTemplate.query(sql, new Object[]{category}, (rs, rowNum) -> new Post(
                rs.getLong("id"),
                rs.getString("category"),
                rs.getString("title"),
                rs.getString("content"),
                rs.getString("name"),
                rs.getString("created_at"),
                rs.getInt("views"),
                rs.getInt("likes")
        ));
        return ResponseEntity.ok(posts);
    }

    // 게시글 클릭했을 때 상세 정보 보여주기//
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        String sql = "SELECT * FROM posts WHERE id = ?";
        Post post = jdbcTemplate.queryForObject(sql, new Object[]{id}, (rs, rowNum) -> new Post(
                rs.getLong("id"),
                rs.getString("category"),
                rs.getString("title"),
                rs.getString("content"),
                rs.getString("name"),
                rs.getString("created_at"),
                rs.getInt("views"),
                rs.getInt("likes")
        ));
        return ResponseEntity.ok(post);
    }

    // 조회수 증가 //
    @PostMapping("/{id}/view")
    public ResponseEntity<String> increaseViewCount(@PathVariable Long id) {
        String sql = "UPDATE posts SET views = views + 1 WHERE id = ?";
        int updatedRows = jdbcTemplate.update(sql, id);

        if (updatedRows == 1) {
            return ResponseEntity.ok("조회수 증가");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("조회수 증가 실패");
        }
    }

    // 게시글 삭제 //
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id) {
        String sql = "DELETE FROM posts WHERE id = ?";
        jdbcTemplate.update(sql, id);
        return ResponseEntity.ok("게시글 삭제 성공");
    }

    // 게시글 수정 //
    @PutMapping("/{id}")
    public ResponseEntity<String> updatePost(@PathVariable Long id, @RequestBody Post post) {
        String sql = "UPDATE posts SET category = ?, title = ?, content = ?, name = ? WHERE id = ?";
        jdbcTemplate.update(sql, post.getCategory(), post.getTitle(), post.getContent(), post.getName(), id);
        return ResponseEntity.ok("게시글 수정 성공");
    }

    // 키워드로 검색 기능 구현 //
    @GetMapping("/search")
    public ResponseEntity<List<Post>> searchPosts(@RequestParam(required = false) String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return ResponseEntity.ok(List.of()); // 빈 리스트 반환
        }
        try {
            String searchKeyword = "%" + keyword.trim() + "%";
            String sql = "SELECT * FROM posts WHERE title LIKE ? OR content LIKE ? OR name LIKE ? ORDER BY created_at DESC";
            List<Post> posts = jdbcTemplate.query(sql, new Object[]{searchKeyword, searchKeyword, searchKeyword}, (rs, rowNum) -> new Post(
                    rs.getLong("id"),
                    rs.getString("category"),
                    rs.getString("title"),
                    rs.getString("content"),
                    rs.getString("name"),
                    rs.getString("created_at"),
                    rs.getInt("views"),
                    rs.getInt("likes")
            ));
            return ResponseEntity.ok(posts);
        }catch (Exception e) {
            System.err.println("SQL 실행 중 오류 발생: " + e.getMessage());
            e.printStackTrace(); // 전체 스택 트레이스 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    // 사용자 게시글 좋아요 //
    @PostMapping("/{id}/like")
    public ResponseEntity<String> likePost(@PathVariable Long id) {
        String sql = "UPDATE posts SET likes = likes + 1 WHERE id = ?";
        jdbcTemplate.update(sql, id);
        return ResponseEntity.ok("좋아요 성공");
    }

    // 내가 쓴 게시글 내정보에 불러오기 //
    @GetMapping("/user/{userid}")
    public ResponseEntity<List<Post>> getUserPosts(@PathVariable String userid) {
        String sql = "SELECT id, title, created_at FROM posts WHERE name = ? ORDER BY created_at DESC";
        List<Post> posts = jdbcTemplate.query(sql, new Object[]{userid}, (rs, rowNum) -> {
            Post post = new Post();
            post.setId(rs.getLong("id"));
            post.setTitle(rs.getString("title"));
            post.setCreatedAt(rs.getString("created_at"));
            return post;
        });
        return ResponseEntity.ok(posts);
    }

}




