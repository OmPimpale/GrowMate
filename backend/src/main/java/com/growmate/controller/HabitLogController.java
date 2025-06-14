package com.growmate.controller;

import com.growmate.dto.HabitLogRequest;
import com.growmate.dto.HabitLogResponse;
import com.growmate.model.Habit;
import com.growmate.model.HabitLog;
import com.growmate.repository.HabitLogRepository;
import com.growmate.repository.HabitRepository;
import com.growmate.security.UserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/habit-logs")
@RequiredArgsConstructor
public class HabitLogController {
    private final HabitLogRepository habitLogRepository;
    private final HabitRepository habitRepository;

    @GetMapping
    public ResponseEntity<List<HabitLogResponse>> getAllHabitLogs(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        List<HabitLog> habitLogs = habitLogRepository.findByUserId(userPrincipal.getId());
        
        List<HabitLogResponse> habitLogResponses = habitLogs.stream()
                .map(HabitLogResponse::new)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(habitLogResponses);
    }

    @GetMapping("/habit/{habitId}")
    public ResponseEntity<List<HabitLogResponse>> getHabitLogs(@PathVariable Long habitId, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
        // Verify habit belongs to user
        Optional<Habit> habit = habitRepository.findByIdAndUserId(habitId, userPrincipal.getId());
        if (habit.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(365); // Last year
        
        List<HabitLog> habitLogs = habitLogRepository.findByHabitIdAndDateBetweenOrderByDateDesc(habitId, startDate, endDate);
        
        List<HabitLogResponse> habitLogResponses = habitLogs.stream()
                .map(HabitLogResponse::new)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(habitLogResponses);
    }

    @PostMapping("/toggle")
    public ResponseEntity<?> toggleHabitLog(@Valid @RequestBody HabitLogRequest habitLogRequest, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
        // Verify habit belongs to user
        Optional<Habit> habitOpt = habitRepository.findByIdAndUserId(habitLogRequest.getHabitId(), userPrincipal.getId());
        if (habitOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Habit habit = habitOpt.get();
        LocalDate date = habitLogRequest.getDate() != null ? habitLogRequest.getDate() : LocalDate.now();

        // Find existing log or create new one
        Optional<HabitLog> existingLog = habitLogRepository.findByHabitIdAndDate(habit.getId(), date);
        
        HabitLog habitLog;
        if (existingLog.isPresent()) {
            habitLog = existingLog.get();
            habitLog.setCompleted(!habitLog.getCompleted()); // Toggle completion
        } else {
            habitLog = new HabitLog();
            habitLog.setHabit(habit);
            habitLog.setDate(date);
            habitLog.setCompleted(true); // First time marking as complete
        }

        HabitLog savedLog = habitLogRepository.save(habitLog);
        return ResponseEntity.ok(new HabitLogResponse(savedLog));
    }

    @GetMapping("/check")
    public ResponseEntity<?> checkHabitCompletion(@RequestParam Long habitId, @RequestParam String date, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
        // Verify habit belongs to user
        Optional<Habit> habit = habitRepository.findByIdAndUserId(habitId, userPrincipal.getId());
        if (habit.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        LocalDate logDate = LocalDate.parse(date);
        Optional<HabitLog> habitLog = habitLogRepository.findByHabitIdAndDate(habitId, logDate);
        
        Map<String, Boolean> response = new HashMap<>();
        response.put("completed", habitLog.map(HabitLog::getCompleted).orElse(false));
        
        return ResponseEntity.ok(response);
    }
}