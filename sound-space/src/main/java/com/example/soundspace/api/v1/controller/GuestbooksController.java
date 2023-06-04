package com.example.soundspace.api.v1.controller;

import com.example.soundspace.api.lib.Helper;
import com.example.soundspace.api.v1.dto.Response;
import com.example.soundspace.api.v1.dto.request.GuestbookRequestDto;
import com.example.soundspace.api.v1.service.GuestbooksService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/users/{userId}")
public class GuestbooksController {

    private final GuestbooksService guestBookService;
    private final Response response;

    @GetMapping("/guestbooks")
    public ResponseEntity<?> getAllGuestbooksByUserId(@PathVariable String userId) {
        return guestBookService.getAllGuestbooksByUserId(userId);
    }

    @PostMapping("/guestbooks")
    public ResponseEntity<?> writeGuestbook(@PathVariable String userId,
                                            @Validated @RequestBody GuestbookRequestDto.WriteGuestbook writeGuestbook,
                                            @ApiIgnore Errors errors) {
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }

        return guestBookService.writeGuestbook(userId, writeGuestbook);
    }

    @DeleteMapping("/guestbooks/{guestbookId}")
    public ResponseEntity<?> deleteGuestbookById(@PathVariable String userId,
                                                 @PathVariable Long guestbookId) {
        return guestBookService.deleteGuestbookById(userId, guestbookId);
    }
}