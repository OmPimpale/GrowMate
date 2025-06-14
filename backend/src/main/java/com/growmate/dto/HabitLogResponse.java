package com.growmate.dto;

import com.growmate.model.HabitLog;
import lombok.Data;

import java.time.LocalDate;

@Data
public class HabitLogResponse {
    private Long id;
    private Long habitId;
    private LocalDate date;
    private Boolean completed;

    public HabitLogResponse(HabitLog habitLog) {
        this.id = habitLog.getId();
        this.habitId = habitLog.getHabit().getId();
        this.date = habitLog.getDate();
        this.completed = habitLog.getCompleted();
    }
}