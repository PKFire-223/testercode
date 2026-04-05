package com.fluxboard.card.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fluxboard.card.entity.Subtask;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class CardUpdateRequest {
    private String title;
    
    private String description;
    
    @JsonProperty("list_id")
    private String listId;
    
    @JsonProperty("assignee_id")
    private String assigneeId;
    
    private String priority;
    
    @JsonProperty("start_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate startDate;
    
    @JsonProperty("due_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dueDate;
    
    @JsonProperty("estimated_days")
    private Integer estimatedDays;
    
    @JsonProperty("story_points")
    private Integer storyPoints;
    
    @JsonProperty("ai_suggested_points")
    private Integer aiSuggestedPoints;
    
    @JsonProperty("ai_estimation_reason")
    private String aiEstimationReason;
    
    private List<String> tags;
    private List<Subtask> subtasks;
}