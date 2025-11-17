package com.growmate.controller;

import com.growmate.dto.HabitRequest;
import com.growmate.dto.HabitResponse;
import com.growmate.model.Habit;
import com.growmate.model.User;
import com.growmate.repository.HabitRepository;
import com.growmate.repository.UserRepository;
import com.growmate.security.UserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/habits")
@RequiredArgsConstructor
public class HabitController {
    private final HabitRepository habitRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<HabitResponse>> getAllHabits(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        List<Habit> habits = habitRepository.findByUserIdOrderByCreatedAtDesc(userPrincipal.getId());

        List<HabitResponse> habitResponses = habits.stream()
                .map(HabitResponse::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(habitResponses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getHabitById(@PathVariable Long id, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        return habitRepository.findByIdAndUserId(id, userPrincipal.getId())
                .map(habit -> ResponseEntity.ok(new HabitResponse(habit)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createHabit(@Valid @RequestBody HabitRequest habitRequest, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Habit habit = new Habit();
        habit.setUser(user);
        habit.setTitle(habitRequest.getTitle());
        habit.setDescription(habitRequest.getDescription());
        habit.setFrequency(habitRequest.getFrequency());
        habit.setColor(habitRequest.getColor());

        Habit savedHabit = habitRepository.save(habit);
        return ResponseEntity.ok(new HabitResponse(savedHabit));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateHabit(@PathVariable Long id, @Valid @RequestBody HabitRequest habitRequest,
            Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        return habitRepository.findByIdAndUserId(id, userPrincipal.getId())
                .map(habit -> {
                    habit.setTitle(habitRequest.getTitle());
                    habit.setDescription(habitRequest.getDescription());
                    habit.setFrequency(habitRequest.getFrequency());
                    habit.setColor(habitRequest.getColor());

                    Habit updatedHabit = habitRepository.save(habit);
                    return ResponseEntity.ok(new HabitResponse(updatedHabit));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHabit(@PathVariable Long id, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        return habitRepository.findByIdAndUserId(id, userPrincipal.getId())
                .map(habit -> {
                    habitRepository.delete(habit);
                    Map<String, String> response = new HashMap<>();
                    response.put("message", "Habit deleted successfully");
                    return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}