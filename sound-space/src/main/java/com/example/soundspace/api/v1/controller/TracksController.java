package com.example.soundspace.api.v1.controller;

import com.example.soundspace.api.v1.dto.request.TrackRequestDto;
import com.example.soundspace.api.v1.service.TracksService;
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
@RequestMapping("/api/v1/users/{userId}/tracks")
@RestController
public class TracksController {

    private final TracksService tracksService;

    @GetMapping
    public ResponseEntity<?> getTracksByUserId(@PathVariable String userId) {
        return tracksService.getTracksByUserId(userId);
    }

    @GetMapping("/edit")
    public ResponseEntity<?> getMyTracksForEditing(@PathVariable String userId) {
        return tracksService.getMyTracksForEditing(userId);
    }

    @GetMapping("/{trackIndex}")
    public ResponseEntity<?> getTrackInfoByUserIdAndTrackIndex(@PathVariable String userId,
                                          @PathVariable @Min(1) @Max(10) Integer trackIndex) {
        return tracksService.getTrackInfoByUserIdAndTrackIndex(userId, trackIndex);
    }

    @PatchMapping("/{trackIndex}/update")
    public ResponseEntity<?> updateMyTrackInfo(@PathVariable String userId,
                                               @PathVariable @Min(1) @Max(10) Integer trackIndex,
                                               @RequestBody TrackRequestDto.Update update) {
        return tracksService.updateMyTrackInfo(userId, trackIndex, update);
    }

    @PatchMapping("/{trackIndex}/clear")
    public ResponseEntity<?> clearMyTrackInfo(@PathVariable String userId,
                                              @PathVariable @Min(1) @Max(10) Integer trackIndex) {
        return tracksService.clearMyTrackInfo(userId, trackIndex);
    }
}
