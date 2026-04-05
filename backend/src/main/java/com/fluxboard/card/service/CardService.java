package com.fluxboard.card.service;

import com.fluxboard.card.dto.request.CardAssignRequest;
import com.fluxboard.card.dto.request.CardCreateRequest;
import com.fluxboard.card.dto.request.CardMoveRequest;
import com.fluxboard.card.dto.request.CardUpdateRequest;
import com.fluxboard.card.dto.response.CardResponse;
import com.fluxboard.card.entity.Card;
import com.fluxboard.card.repository.CardRepository;
import com.fluxboard.common.service.CrudService;
import com.fluxboard.user.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CardService implements CrudService<CardResponse, String, CardCreateRequest, CardUpdateRequest> {

    private final CardRepository cardRepository;
    private final UserRepository userRepository;

    public CardService(CardRepository cardRepository, UserRepository userRepository) {
        this.cardRepository = cardRepository;
        this.userRepository = userRepository;
    }

    @Override
    public CardResponse create(CardCreateRequest request) {
        Card card = new Card();
        card.setTitle(request.getTitle());
        card.setDescription(request.getDescription());
        card.setBoardId(request.getBoardId());
        card.setListId(request.getListId());
        card.setAssigneeId(request.getAssigneeId());
        card.setPriority(request.getPriority());
        card.setStartDate(request.getStartDate());
        card.setDueDate(request.getDueDate());
        card.setEstimatedDays(request.getEstimatedDays());
        card.setStoryPoints(request.getStoryPoints());
        card.setAiSuggestedPoints(request.getAiSuggestedPoints());
        card.setAiEstimationReason(request.getAiEstimationReason());
        card.setTags(request.getTags());
        card.setSubtasks(request.getSubtasks());
        card.setOrder(request.getOrder() != null ? request.getOrder() : 0.0);

        Card savedCard = cardRepository.save(card);
        return mapToResponse(savedCard);
    }

    @Override
    public CardResponse getById(String id) {
        Card card = cardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Card not found"));
        return mapToResponse(card);
    }

    @Override
    public Page<CardResponse> getPage(Pageable pageable) {
        return cardRepository.findAll(pageable).map(this::mapToResponse);
    }

    @Override
    public CardResponse update(String id, CardUpdateRequest request) {
        Card card = cardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Card not found"));

        if (request.getTitle() != null && !request.getTitle().trim().isEmpty()) {
            card.setTitle(request.getTitle());
        } else if (request.getTitle() != null && request.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Validation Error: Title cannot be empty");
        }

        if (request.getDescription() != null)
            card.setDescription(request.getDescription());
        if (request.getListId() != null)
            card.setListId(request.getListId());
        if (request.getAssigneeId() != null)
            card.setAssigneeId(request.getAssigneeId());
        if (request.getPriority() != null)
            card.setPriority(request.getPriority());
        if (request.getStartDate() != null)
            card.setStartDate(request.getStartDate());
        if (request.getDueDate() != null)
            card.setDueDate(request.getDueDate());
        if (request.getEstimatedDays() != null)
            card.setEstimatedDays(request.getEstimatedDays());
        if (request.getStoryPoints() != null)
            card.setStoryPoints(request.getStoryPoints());
        if (request.getAiSuggestedPoints() != null)
            card.setAiSuggestedPoints(request.getAiSuggestedPoints());
        if (request.getAiEstimationReason() != null)
            card.setAiEstimationReason(request.getAiEstimationReason());
        if (request.getTags() != null)
            card.setTags(request.getTags());
        if (request.getSubtasks() != null)
            card.setSubtasks(request.getSubtasks());

        Card updatedCard = cardRepository.save(card);
        return mapToResponse(updatedCard);
    }

    @Override
    public void delete(String id) {
        Card card = cardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Card not found"));

        card.markDeleted();
        cardRepository.save(card);
    }

    public CardResponse moveCard(String id, CardMoveRequest request) {
        Card card = cardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Card not found"));

        if (request.getNewColumnId() != null && !request.getNewColumnId().trim().isEmpty()) {
            card.setListId(request.getNewColumnId());
        }

        if (request.getNewOrder() != null) {
            card.setOrder(request.getNewOrder());
        }

        Card movedCard = cardRepository.save(card);
        return mapToResponse(movedCard);
    }

    public CardResponse assignMember(String id, CardAssignRequest request) {
        Card card = cardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Card not found"));

        if (!userRepository.existsById(request.getUserId())) {
            throw new IllegalArgumentException("User Not Found");
        }

        card.setAssigneeId(request.getUserId());
        Card updatedCard = cardRepository.save(card);

        return mapToResponse(updatedCard);
    }

    private CardResponse mapToResponse(Card card) {
        CardResponse response = new CardResponse();
        response.setId(card.getId());
        response.setTitle(card.getTitle());
        response.setDescription(card.getDescription());
        response.setBoardId(card.getBoardId());
        response.setListId(card.getListId());
        response.setAssigneeId(card.getAssigneeId());
        response.setPriority(card.getPriority());
        response.setStartDate(card.getStartDate());
        response.setDueDate(card.getDueDate());
        response.setEstimatedDays(card.getEstimatedDays());
        response.setStoryPoints(card.getStoryPoints());
        response.setAiSuggestedPoints(card.getAiSuggestedPoints());
        response.setAiEstimationReason(card.getAiEstimationReason());
        response.setTags(card.getTags());
        response.setSubtasks(card.getSubtasks());
        response.setAttachmentsCount(card.getAttachmentsCount());
        response.setCommentsCount(card.getCommentsCount());
        response.setOrder(card.getOrder());
        response.setCreatedAt(card.getCreatedAt());
        response.setUpdatedAt(card.getUpdatedAt());
        response.setDeleted(card.isDeleted());
        return response;
    }
}