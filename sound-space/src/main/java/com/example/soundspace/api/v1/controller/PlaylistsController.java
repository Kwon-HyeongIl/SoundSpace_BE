package com.example.soundspace.api.v1.controller;

import com.example.soundspace.api.v1.dto.request.PlaylistRequestDto;
import com.example.soundspace.api.v1.service.PlaylistsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Validated
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/playlists")
@RestController
public class PlaylistsController {

    private final PlaylistsService playlistsService;

    @GetMapping("/me")
    public ResponseEntity<?> getMyPlaylist() {
        return playlistsService.getMyPlaylist();
    }

    @GetMapping("/me/tracks")
    public ResponseEntity<?> getMyPlaylistForUpdating() {
        return playlistsService.getMyPlaylistForUpdating();
    }

    @GetMapping("/me/tracks/{trackIndex}")
    public ResponseEntity<?> getMyTrackInfo(@PathVariable @Min(1) @Max(10) Integer trackIndex) {
        return playlistsService.getMyTrackInfo(trackIndex);
    }

    @PatchMapping("/me/tracks/update/{trackIndex}")
    public ResponseEntity<?> updateMyTrackInfo(@PathVariable @Min(1) @Max(10) Integer trackIndex,
                                              @RequestBody PlaylistRequestDto.Update update) {
        return playlistsService.update(trackIndex, update);
    }

    @PatchMapping("/me/tracks/clear/{trackIndex}")
    public ResponseEntity<?> clearMyTrackInfo(@PathVariable @Min(1) @Max(10) Integer trackIndex) {
        return playlistsService.clear(trackIndex);
    }

    @GetMapping("/{playlistId}")
    public ResponseEntity<?> getPlaylistById(@PathVariable Long playlistId) {
        return playlistsService.getPlaylistById(playlistId);
    }

    @GetMapping("/{playlistId}/tracks/{trackIndex}")
    public ResponseEntity<?> getTrackInfo(@PathVariable Long playlistId,
                                          @PathVariable @Min(1) @Max(10) Integer trackIndex) {
        return playlistsService.getTrackInfo(playlistId, trackIndex);
    }
}
