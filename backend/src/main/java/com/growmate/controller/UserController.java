// package com.growmate.controller;

// import com.growmate.dto.UpdateUserRequest;
// import com.growmate.model.User;
// import com.growmate.service.UserService;
// import lombok.RequiredArgsConstructor;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.annotation.AuthenticationPrincipal;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/user")
// @RequiredArgsConstructor
// public class UserController {

//     private final UserService userService;

//     @GetMapping("/me")
//     public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal User userPrincipal) {
//         // ... existing code ...
//         return ResponseEntity.ok(userPrincipal); // Assuming userPrincipal is your User entity
//     }

//     // Modified endpoint to accept JSON with name and update user
//     @PutMapping("/me")
//     public ResponseEntity<User> updateCurrentUser(
//             @AuthenticationPrincipal User userPrincipal,
//             @RequestBody UpdateUserRequest updateRequest) { // Expecting JSON request body
//         User updatedUser = userService.updateUser(userPrincipal.getId(), updateRequest);
//         return ResponseEntity.ok(updatedUser);
//     }
// }

package com.growmate.controller;

import com.growmate.dto.UpdateUserRequest;
import com.growmate.model.User;
import com.growmate.security.UserPrincipal;
import com.growmate.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user") // your context path /api makes full URL /api/user/...
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        // Fetch the full user from DB using principal id
        User user = userService.findById(userPrincipal.getId());
        return ResponseEntity.ok(user);
    }

    @PutMapping("/me")
    public ResponseEntity<User> updateCurrentUser(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody UpdateUserRequest updateRequest) {

        User updatedUser = userService.updateUser(userPrincipal.getId(), updateRequest);
        return ResponseEntity.ok(updatedUser);
    }
}
