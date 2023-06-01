package com.example.soundspace.api.v1.controller;

import com.example.soundspace.api.genius.GeniusToken;
import com.example.soundspace.api.v1.service.MusicService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/music")
@RestController
public class MusicController {
    private final GeniusToken geniusToken;
    private final MusicService musicService;

    @GetMapping("/search")
    public ResponseEntity<?> search(String query) {
        String accessToken = geniusToken.getAccessToken();
        return musicService.search(accessToken, query);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTrackById(@PathVariable Long id) {
        String accessToken = geniusToken.getAccessToken();
        return musicService.getTrackById(accessToken, id);
    }
}
