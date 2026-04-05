package com.fluxboard.card.repository;

import com.fluxboard.card.entity.Card;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends MongoRepository<Card, String> {
}