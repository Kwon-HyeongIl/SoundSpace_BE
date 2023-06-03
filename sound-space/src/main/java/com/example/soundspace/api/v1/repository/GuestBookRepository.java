package com.example.soundspace.api.v1.repository;

import com.example.soundspace.api.entity.GuestBook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestBookRepository extends JpaRepository<GuestBook, Long> {
}
