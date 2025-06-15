package com.growmate.controller;

import com.growmate.dto.UpdateUserRequest;
import com.growmate.security.UserPrincipal;
import com.growmate.service.UserService; // Assuming you have a UserService
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/me")

    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Map<String, Object> response = new java.util.HashMap<>();
        response.put("id", userPrincipal.getId());
        response.put("name", userPrincipal.getName());
        response.put("email", userPrincipal.getEmail());

        return ResponseEntity.ok(response);
    }

    private final UserService userService;

    @PutMapping("/me")
    public ResponseEntity<?> updateCurrentUser(Authentication authentication,
            @RequestBody UpdateUserRequest updateUserRequest) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Long userId = userPrincipal.getId();
        logger.info("Updating user with ID: {} and data: {}", userId, updateUserRequest);

        userService.updateUser(userId, updateUserRequest);

        return ResponseEntity.ok().build();
    }
}