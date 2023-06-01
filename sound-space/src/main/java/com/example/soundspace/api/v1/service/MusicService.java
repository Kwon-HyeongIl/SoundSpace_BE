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


import java.util.ArrayList;
import java.util.List;


@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class MusicService {
    private final Response response;

//    public ResponseEntity<?> search(String accessToken, String query) {
//
//        String apiUrl = "https://api.spotify.com/v1/search";
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        headers.setBearerAuth(accessToken);
//
//        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(apiUrl)
//                .queryParam("type", "track")
//                .queryParam("q", query);
//
//        RestTemplate restTemplate = new RestTemplate();
//        RequestEntity<?> requestEntity = new RequestEntity<>(headers, HttpMethod.GET, uriBuilder.build().toUri());
//        ResponseEntity<String> responseEntity = restTemplate.exchange(requestEntity, String.class);
//
//        if (responseEntity.getStatusCode() == HttpStatus.OK) {
//            String responseBody = responseEntity.getBody();
//
//            try {
//                ObjectMapper objectMapper = new ObjectMapper();
//                JsonNode root = objectMapper.readTree(responseBody);
//                JsonNode tracksNode = root.path("tracks");
//                JsonNode itemsNode = tracksNode.path("items");
//
//                List<MusicResponseDto.TrackInfo> trackInfos = new ArrayList<>();
//                for (JsonNode trackNode : itemsNode) {
//                    String artistName = trackNode.path("artists").get(0).path("name").asText();
//                    String trackTitle = trackNode.path("name").asText();
//                    String albumImageUrl = trackNode.path("album").path("images").get(0).path("url").asText();
//
//                    MusicResponseDto.TrackInfo trackInfo = MusicResponseDto.TrackInfo.builder()
//                            .artistName(artistName)
//                            .trackTitle(trackTitle)
//                            .albumImageUrl(albumImageUrl)
//                            .build();
//
//                    trackInfos.add(trackInfo);
//                }
//                return response.success(trackInfos, "검색에 성공했습니다.", HttpStatus.OK);
//            } catch (IOException e) {
//                e.printStackTrace();
//                throw new RuntimeException("API 응답 처리 중 오류가 발생했습니다.");
//            }
//        }
//        return response.fail("검색에 실패했습니다.", responseEntity.getStatusCode());
//    }

    public ResponseEntity<?> search(String accessToken, String query) {
        String apiUrl = "https://api.genius.com/search";

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("q", query);

        ResponseEntity<String> responseEntity = getStringResponseEntity(accessToken, builder);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            String responseString = responseEntity.getBody();

            try {
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode responseJson = objectMapper.readTree(responseString);

                if (responseJson.has("response")) {
                    JsonNode responseObj = responseJson.get("response");

                    if (responseObj.has("hits")) {
                        JsonNode hitsArray = responseObj.get("hits");

                        List<MusicResponseDto.SearchInfo> searchInfos = new ArrayList<>();
                        for (JsonNode hitNode : hitsArray) {
                            if (hitNode.has("result")) {
                                JsonNode resultObj = hitNode.get("result");

                                Long id = Long.parseLong(resultObj.get("id").asText());
                                String trackTitle = resultObj.get("title_with_featured").asText();
                                String artistName = resultObj.get("primary_artist").get("name").asText();
                                String albumImageUrl = resultObj.get("header_image_thumbnail_url").asText();

                                MusicResponseDto.SearchInfo searchInfo = MusicResponseDto.SearchInfo.builder()
                                        .id(id)
                                        .trackTitle(trackTitle)
                                        .artistName(artistName)
                                        .albumImageUrl(albumImageUrl)
                                        .build();

                                searchInfos.add(searchInfo);
                            }
                        }
                        return response.success(searchInfos, "검색에 성공했습니다.", HttpStatus.OK);
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
                throw new RuntimeException("API 응답 처리 중 오류가 발생했습니다.");
            }
        }
        return response.fail("검색에 실패했습니다.", responseEntity.getStatusCode());
    }

    public ResponseEntity<?> getTrackById(String accessToken, Long id) {
        String apiUrl = "https://api.genius.com/songs";

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .pathSegment(String.valueOf(id));

        ResponseEntity<String> responseEntity = getStringResponseEntity(accessToken, builder);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            String responseString = responseEntity.getBody();

            try {
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode responseJson = objectMapper.readTree(responseString);

                if (responseJson.has("response")) {
                    JsonNode responseObj = responseJson.get("response");

                    if (responseObj.has("song")) {
                        JsonNode resultObj = responseObj.get("song");

                        String trackTitle = resultObj.get("title_with_featured").asText();
                        String artistName = resultObj.get("primary_artist").get("name").asText();
                        String albumImageUrl = resultObj.get("header_image_thumbnail_url").asText();

                        MusicResponseDto.TrackInfo trackInfo = MusicResponseDto.TrackInfo.builder()
                                .id(id)
                                .trackTitle(trackTitle)
                                .artistName(artistName)
                                .albumImageUrl(albumImageUrl)
                                .lyrics(getLyricsById(id))
                                .build();

                        return response.success(trackInfo, "곡 조회에 성공했습니다.", HttpStatus.OK);
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
                throw new RuntimeException("API 응답 처리 중 오류가 발생했습니다.");
            }
        }
        return response.fail("곡 조회에 실패했습니다.", responseEntity.getStatusCode());
    }

    private static ResponseEntity<String> getStringResponseEntity(String accessToken, UriComponentsBuilder builder) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);

        RestTemplate restTemplate = new RestTemplate();
        RequestEntity<?> requestEntity = new RequestEntity<>(headers, HttpMethod.GET, builder.build().toUri());

        ResponseEntity<String> responseEntity = restTemplate.exchange(
                requestEntity,
                String.class
        );
        return responseEntity;
    }

    private String getLyricsById(Long id) {
        String url = "https://genius.com/songs/" + id + "/embed.js";

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> result = restTemplate.getForEntity(url, String.class);
        String code = result.getBody();

        String startPattern = "<div class=\\\\\\\"rg_embed_body\\\\\\\">\\\\n  ";
        String endPattern = "<\\/div>";

        int startIndex = code.indexOf(startPattern);
        int endIndex = code.indexOf(endPattern, startIndex);

        if (startIndex != -1 && endIndex != -1) {
            return removePatternsAndReplace(code.substring(startIndex + startPattern.length(), endIndex));
        } else
            return null;
    }

    private static String removePatternsAndReplace(String input) {
        String pattern1 = "<a href.*?>|<br>|<\\\\/a>|<p>|<\\\\/p>|<i>|<\\\\/i>|<b>|<\\\\/b>";
        String pattern2 = "\\\\\\\\n";
        String pattern3 = "\\\\'";
        String pattern4 = "\\\\\\\\\\\\\\\"";
        String pattern5 = "&amp;";
        String replacement = "";

        String output = input.replaceAll(pattern1, replacement);
        output = output.replaceAll(pattern2, "\n");
        output = output.replaceAll(pattern3, "\'");
        output = output.replaceAll(pattern4, "\"");
        output = output.replaceAll(pattern5, "&");

        return output;
    }
}
