package com.example.soundspace.api.v1.service;

import com.example.soundspace.api.entity.Playlists;
import com.example.soundspace.api.entity.Tracks;
import com.example.soundspace.api.entity.Users;
import com.example.soundspace.api.security.SecurityUtil;
import com.example.soundspace.api.v1.dto.Response;
import com.example.soundspace.api.v1.dto.request.PlaylistRequestDto;
import com.example.soundspace.api.v1.dto.response.PlaylistResponseDto;
import com.example.soundspace.api.v1.repository.BookmarksRepository;
import com.example.soundspace.api.v1.repository.PlaylistsRepository;
import com.example.soundspace.api.v1.repository.TracksRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class PlaylistsService {

    private final CustomUserDetailsService customUserDetailsService;
    private final PlaylistsRepository playlistsRepository;
    private final TracksRepository tracksRepository;
    private final BookmarksRepository bookmarksRepository;
    private final Response response;

    public ResponseEntity<?> getMyPlaylist() {
        String username = SecurityUtil.getCurrentUsername();
        Users user = (Users) customUserDetailsService.loadUserByUsername(username);

        List<Tracks> tracks = user.getPlaylist().getTracks();

        List<PlaylistResponseDto.TrackSummary> trackSummaries = getTrackSummaryList(tracks);

        return response.success(trackSummaries, "내 플레이리스트 조회에 성공했습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> getMyPlaylistForUpdating() {

        String username = SecurityUtil.getCurrentUsername();
        Users user = (Users) customUserDetailsService.loadUserByUsername(username);

        List<Tracks> tracks = user.getPlaylist().getTracks();

        List<PlaylistResponseDto.TrackSummaryForUpdating> trackSummaries = getTrackSummaryForUpdatingList(tracks);

        return response.success(trackSummaries, "플레이리스트 조회에 성공했습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> getMyTrackInfo(Integer trackIndex) {

        String username = SecurityUtil.getCurrentUsername();
        Users user = (Users) customUserDetailsService.loadUserByUsername(username);
        Long userId = user.getId();
        Long playlistId = user.getPlaylist().getId();

        return getResponseEntity(trackIndex, userId, playlistId);
    }

    private ResponseEntity<?> getResponseEntity(Integer trackIndex, Long userId, Long playlistId) {
        Tracks track = tracksRepository.findByPlaylistIdAndTrackIndex(playlistId, trackIndex)
                .orElseThrow(() -> new RuntimeException("Track not found"));

        PlaylistResponseDto.TrackInfo trackInfo = PlaylistResponseDto.TrackInfo.builder()
                .musicId(track.getMusicId())
                .trackTitle(track.getTrackTitle())
                .artistName(track.getArtistName())
                .albumImageUrl(track.getAlbumImageUrl())
                .lyrics(track.getLyrics())
                .isBookmarked(bookmarksRepository.existsByMusicIdAndUserId(track.getMusicId(), userId))
                .build();

        return response.success(trackInfo, "곡 정보 조회에 성공했습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> update(Integer trackIndex, PlaylistRequestDto.Update update) {

        String username = SecurityUtil.getCurrentUsername();
        Users user = (Users) customUserDetailsService.loadUserByUsername(username);

        Long playlistId = user.getPlaylist().getId();

        Tracks track = tracksRepository.findByPlaylistIdAndTrackIndex(playlistId, trackIndex)
                .orElseThrow(() -> new RuntimeException("Track not found"));

        track.setMusicId(update.getMusicId());
        track.setTrackTitle(update.getTrackTitle());
        track.setArtistName(update.getArtistName());
        track.setAlbumImageUrl(update.getAlbumImageUrl());
        track.setLyrics(update.getLyrics());

        tracksRepository.save(track);

        return response.success("곡 업데이트에 성공했습니다.");
    }

    public ResponseEntity<?> clear(Integer trackIndex) {

        String username = SecurityUtil.getCurrentUsername();
        Users user = (Users) customUserDetailsService.loadUserByUsername(username);

        Long playlistId = user.getPlaylist().getId();

        Tracks track = tracksRepository.findByPlaylistIdAndTrackIndex(playlistId, trackIndex)
                .orElseThrow(() -> new RuntimeException("Track not found"));

        track.setMusicId(null);
        track.setTrackTitle(null);
        track.setArtistName(null);
        track.setAlbumImageUrl(null);
        track.setLyrics(null);

        tracksRepository.save(track);

        return response.success("곡 비우기에 성공했습니다.");
    }

    public ResponseEntity<?> getPlaylistById(Long playlistId) {

        Optional<Playlists> optionalPlaylist = playlistsRepository.findById(playlistId);
        if (optionalPlaylist.isEmpty()) {
            throw new RuntimeException("Playlist not found with ID: " + playlistId);
        }

        List<Tracks> tracks = optionalPlaylist.get().getTracks();

        List<PlaylistResponseDto.TrackSummary> trackSummaries = getTrackSummaryList(tracks);

        return response.success(trackSummaries, "플레이리스트 조회에 성공했습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> getTrackInfo(Long playlistId, Integer trackIndex) {

        String username = SecurityUtil.getCurrentUsername();
        Users user = (Users) customUserDetailsService.loadUserByUsername(username);

        return getResponseEntity(trackIndex, user.getId(), playlistId);
    }

    private static List<PlaylistResponseDto.TrackSummary> getTrackSummaryList(List<Tracks> tracks) {
        List<PlaylistResponseDto.TrackSummary> trackSummaries = new ArrayList<>();
        for (Tracks track : tracks) {
            PlaylistResponseDto.TrackSummary trackSummary = PlaylistResponseDto.TrackSummary.builder()
                    .trackIndex(track.getTrackIndex())
                    .albumImageUrl(track.getAlbumImageUrl())
                    .build();

            trackSummaries.add(trackSummary);
        }
        return trackSummaries;
    }

    private static List<PlaylistResponseDto.TrackSummaryForUpdating> getTrackSummaryForUpdatingList(List<Tracks> tracks) {
        List<PlaylistResponseDto.TrackSummaryForUpdating> trackSummaries = new ArrayList<>();
        for (Tracks track : tracks) {
            PlaylistResponseDto.TrackSummaryForUpdating trackSummary = PlaylistResponseDto.TrackSummaryForUpdating.builder()
                    .trackIndex(track.getTrackIndex())
                    .trackTitle(track.getTrackTitle())
                    .artistName(track.getArtistName())
                    .build();

            trackSummaries.add(trackSummary);
        }
        return trackSummaries;
    }
}
