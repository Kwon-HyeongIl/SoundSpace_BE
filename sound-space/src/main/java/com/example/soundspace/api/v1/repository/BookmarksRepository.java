package com.example.soundspace.api.v1.repository;

import com.example.soundspace.api.entity.Bookmarks;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Book;
import java.util.List;
import java.util.Optional;

public interface BookmarksRepository extends JpaRepository<Bookmarks, Long> {
    Optional<Bookmarks> findByMusicIdAndUserId(Long musicId, Long userId);
    List<Bookmarks> findAllByUserId(Long userId);
    boolean existsByMusicIdAndUserId(Long musicId, Long userId);
}
