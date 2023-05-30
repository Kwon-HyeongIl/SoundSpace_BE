package com.example.soundspace.api.v1.controller;

import com.example.soundspace.api.entity.Users;
import com.example.soundspace.api.jwt.JwtTokenProvider;
import com.example.soundspace.api.v1.dto.Response;
import com.example.soundspace.api.v1.dto.response.UserLikesResponseDto;
import com.example.soundspace.api.v1.repository.UsersRepository;
import com.example.soundspace.api.v1.service.UserLikesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    private final Response response; // 추가

    @PostMapping("/{likeeId}/likes")
    public ResponseEntity<?> likeUser(@RequestHeader("Authorization") String bearerToken, @PathVariable Long likeeId) {
        String token = bearerToken.substring(7);
        String username = jwtTokenProvider.getAuthentication(token).getName();
        Users liker = usersRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username : " + username));
        try {
            UserLikesResponseDto userLikesResponseDto = userLikesService.likeUser(liker, likeeId);
            return response.success(userLikesResponseDto);
        } catch (Exception e) {
            return response.fail(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/likes_given")
    public ResponseEntity<?> getUsersILiked(@RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.substring(7);
        String username = jwtTokenProvider.getAuthentication(token).getName();
        Users liker = usersRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username : " + username));
        try {
            List<UserLikesResponseDto> userLikesResponseDtos = userLikesService.getUsersILiked(liker);
            return response.success(userLikesResponseDtos);
        } catch (Exception e) {
            return response.fail(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/likes_received")
    public ResponseEntity<?> getUsersWhoLikedMe(@RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.substring(7);
        String username = jwtTokenProvider.getAuthentication(token).getName();
        Users likee = usersRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username : " + username));
        try {
            List<UserLikesResponseDto> userLikesResponseDtos = userLikesService.getUsersWhoLikedMe(likee);
            return response.success(userLikesResponseDtos);
        } catch (Exception e) {
            return response.fail(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}


