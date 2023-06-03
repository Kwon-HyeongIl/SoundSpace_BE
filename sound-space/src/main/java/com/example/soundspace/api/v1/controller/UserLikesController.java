//package com.example.soundspace.api.v1.controller;
//
//import com.example.soundspace.api.entity.Users;
//import com.example.soundspace.api.jwt.JwtTokenProvider;
//import com.example.soundspace.api.v1.dto.Response;
//import com.example.soundspace.api.v1.dto.response.UserLikesResponseDto;
//import com.example.soundspace.api.v1.repository.UsersRepository;
//import com.example.soundspace.api.v1.service.UserLikesService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/v1")
//@RequiredArgsConstructor
//public class UserLikesController {
//
//    private final UserLikesService userLikesService;
//    private final Response response;
//
//    @PostMapping("/{likeeId}/likes")
//    public ResponseEntity<?> likeUser(@RequestHeader("Authorization") String bearerToken, @PathVariable Long likeeId) {
//        try {
//            String username = userLikesService.getAuthenticatedUsername(bearerToken);
//            Users liker = userLikesService.getUserByUsername(username);
//            UserLikesResponseDto userLikesResponseDto = userLikesService.likeUser(liker, likeeId);
//            return response.success(userLikesResponseDto);
//        } catch (Exception e) {
//            return response.fail(e.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }
//
//    @GetMapping("/likes_given")
//    public ResponseEntity<?> getUsersILiked(@RequestHeader("Authorization") String bearerToken) {
//        try {
//            String username = userLikesService.getAuthenticatedUsername(bearerToken);
//            Users liker = userLikesService.getUserByUsername(username);
//            List<UserLikesResponseDto> userLikesResponseDtos = userLikesService.getUsersILiked(liker);
//            return response.success(userLikesResponseDtos);
//        } catch (Exception e) {
//            return response.fail(e.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }
//
//    @GetMapping("/likes_received")
//    public ResponseEntity<?> getUsersWhoLikedMe(@RequestHeader("Authorization") String bearerToken) {
//        try {
//            String username = userLikesService.getAuthenticatedUsername(bearerToken);
//            Users likee = userLikesService.getUserByUsername(username);
//            List<UserLikesResponseDto> userLikesResponseDtos = userLikesService.getUsersWhoLikedMe(likee);
//            return response.success(userLikesResponseDtos);
//        } catch (Exception e) {
//            return response.fail(e.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }
//}
//
