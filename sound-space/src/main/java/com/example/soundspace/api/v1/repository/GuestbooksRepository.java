package com.example.soundspace.api.v1.repository;

import com.example.soundspace.api.entity.Guestbooks;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GuestbooksRepository extends JpaRepository<Guestbooks, Long> {
    List<Guestbooks> findAllByTargetUserId(Long targetUserId);
}
