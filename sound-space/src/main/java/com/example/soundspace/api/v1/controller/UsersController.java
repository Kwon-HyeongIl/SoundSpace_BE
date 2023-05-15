package com.example.soundspace.api.v1.controller;

import com.example.soundspace.api.entity.Users;
import com.example.soundspace.api.jwt.JwtTokenProvider;
import com.example.soundspace.api.lib.Helper;
import com.example.soundspace.api.security.SecurityUtil;
import com.example.soundspace.api.v1.dto.Response;
import com.example.soundspace.api.v1.dto.request.UserRequestDto;
import com.example.soundspace.api.v1.service.UsersService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
@RestController
public class UsersController {

    private final JwtTokenProvider jwtTokenProvider;
    private final UsersService usersService;
    private final Response response;

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@Validated UserRequestDto.SignUp signUp, Errors errors) {
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }
        return usersService.signUp(signUp);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Validated UserRequestDto.Login login, Errors errors) {
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }
        return usersService.login(login);
    }

    @PostMapping("/reissue")
        public ResponseEntity<?> reissue(@Validated UserRequestDto.Reissue reissue, Errors errors) {
            if (errors.hasErrors()) {
                return response.invalidFields(Helper.refineErrors(errors));
            }
            return usersService.reissue(reissue);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@Validated UserRequestDto.Logout logout, Errors errors) {
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }
        return usersService.logout(logout);
    }

    @GetMapping("/authority")
    public ResponseEntity<?> authority() {
        log.info("ADD ROLE_ADMIN");
        return usersService.authority();
    }

    @GetMapping("/user")
    public ResponseEntity<?> user() {
        log.info("ROLE_USER");
        return response.success();
    }

    @GetMapping("/adminTest")
    public ResponseEntity<?> adminTest() {
        log.info("ROLE_ADMIN TEST");
        return response.success();
    }

    @PatchMapping("/{username}")
    public ResponseEntity<?> updateUser(@PathVariable String username, @Validated @RequestBody UserRequestDto.Update update, Errors errors) {
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }

        String currentUser = SecurityUtil.getCurrentUsername();
        if (!currentUser.equals(username)) {
            return response.fail("접근 권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        return usersService.updateUser(username, update);
    }

    @GetMapping("/{username}/profiles")
    public ResponseEntity<?> profiles(@PathVariable String username) {
        return usersService.profiles(username);
    }
}
