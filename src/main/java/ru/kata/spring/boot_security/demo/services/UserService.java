package ru.kata.spring.boot_security.demo.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;


public interface UserService {
    public List<User> getAllUsers();


    public void saveUser(User user);


    public User findByUsername(String username);


    public void deleteUser(Long id);


    public void updateUser(User user);


    public User getUserById(Long id);
}
