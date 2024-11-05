package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.UserServiceImpl;


import java.security.Principal;

@Controller
public class UserController {
    private UserServiceImpl userServiceImpl;

    public UserController(UserServiceImpl userServiceImpl) {
        this.userServiceImpl = userServiceImpl;
    }

    @GetMapping("/user_info")
    public String showUserInfo(Principal principal, ModelMap model) {
        String username = principal.getName();
        User user = userServiceImpl.findByUsername(username);
        model.addAttribute("user", user);
        return "user_info";
    }


}
