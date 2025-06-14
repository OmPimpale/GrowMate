package com.growmate.dto;

import com.growmate.model.Habit;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class HabitResponse {
    private Long id;
    private String title;
    private String description;
    private Habit.Frequency frequency;
    private String color;
    private LocalDateTime createdAt;

    public HabitResponse(Habit habit) {
        this.id = habit.getId();
        this.title = habit.getTitle();
        this.description = habit.getDescription();
        this.frequency = habit.getFrequency();
        this.color = habit.getColor();
        this.createdAt = habit.getCreatedAt();
    }
}