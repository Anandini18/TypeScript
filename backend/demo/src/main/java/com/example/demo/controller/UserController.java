package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;

    // Enable CORS for the register endpoint
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody User user) {
    User loggedInUser = userService.loginUser(user.getUsername(), user.getPassword());
    
    if (loggedInUser != null) {
        // Return user details or token after successful authentication
        return ResponseEntity.ok(loggedInUser);
    } else {
        // Return 401 Unauthorized if login fails
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}


}
