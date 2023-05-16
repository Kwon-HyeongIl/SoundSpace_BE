package com.example.soundspace.api.v1.controller;

import com.example.soundspace.api.spotify.SpotifyToken;
import com.example.soundspace.api.v1.dto.Response;
import com.example.soundspace.api.v1.service.MusicService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/music")
@RestController
public class MusicController {
    private final MusicService musicService;
    private final Response response;

    @GetMapping("/search")
    public ResponseEntity<?> search(String query) {
        String accessToken = SpotifyToken.accessToken();

        return musicService.search(accessToken, query);
    }
}
