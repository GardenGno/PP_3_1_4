package ru.kata.spring.boot_security.demo.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;
import ru.kata.spring.boot_security.demo.services.UserServiceImpl;

import java.security.Principal;
import java.util.List;


@Controller
public class AdminController {
    private UserServiceImpl userServiceImpl;
    private final RoleRepository roleRepository;

    public AdminController(UserServiceImpl userServiceImpl, RoleRepository roleRepository) {
        this.userServiceImpl = userServiceImpl;
        this.roleRepository = roleRepository;
    }

    @GetMapping("/admin/adminPage")
    public String showAllUsers(Principal principal,ModelMap model) {
        List<User> allUsers = userServiceImpl.getAllUsers();
        model.addAttribute("allUsers", allUsers);
        User user = userServiceImpl.findByUsername(principal.getName());
        model.addAttribute("user", user);
        List<Role> roles = roleRepository.findAll();
        model.addAttribute("allRoles", roles);
        return "/admin/adminPage";
    }


    @PostMapping("/admin/saveUser")
    public String saveUser(@ModelAttribute("user") User user) {
        userServiceImpl.saveUser(user);
        return "redirect:/admin/adminPage";
    }

    @PostMapping("/admin/updateUser")
    public String updateUser(@ModelAttribute("user") User user) {
        userServiceImpl.updateUser(user);
        return "redirect:/admin/adminPage";
    }


    @PostMapping("/admin/deleteUser")
    public String deleteUser(@RequestParam("userId") Long id) {
        userServiceImpl.deleteUser(id);
        return "redirect:/admin/adminPage";
    }
}
