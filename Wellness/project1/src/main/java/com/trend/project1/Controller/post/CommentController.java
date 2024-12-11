package com.trend.project1.Controller.post;

import com.trend.project1.domain.post.Comment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final JdbcTemplate jdbcTemplate;
    private static final Logger logger = LoggerFactory.getLogger(CommentController.class);

    public CommentController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // 특정 게시물의 댓글 가져오기
    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Comment>> getCommentsByPostId(@PathVariable Long postId) {
        String sql = "SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC";
        List<Comment> comments = jdbcTemplate.query(sql, new Object[]{postId}, (rs, rowNum) -> {
            Comment comment = new Comment();
            comment.setId(rs.getLong("id"));
            comment.setPostId(rs.getLong("post_id"));
            comment.setParentId(rs.getLong("parent_id"));
            comment.setName(rs.getString("name"));
            comment.setContent(rs.getString("content"));
            comment.setCreatedAt(rs.getTimestamp("created_at"));
            return comment;
        });
        return ResponseEntity.ok(comments);
    }

    // 댓글 작성
    @PostMapping
    public ResponseEntity<String> addComment(@RequestBody Comment comment) {
        if (comment.getPostId() == null || comment.getContent() == null || comment.getName() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("모든 필드는 필수입니다.");
        }

        String sql = "INSERT INTO comments (post_id, parent_id, name, content, created_at) VALUES (?, ?, ?, ?, NOW())";
        jdbcTemplate.update(sql, comment.getPostId(), comment.getParentId(), comment.getName(), comment.getContent());

        return ResponseEntity.status(HttpStatus.CREATED).body("댓글 작성 완료!");
    }

    // 댓글 삭제
    @DeleteMapping("/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable("commentId") Long commentId) {
        String sql = "DELETE FROM comments WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, commentId);

        if (rowsAffected == 0) {
            logger.error("댓글 삭제 실패: 댓글 ID {}가 존재하지 않습니다.", commentId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 댓글을 찾을 수 없습니다.");
        }

        logger.info("댓글 ID {} 삭제 완료", commentId);
        return ResponseEntity.ok("댓글 삭제 완료!");
    }

    // 댓글 수정
    @PutMapping("/{id}")
    public ResponseEntity<String> updateComment(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String content = payload.get("content");
        String sql = "UPDATE comments SET content = ? WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, content, id);

        if (rowsAffected == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 댓글을 찾을 수 없습니다.");
        }

        return ResponseEntity.ok("댓글 수정 완료!");
    }


    // 내가 쓴 댓글 불러오기 //
    @GetMapping("/user/{userid}")
    public ResponseEntity<List<Comment>> getUserComments(@PathVariable String userid) {
        String sql = "SELECT c.id, c.content, c.created_at, c.post_id " +
                "FROM comments c " +
                "WHERE c.name = ? " +
                "ORDER BY c.created_at DESC";
        List<Comment> comments = jdbcTemplate.query(sql, new Object[]{userid}, (rs, rowNum) -> {
            Comment comment = new Comment();
            comment.setId(rs.getLong("id"));
            comment.setContent(rs.getString("content"));
            comment.setCreatedAt(rs.getTimestamp("created_at"));
            comment.setPostId(rs.getLong("post_id")); // 댓글이 달린 게시물의 ID
            return comment;
        });

        return ResponseEntity.ok(comments);
    }


}
