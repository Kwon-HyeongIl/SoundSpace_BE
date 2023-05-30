package com.example.soundspace.api.v1.controller;

import com.example.soundspace.api.entity.GuestBook;
import com.example.soundspace.api.entity.Users;
import com.example.soundspace.api.jwt.JwtTokenProvider;
import com.example.soundspace.api.v1.dto.Response;
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

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/guestbook")
public class GuestBookController {

    private final GuestBookService guestBookService;
    private final JwtTokenProvider jwtTokenProvider;
    private final Response response;

    public GuestBookController(GuestBookService guestBookService, JwtTokenProvider jwtTokenProvider, Response response) {
        this.guestBookService = guestBookService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.response = response;
    }

    private String removeBearerFromToken(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            return token.substring("Bearer ".length());
        }
        return token;
    }

    @PostMapping("/{targetUserId}")
    public ResponseEntity<?> writeGuestBook(@PathVariable Long targetUserId,
                                            @RequestBody GuestBookRequestDto guestBookRequestDto,
                                            @RequestHeader("Authorization") String token) {
        token = removeBearerFromToken(token);
        if (!jwtTokenProvider.validateToken(token)) {
            return response.fail("Invalid token", HttpStatus.UNAUTHORIZED);
        }

        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        try {
            GuestBookResponseDto guestBookResponseDto = guestBookService.writeGuestBook(
                    authentication != null ? authentication.getName() : null,
                    targetUserId,
                    guestBookRequestDto
            );
            return response.success(guestBookResponseDto);
        } catch (Exception e) {
            return response.fail(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{guestBookId}")
    public ResponseEntity<?> deleteGuestBook(@PathVariable Long guestBookId,
                                             @RequestHeader("Authorization") String token) {
        token = removeBearerFromToken(token);
        if (!jwtTokenProvider.validateToken(token)) {
            return response.fail("Invalid token", HttpStatus.UNAUTHORIZED);
        }

        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        try {
            guestBookService.deleteGuestBook(authentication.getName(), guestBookId);
            return response.success();
        } catch (IllegalArgumentException e) {
            return response.fail(e.getMessage(), HttpStatus.UNAUTHORIZED);
        } catch (NoSuchElementException e) {
            return response.fail(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}

