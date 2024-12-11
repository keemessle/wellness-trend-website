package com.trend.project1.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;


@Service
public class NaverTrendService {

    @Value("${naver.api.client-id}")
    private String clientId;

    @Value("${naver.api.client-secret}")
    private String clientSecret;

    public String fetchNaverTrendData(Map<String, Object> requestData) {
        String apiUrl = "https://openapi.naver.com/v1/datalab/search";

        try {
//            System.out.println("요청 데이터: " + requestData);

//            // JSON 변환 확인
//            ObjectMapper mapper = new ObjectMapper();
//            String jsonRequestData = mapper.writeValueAsString(requestData);
//            System.out.println("Naver API로 전송되는 JSON 데이터: " + jsonRequestData);

            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.set("X-Naver-Client-Id", clientId);
            headers.set("X-Naver-Client-Secret", clientSecret);
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> entity = new HttpEntity<>(new JSONObject(requestData).toString(), headers);
            String response =  restTemplate.postForObject(apiUrl, entity, String.class);

//            System.out.println("Naver API 응답: " + response);
            return response;

        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\": \"Failed to fetch data from Naver API\"}";
        }

    }

}
