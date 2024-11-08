package ru.kata.spring.boot_security.demo.initialization;

import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;
import ru.kata.spring.boot_security.demo.services.UserServiceImpl;

import javax.annotation.PostConstruct;
import java.util.Set;

@Component
public class DbInit {
    private UserServiceImpl userServiceImpl;
    private RoleRepository roleRepository;

    public DbInit(RoleRepository roleRepository, UserServiceImpl userServiceImpl) {
        this.roleRepository = roleRepository;
        this.userServiceImpl = userServiceImpl;
    }

    @PostConstruct
    public void postConstruct() {
        User user = new User();
        Role roleUser = new Role();
        roleUser.setName("ROLE_USER");
        roleRepository.save(roleUser);
        user.setFirstName("user");
        user.setLastName("user");
        user.setAge(Long.valueOf(7));
        user.setEmail("user@user.com");
        user.setUsername("user");
        user.setPassword("user");
        user.setRoles(Set.of(roleUser));
        userServiceImpl.saveUser(user);

        User admin = new User();
        Role roleAdmin = new Role();
        roleAdmin.setName("ROLE_ADMIN");
        roleRepository.save(roleAdmin);
        admin.setFirstName("admin");
        admin.setLastName("admin");
        admin.setAge(Long.valueOf(21));
        admin.setEmail("admin@admin.com");
        admin.setUsername("admin");
        admin.setPassword("admin");
        admin.setRoles(Set.of(roleAdmin, roleUser));
        userServiceImpl.saveUser(admin);
    }
}
