package com.example.soundspace.api.v1.repository;

import com.example.soundspace.api.entity.GuestBook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestBookRepository extends JpaRepository<GuestBook, Long> {
    // 여기에 필요한 쿼리 메서드를 추가할 수 있습니다.
}
