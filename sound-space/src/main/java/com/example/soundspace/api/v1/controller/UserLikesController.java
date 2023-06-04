package com.example.soundspace.api.v1.controller;

import com.example.soundspace.api.v1.service.UserLikesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserLikesController {

    private final UserLikesService userLikesService;

    @PostMapping("/{userId}/likes")
    public ResponseEntity<?> toggleLikeByUserId(@PathVariable Long userId) {
        return userLikesService.toggleLikeByUserId(userId);
    }

    @GetMapping("/me/likes-given")
    public ResponseEntity<?> getAllMyLikesGiven() {
        return userLikesService.getAllMyLikesGiven();
    }

    @GetMapping("/me/likes-received")
    public ResponseEntity<?> getAllMyLikesReceived() {
        return userLikesService.getAllMyLikesReceived();
    }
}

