package com.example.soundspace.api.v1.service;

import com.example.soundspace.api.v1.dto.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;


@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class MusicService {
    private final Response response;
    public ResponseEntity<?> search(String accessToken, String query) {

        String apiUrl = "https://api.spotify.com/v1/search";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken);

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("type", "track")
                .queryParam("q", query);

        RestTemplate restTemplate = new RestTemplate();
        RequestEntity<?> requestEntity = new RequestEntity<>(headers, HttpMethod.GET, uriBuilder.build().toUri());
        ResponseEntity<String> responseEntity = restTemplate.exchange(requestEntity, String.class);

        String searchInfo = responseEntity.getBody();
        return response.success(searchInfo, "검색에 성공했습니다.", HttpStatus.OK);
    }
}
