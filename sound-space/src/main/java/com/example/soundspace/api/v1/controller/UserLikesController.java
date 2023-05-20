package com.example.soundspace.api.v1.controller;

import com.example.soundspace.api.entity.Users;
import com.example.soundspace.api.jwt.JwtTokenProvider;
import com.example.soundspace.api.v1.dto.response.UserLikesResponseDto;
import com.example.soundspace.api.v1.repository.UsersRepository;
import com.example.soundspace.api.v1.service.UserLikesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserLikesController {

    private final UserLikesService userLikesService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UsersRepository usersRepository;

    @PostMapping("/{likeeId}/likes")
    public ResponseEntity<UserLikesResponseDto> likeUser(@RequestHeader("Authorization") String bearerToken, @PathVariable Long likeeId) {
        String token = bearerToken.substring(7);
        String username = jwtTokenProvider.getAuthentication(token).getName();
        Users liker = usersRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username : " + username));
        return ResponseEntity.ok(userLikesService.likeUser(liker, likeeId));
    }

    @GetMapping("/likes_given")
    public ResponseEntity<List<UserLikesResponseDto>> getUsersILiked(@RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.substring(7);
        String username = jwtTokenProvider.getAuthentication(token).getName();
        Users liker = usersRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username : " + username));
        return ResponseEntity.ok(userLikesService.getUsersILiked(liker));
    }

    @GetMapping("/likes_received")
    public ResponseEntity<List<UserLikesResponseDto>> getUsersWhoLikedMe(@RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.substring(7);
        String username = jwtTokenProvider.getAuthentication(token).getName();
        Users likee = usersRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username : " + username));
        return ResponseEntity.ok(userLikesService.getUsersWhoLikedMe(likee));
    }
}

