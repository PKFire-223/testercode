package com.fluxboard.card.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fluxboard.card.entity.Subtask;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Data
public class CardResponse {
    private String id;
    private String title;
    private String description;
    
    @JsonProperty("board_id")
    private String boardId;
    
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
    
    @JsonProperty("attachments_count")
    private Integer attachmentsCount;
    
    @JsonProperty("comments_count")
    private Integer commentsCount;

    @JsonProperty("order")
    private Double order;
    
    @JsonProperty("created_at")
    private Instant createdAt;
    
    @JsonProperty("updated_at")
    private Instant updatedAt;
    
    @JsonProperty("is_deleted")
    private boolean deleted;
}