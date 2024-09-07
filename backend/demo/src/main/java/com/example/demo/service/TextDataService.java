package com.example.demo.service;

import com.example.demo.dto.TextDataDTO;
import com.example.demo.entity.TextData;
import com.example.demo.entity.User;
import com.example.demo.repository.TextDataRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TextDataService {

    @Autowired
    private TextDataRepository textDataRepository;

    @Autowired
    private UserRepository userRepository;

    public List<TextData> getTextDataByUser(User user) {
        return textDataRepository.findByUser(user);
    }

    public void saveTextData(TextDataDTO textDataDTO) {
        User user = userRepository.findById(textDataDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        TextData textData = new TextData();
        textData.setUser(user);
        textData.setExtractedText(textDataDTO.getExtractedText());

        textDataRepository.save(textData);
    }



    public void deleteTextData(Long id) {
        textDataRepository.deleteById(id);
    }
}