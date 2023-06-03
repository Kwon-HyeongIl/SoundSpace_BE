//package com.example.soundspace.api.v1.controller;
//
//import com.example.soundspace.api.lib.Helper;
//import com.example.soundspace.api.v1.dto.Response;
//import com.example.soundspace.api.v1.dto.request.GuestBookRequestDto;
//import com.example.soundspace.api.v1.service.GuestBookService;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.validation.Errors;
//import org.springframework.validation.annotation.Validated;
//import org.springframework.web.bind.annotation.*;
//import springfox.documentation.annotations.ApiIgnore;
//
//import java.util.NoSuchElementException;
//
//@Slf4j
//@RequiredArgsConstructor
//@RestController
//@RequestMapping("/api/v1/guestbook")
//public class GuestBookController {
//
//    private final GuestBookService guestBookService;
//    private final Response response;
//
//    @GetMapping("/{guestBookId}")
//    public ResponseEntity<?> getAllGuestBooksById(@PathVariable Long guestBookId) {
//        return guestBookService.getAllGuestBooksById(guestBookId);
//    }
//
//    @PostMapping("/{targetUserId}")
//    public ResponseEntity<?> writeGuestBook(@PathVariable Long targetUserId,
//                                            @Validated @RequestBody GuestBookRequestDto guestBookRequestDto,
//                                            @ApiIgnore Errors errors) {
//        if (errors.hasErrors()) {
//            return response.invalidFields(Helper.refineErrors(errors));
//        }
//
//        return guestBookService.writeGuestBook(targetUserId, guestBookRequestDto);
//    }
//
//    @DeleteMapping("/{guestBookId}")
//    public ResponseEntity<?> deleteGuestBook(@PathVariable Long guestBookId) {
//        return guestBookService.deleteGuestBook(guestBookId);
//    }
//}