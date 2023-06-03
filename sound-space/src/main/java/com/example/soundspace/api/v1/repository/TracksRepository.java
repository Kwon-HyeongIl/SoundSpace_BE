package com.example.soundspace.api.v1.repository;

import com.example.soundspace.api.entity.Tracks;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TracksRepository extends JpaRepository<Tracks, Long> {
    Optional<Tracks> findByPlaylistIdAndTrackIndex(Long playlistId, Integer trackIndex);
}