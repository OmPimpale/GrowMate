package com.growmate.dto;

import com.growmate.model.Habit;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class HabitRequest {
    @NotBlank(message = "Title is required")
    @Size(max = 255)
    private String title;

    @Size(max = 1000)
    private String description;

    private Habit.Frequency frequency = Habit.Frequency.DAILY;

    @Size(max = 7)
    private String color = "#4C1D95";
}