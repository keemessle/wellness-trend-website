package com.trend.project1.Controller.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.trend.project1.Service.NaverTrendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

// 디버깅

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class TrendController {

    @Autowired
    private NaverTrendService naverTrendService;

    @Value("${youtube.api.key}")
    private String youtubeApiKey;


    // 1. Naver API
    @PostMapping("/trend")
    public ResponseEntity<String> getTrendData(@RequestBody Map<String, Object> requestData) {
//        System.out.println("Request Data:" +  requestData);

        // keywordGroups와 keywords 검증
        List<Map<String, Object>> keywordGroups = (List<Map<String, Object>>) requestData.get("keywordGroups");
        if (keywordGroups == null || keywordGroups.isEmpty() || keywordGroups.get(0).get("keywords") == null) {
            return ResponseEntity.badRequest().body("Invalid keywordGroups or keywords");
        }

        List<String> keywords = (List<String>) keywordGroups.get(0).get("keywords");
        if (keywords == null || keywords.isEmpty() || keywords.stream().anyMatch(String::isEmpty)) {
            return ResponseEntity.badRequest().body("Invalid keywords: cannot be empty strings");
        }

        String response = naverTrendService.fetchNaverTrendData(requestData);

        return ResponseEntity.ok(response);
    }

    // 2. Youtube API
    @GetMapping("/youtube-search")
    public ResponseEntity<?> getYouTubeVideos(@RequestParam String keyword) {
        final String apiKey = youtubeApiKey;
        final String youtubeUrl = "https://www.googleapis.com/youtube/v3/search";
        RestTemplate restTemplate = new RestTemplate();

        try {
            // API 요청 URL 생성
            String url = youtubeUrl + "?key=" + apiKey +
                    "&q=" + keyword +
                    "&part=snippet&type=video&maxResults=5&fields=items(id,snippet(title))";

            // API 호출
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);

            // JSON 응답 파싱
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode root = objectMapper.readTree(response.getBody());
            List<Map<String, String>> videos = new ArrayList<>();

            for (JsonNode item : root.get("items")) {
                String videoId = item.get("id").get("videoId").asText();
                String title = item.get("snippet").get("title").asText();
                videos.add(Map.of("videoId", videoId, "title", title));
            }

            return ResponseEntity.ok(videos);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("YouTube API 호출 오류: " + e.getMessage());
        }
    }


    // 3. Google API
    @GetMapping("/related-keywords")
    public ResponseEntity<?> getRelatedKeywords(@RequestParam String keyword) {
        String url = "https://www.google.com/complete/search?q=" + keyword + "&client=gws-wiz-serp";
        RestTemplate restTemplate = new RestTemplate();

        try {
            // Google API 호출
            String response = restTemplate.getForObject(url, String.class);
//            System.out.println("Raw response from Google: " + response);

            // 응답에서 JSON 데이터만 추출
            if (response != null && response.contains("(")) {
                String jsonData = response.substring(response.indexOf("(") + 1, response.lastIndexOf(")"));
//                System.out.println("Extracted JSON Data: " + jsonData); // JSON 데이터 확인

                // JSON 파싱
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode root = objectMapper.readTree(jsonData);

                // 연관 검색어 추출
                JsonNode suggestionsNode = root.get(0); // 첫 번째 배열이 연관 검색어 리스트
                List<String> relatedKeywords = new ArrayList<>();

                suggestionsNode.forEach(node -> {
                    String keywordText = node.get(0).asText();
                    // HTML 태그 제거
                    keywordText = keywordText.replaceAll("<.*?>", ""); // <b>, </b> 제거
                    relatedKeywords.add(keywordText);
                });

//                System.out.println("Extracted related keywords: " + relatedKeywords); // 추출된 키워드 확인
                return ResponseEntity.ok(relatedKeywords); // 연관 키워드 반환
            }

            return ResponseEntity.status(500).body("Invalid response from Google API");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error parsing Google autocomplete response");
        }
    }
}
