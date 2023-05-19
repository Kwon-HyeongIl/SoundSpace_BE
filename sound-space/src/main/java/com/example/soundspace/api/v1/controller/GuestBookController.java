package com.example.soundspace.api.v1.controller;

import com.example.soundspace.api.entity.GuestBook;
import com.example.soundspace.api.entity.Users;
import com.example.soundspace.api.jwt.JwtTokenProvider;
import com.example.soundspace.api.v1.dto.request.GuestBookRequestDto;
import com.example.soundspace.api.v1.dto.response.GuestBookResponseDto;
import com.example.soundspace.api.v1.service.GuestBookService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/guestbook")
public class GuestBookController {

    private final GuestBookService guestBookService;
    private final JwtTokenProvider jwtTokenProvider;

    public GuestBookController(GuestBookService guestBookService, JwtTokenProvider jwtTokenProvider) {
        this.guestBookService = guestBookService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/{targetUserId}")
    public ResponseEntity<GuestBookResponseDto> writeGuestBook(@PathVariable Long targetUserId,
                                                               @RequestBody GuestBookRequestDto guestBookRequestDto,
                                                               @RequestHeader("Authorization") String token) {
        if (!jwtTokenProvider.validateToken(token)) {
            System.out.println("Invalid token");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Authentication authentication = jwtTokenProvider.getAuthentication(token);

        if(authentication == null || authentication.getName() == null) {
            System.out.println("Authentication is null");
        }
        if(targetUserId == null) {
            System.out.println("Target user ID is null");
        }
        if(guestBookRequestDto == null) {
            System.out.println("Guest book request DTO is null");
        }

        return ResponseEntity.ok(guestBookService.writeGuestBook(
                authentication != null ? authentication.getName() : null,
                targetUserId,
                guestBookRequestDto
        ));
    }
}
