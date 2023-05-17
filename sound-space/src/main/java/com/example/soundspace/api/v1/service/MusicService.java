package com.example.soundspace.api.v1.service;

import com.example.soundspace.api.v1.dto.Response;
import com.example.soundspace.api.v1.dto.response.MusicResponseDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            String responseBody = responseEntity.getBody();

            try {
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode root = objectMapper.readTree(responseBody);
                JsonNode tracksNode = root.path("tracks");
                JsonNode itemsNode = tracksNode.path("items");

                List<MusicResponseDto.TrackInfo> trackInfos = new ArrayList<>();
                for (JsonNode trackNode : itemsNode) {
                    String artistName = trackNode.path("artists").get(0).path("name").asText();
                    String trackTitle = trackNode.path("name").asText();
                    String albumImageUrl = trackNode.path("album").path("images").get(0).path("url").asText();

                    MusicResponseDto.TrackInfo trackInfo = MusicResponseDto.TrackInfo.builder()
                            .artistName(artistName)
                            .trackTitle(trackTitle)
                            .albumImageUrl(albumImageUrl)
                            .build();

                    trackInfos.add(trackInfo);
                }
                return response.success(trackInfos, "검색에 성공했습니다.", HttpStatus.OK);
            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException("API 응답 처리 중 오류가 발생했습니다.");
            }
        }
        return response.fail("검색에 실패했습니다.", responseEntity.getStatusCode());
    }
}
