package com.example.demo.service;

import com.example.demo.entity.TextData;
import com.example.demo.repository.TextDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TextDataService {

    @Autowired
    private TextDataRepository textDataRepository;

    public List<TextData> getTextsByUserId(Long userId) {
        return textDataRepository.findByUserId(userId);
    }

    public void saveTextData(TextData textData) {
        textDataRepository.save(textData);
    }

    public void deleteTextData(Long id) {
        textDataRepository.deleteById(id);
    }

    public Optional<TextData> getTextById(Long id) {
        return textDataRepository.findById(id);
    }
}
