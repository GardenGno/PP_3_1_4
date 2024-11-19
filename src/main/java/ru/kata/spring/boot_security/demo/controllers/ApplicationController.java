package ru.kata.spring.boot_security.demo.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class ApplicationController {
    @GetMapping("/admin/adminPage")
    public String adminPage() {
        return "/admin/adminPage";
    }
    @GetMapping("/user_info")
    public String userInfoPage(){
        return "/user_info";
    }
}
