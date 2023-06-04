package com.example.soundspace.api.v1.controller;

import com.example.soundspace.api.lib.Helper;
import com.example.soundspace.api.v1.dto.Response;
import com.example.soundspace.api.v1.dto.request.BookmarkRequestDto;
import com.example.soundspace.api.v1.service.BookmarksService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@RestController
public class BookmarksController {

    private final BookmarksService bookmarksService;
    private final Response response;

    @GetMapping("/users/me/bookmarks")
    public ResponseEntity<?> getAllMyBookmarks() {
        return bookmarksService.getAllMyBookmarks();
    }

    @PostMapping("/music/{musicId}/bookmarks")
    public ResponseEntity<?> toggleBookmarkAtMusic(@PathVariable Long musicId,
                                                   @Validated @RequestBody BookmarkRequestDto.toggleBookmarkAtMusic bookmarkInfo,
                                                   @ApiIgnore Errors errors) {
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }
        return bookmarksService.toggleBookmarkAtMusic(musicId, bookmarkInfo);
    }
}
