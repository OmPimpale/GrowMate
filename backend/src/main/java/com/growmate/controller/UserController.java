package com.growmate.controller;

import com.growmate.dto.UpdateUserRequest;
import com.growmate.model.User;
import com.growmate.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal User userPrincipal) {
        // ... existing code ...
        return ResponseEntity.ok(userPrincipal); // Assuming userPrincipal is your User entity
    }

    // Modified endpoint to accept JSON with name and update user
    @PutMapping("/me")
    public ResponseEntity<User> updateCurrentUser(
            @AuthenticationPrincipal User userPrincipal,
            @RequestBody UpdateUserRequest updateRequest) { // Expecting JSON request body
        User updatedUser = userService.updateUser(userPrincipal.getId(), updateRequest);
        return ResponseEntity.ok(updatedUser);
    }
}