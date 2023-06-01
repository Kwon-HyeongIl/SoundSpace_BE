package com.example.soundspace.api.v1.controller;

import com.example.soundspace.api.genius.GeniusToken;
import com.example.soundspace.api.v1.service.MusicService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{musicId}")
    public ResponseEntity<?> getMusicById(@PathVariable Long musicId) {
        String accessToken = geniusToken.getAccessToken();
        return musicService.getMusicById(accessToken, musicId);
    }

    @PostMapping("/{musicId}/bookmarks")
    public ResponseEntity<?> toggleBookmark(@PathVariable Long musicId) {
        return musicService.toggleBookmark(musicId);
    }
}
