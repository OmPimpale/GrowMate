package com.growmate.controller;

import com.growmate.dto.UpdateUserRequest;
import com.growmate.dto.UserDto;
import com.growmate.security.UserPrincipal;
import com.growmate.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.HashMap;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Map<String, Object> response = new HashMap<>();
        response.put("id", userPrincipal.getId());
        response.put("name", userPrincipal.getName());
        response.put("email", userPrincipal.getEmail());

        return ResponseEntity.ok(response);
    }

    @PutMapping("/me")
    public ResponseEntity<UserDto> updateCurrentUser(
            Authentication authentication,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) {

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Long userId = userPrincipal.getId();

        UserDto updatedUser = userService.updateUser(userId, name, imageFile);
        return ResponseEntity.ok(updatedUser);
    }
}