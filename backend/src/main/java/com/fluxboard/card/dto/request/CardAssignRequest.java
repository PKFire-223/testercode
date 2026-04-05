package com.fluxboard.card.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CardAssignRequest {
    @NotBlank(message = "Validation Error: User ID cannot be empty")
    @JsonProperty("user_id")
    private String userId;
}