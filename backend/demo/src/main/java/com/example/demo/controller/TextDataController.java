package com.example.demo.controller;

import com.example.demo.entity.TextData;
import com.example.demo.entity.User;
import com.example.demo.service.TextDataService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/texts")
public class TextDataController {

    @Autowired
    private TextDataService textDataService;

    @Autowired
    private UserService userService;

    // Fetch user's texts
    @GetMapping
    public List<TextData> getUserTexts(Principal principal) {
        Optional<User> optionalUser = userService.findByUsername(principal.getName());

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return textDataService.getTextsByUserId(user.getId());
        } else {
            throw new RuntimeException("User not found");
        }
    }

    // Save extracted text
    @PostMapping("/save")
    public ResponseEntity<?> saveText(@RequestBody TextData textData, Principal principal) {
        Optional<User> optionalUser = userService.findByUsername(principal.getName());

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            textData.setUser(user);
            textDataService.saveTextData(textData);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
    }

    // Delete text by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteText(@PathVariable Long id, Principal principal) {
        Optional<User> optionalUser = userService.findByUsername(principal.getName());

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            // Ensure the text belongs to the logged-in user before deleting
            Optional<TextData> textData = textDataService.getTextById(id);
            if (textData.isPresent() && textData.get().getUser().getId().equals(user.getId())) {
                textDataService.deleteTextData(id);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized deletion attempt");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
    }
}
