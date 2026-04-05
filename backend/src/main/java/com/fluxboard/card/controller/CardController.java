package com.fluxboard.card.controller;

import com.fluxboard.card.dto.request.CardAssignRequest;
import com.fluxboard.card.dto.request.CardCreateRequest;
import com.fluxboard.card.dto.request.CardMoveRequest;
import com.fluxboard.card.dto.request.CardUpdateRequest;
import com.fluxboard.card.dto.response.CardResponse;
import com.fluxboard.card.service.CardService;
import com.fluxboard.common.dto.ApiResponse;
import com.fluxboard.common.util.ResponseFactory;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cards")
public class CardController {

    private final CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CardResponse>> create(@Valid @RequestBody CardCreateRequest request) {
        CardResponse createdCard = cardService.create(request);
        return ResponseFactory.created("Card created successfully", createdCard);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CardResponse>> update(@PathVariable String id,
            @RequestBody CardUpdateRequest request) {
        CardResponse updatedCard = cardService.update(id, request);
        return ResponseFactory.ok("Card updated successfully", updatedCard);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String id) {
        cardService.delete(id);
        return ResponseFactory.ok("Card deleted successfully (Soft Delete)");
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CardResponse>> getById(@PathVariable String id) {
        CardResponse card = cardService.getById(id);
        return ResponseFactory.ok("Card retrieved successfully", card);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CardResponse>>> getPage(Pageable pageable) {
        Page<CardResponse> page = cardService.getPage(pageable);
        return ResponseFactory.paged("Cards retrieved successfully", page);
    }

    @PatchMapping("/{id}/move")
    public ResponseEntity<ApiResponse<CardResponse>> move(@PathVariable String id,
            @RequestBody CardMoveRequest request) {
        CardResponse movedCard = cardService.moveCard(id, request);
        return ResponseFactory.ok("Card moved successfully", movedCard);
    }

    @PostMapping("/{id}/assign")
    public ResponseEntity<ApiResponse<CardResponse>> assignMember(
            @PathVariable String id,
            @Valid @RequestBody CardAssignRequest request) {
        CardResponse assignedCard = cardService.assignMember(id, request);
        return ResponseFactory.ok("Member assigned successfully", assignedCard);
    }
}