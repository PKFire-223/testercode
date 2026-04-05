package com.fluxboard.card.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fluxboard.common.entity.BaseDocument;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "cards")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Card extends BaseDocument {

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
    private Integer attachmentsCount = 0;

    @JsonProperty("comments_count")
    private Integer commentsCount = 0;

    @JsonProperty("order")
    private Double order;
}