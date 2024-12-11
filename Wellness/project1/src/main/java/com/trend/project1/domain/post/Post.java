package com.trend.project1.domain.post;

public class Post {
    private Long id;
    private String category;
    private String title;
    private String content;
    private String name;
    private String createdAt;
    private int views;
    private int likes;

    // 기본 생성자
    public Post() {}

    // 모든 매개변수를 받는 생성자
    public Post(Long id, String category, String title, String content, String name, String createdAt, int views, int likes) {
        this.id = id;
        this.category = category;
        this.title = title;
        this.content = content;
        this.name = name;
        this.createdAt = createdAt;
        this.views = views;
        this.likes = likes;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public String getCategory() {
        return category;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public String getName() {
        return name;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public int getViews() {
        return views;
    }

    public int getLikes() {
        return likes;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public void setViews(int views) {
        this.views = views;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }
}

