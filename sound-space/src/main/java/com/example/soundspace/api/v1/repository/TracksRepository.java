package com.example.soundspace.api.v1.repository;

import com.example.soundspace.api.entity.Tracks;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TracksRepository extends JpaRepository<Tracks, Long> {
    List<Tracks> findAllByUserId(Long userId);
    Optional<Tracks> findByUserIdAndTrackIndex(Long userId, Integer trackIndex);
}