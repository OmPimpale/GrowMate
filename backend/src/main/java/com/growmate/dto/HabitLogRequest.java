package com.growmate.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class HabitLogRequest {
    private Long habitId;
    private LocalDate date;
    private Boolean completed;
}