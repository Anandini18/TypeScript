package com.example.demo.controller;

import com.example.demo.dto.TextDataDTO;
import com.example.demo.entity.TextData;
import com.example.demo.entity.User;
import com.example.demo.service.TextDataService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/text")
public class TextDataController {

//    @Autowired
//    private TextDataService textDataService;
//
//    @Autowired
//    private UserService userService;
//
//    @PostMapping("/save")
//    public ResponseEntity<?> saveText(@RequestBody TextDataDTO textDataDTO, Authentication authentication) {
//        // Extract user from the authentication object
//        String username = authentication.getName();
//        User user = userService.findByUsername(username);
//
//        // Set the user ID in the DTO
//        textDataDTO.setUserId(user.getId());
//
//        textDataService.saveTextData(textDataDTO);
//        return ResponseEntity.ok().build();
//    }
//
//
//
//
//    @GetMapping("/list")
//    public ResponseEntity<List<TextDataDTO>> getTexts(Authentication authentication) {
//        User user = userService.findByUsername(authentication.getName());
//        List<TextData> textDataList = textDataService.getTextDataByUser(user);
//
//        // Convert TextData entities to TextDataDTO
//        List<TextDataDTO> textDataDTOList = textDataList.stream().map(textData -> {
//            TextDataDTO dto = new TextDataDTO();
//            dto.setUserId(textData.getUser().getId());
//            dto.setExtractedText(textData.getExtractedText());
//            return dto;
//        }).collect(Collectors.toList());
//
//        return ResponseEntity.ok(textDataDTOList);
//    }
//
//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<?> deleteText(@PathVariable Long id) {
//        textDataService.deleteTextData(id);
//        return ResponseEntity.ok().build();
//    }


}
