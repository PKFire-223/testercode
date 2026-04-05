package com.fluxboard.card.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CardMoveRequest {
    @JsonProperty("new_column_id")
    private String newColumnId;

    @JsonProperty("new_order")
    private Double newOrder;
}