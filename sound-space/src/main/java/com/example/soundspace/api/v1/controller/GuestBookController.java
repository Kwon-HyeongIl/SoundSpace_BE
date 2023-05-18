package com.example.soundspace.api.v1.controller;

import com.example.soundspace.api.entity.GuestBook;
import com.example.soundspace.api.entity.Users;
import com.example.soundspace.api.v1.dto.request.GuestBookRequestDto;
import com.example.soundspace.api.v1.dto.response.GuestBookResponseDto;
import com.example.soundspace.api.v1.service.GuestBookService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/guestbook")
public class GuestBookController {

    private final GuestBookService guestBookService;

    public GuestBookController(GuestBookService guestBookService) {
        this.guestBookService = guestBookService;
    }

    @PostMapping("/{targetUserId}")
    public ResponseEntity<GuestBookResponseDto> writeGuestBook(@PathVariable Long targetUserId,
                                                               @RequestBody GuestBookRequestDto guestBookRequestDto, @AuthenticationPrincipal Users writer) {
        return ResponseEntity.ok(guestBookService.writeGuestBook(writer, targetUserId, guestBookRequestDto));
    }
}
