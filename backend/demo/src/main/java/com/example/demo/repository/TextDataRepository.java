package com.example.demo.repository;

import com.example.demo.entity.TextData;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TextDataRepository extends JpaRepository<TextData, Long> {
    List<TextData> findByUserId(Long userId);
}
