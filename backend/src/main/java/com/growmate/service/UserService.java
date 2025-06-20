package com.growmate.service;

import com.growmate.dto.UserDto;
import com.growmate.exception.ResourceNotFoundException;
import com.growmate.model.User;
import com.growmate.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    public UserDto updateUser(Long userId, String name, MultipartFile imageFile) {
        logger.info("Updating user with ID: {}", userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));

        if (name != null && !name.isBlank()) {
            user.setName(name);
        }

        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                String fileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
                Path uploadPath = Paths.get("uploads/");

                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                Path filePath = uploadPath.resolve(fileName);
                Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                user.setImage("/uploads/" + fileName);
            } catch (IOException e) {
                logger.error("Failed to save profile image", e);
                throw new RuntimeException("Failed to save profile image", e);
            }
        }

        User savedUser = userRepository.save(user);
        logger.info("User updated successfully with ID: {}", savedUser.getId());

        return mapToDto(savedUser);
    }

    private UserDto mapToDto(User user) {
        return new UserDto(user.getId(), user.getName(), user.getEmail(), user.getImage());
    }
}
