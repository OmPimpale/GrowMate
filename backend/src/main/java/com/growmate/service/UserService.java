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

    // Modified updateUser to only handle name
    public User updateUser(Long userId, UpdateUserRequest updateRequest) {
        logger.info("Attempting to update user with ID: {} with data: {}", userId, updateRequest);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));

        user.setName(updateRequest.getName());
        // Removed image update logic

        logger.info("Saving updated user with ID: {}", user.getId());
        User savedUser = userRepository.save(user);
        logger.info("User with ID: {} saved successfully.", savedUser.getId());
        return savedUser;
    }
}