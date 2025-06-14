package com.growmate.repository;

import com.growmate.model.HabitLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface HabitLogRepository extends JpaRepository<HabitLog, Long> {
    Optional<HabitLog> findByHabitIdAndDate(Long habitId, LocalDate date);
    
    List<HabitLog> findByHabitIdAndDateBetweenOrderByDateDesc(Long habitId, LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT hl FROM HabitLog hl WHERE hl.habit.user.id = :userId AND hl.date BETWEEN :startDate AND :endDate ORDER BY hl.date DESC")
    List<HabitLog> findByUserIdAndDateBetween(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT hl FROM HabitLog hl WHERE hl.habit.user.id = :userId ORDER BY hl.date DESC")
    List<HabitLog> findByUserId(@Param("userId") Long userId);
}