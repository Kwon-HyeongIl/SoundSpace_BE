package com.example.soundspace.api.v1.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    @GetMapping("/")
    public String main() {
        return "main";
    }

    @GetMapping("/sign-up")
    public String signUp() {
        return "sign-up";
    }

    @GetMapping("/myhome")
    public String myhome() {
        return "myhome";
    }

    @GetMapping("/log-in")
    public String logIn() {
        return "log-in";
    }
}
