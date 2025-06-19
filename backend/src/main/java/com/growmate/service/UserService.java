package com.growmate.service;

import com.growmate.dto.UpdateUserRequest;
import com.growmate.exception.ResourceNotFoundException;
import com.growmate.model.User;
import com.growmate.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    public User updateUser(Long userId, UpdateUserRequest updateRequest) {
        logger.info("Attempting to update user with ID: {} with data: {}", userId, updateRequest);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId)); // Corrected to
                                                                                                       // throw
                                                                                                       // ResourceNotFoundException

        user.setName(updateRequest.getName());
        user.setImage(updateRequest.getImage());

        logger.info("Starting save operation for user with ID: {}", user.getId());
        try {
            User savedUser = userRepository.save(user);
            logger.info("User with ID: {} saved successfully.", savedUser.getId());
            return savedUser;
        } catch (Exception e) {
            logger.error("Error saving user with ID: {}", user.getId(), e);
            // Re-throw the exception or handle it as appropriate for your application
            throw new RuntimeException("Failed to save user with ID: " + user.getId(), e);
        }
    }
}