package com.example.soundspace.api.v1.repository;

import com.example.soundspace.api.entity.Playlists;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaylistsRepository extends JpaRepository<Playlists, Long> {
}
