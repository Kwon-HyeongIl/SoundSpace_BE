package com.example.soundspace.api.v1.service;

import com.example.soundspace.api.entity.Tracks;
import com.example.soundspace.api.entity.Users;
import com.example.soundspace.api.security.SecurityUtil;
import com.example.soundspace.api.v1.dto.Response;
import com.example.soundspace.api.v1.dto.request.TrackRequestDto;
import com.example.soundspace.api.v1.dto.response.TrackResponseDto;
import com.example.soundspace.api.v1.repository.BookmarksRepository;
import com.example.soundspace.api.v1.repository.TracksRepository;
import com.example.soundspace.api.v1.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class TracksService {

    private final CustomUserDetailsService customUserDetailsService;
    private final UsersRepository usersRepository;
    private final TracksRepository tracksRepository;
    private final BookmarksRepository bookmarksRepository;
    private final Response response;

    public ResponseEntity<?> getTracksByUserId(String userId) {
        List<Tracks> tracks;

        if (userId.equals("me")) {
            String username = SecurityUtil.getCurrentUsername();
            Users user = (Users) customUserDetailsService.loadUserByUsername(username);

            tracks = user.getTracks();
        } else if (usersRepository.existsById(Long.parseLong(userId))){
            tracks = tracksRepository.findAllByUserId(Long.parseLong(userId));
        } else {
            return response.fail("존재하지 않는 유저입니다.", HttpStatus.NOT_FOUND);
        }

        List<TrackResponseDto.TrackSummary> trackSummaries = getTrackSummaryList(tracks);

        return response.success(trackSummaries, "플레이리스트 조회에 성공했습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> getMyTracksForEditing(String userId) {
        if (!userId.equals("me")) {
            return response.fail("접근 권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        String username = SecurityUtil.getCurrentUsername();
        Users user = (Users) customUserDetailsService.loadUserByUsername(username);

        List<Tracks> tracks = user.getTracks();

        List<TrackResponseDto.TrackSummaryForUpdating> trackSummaries = getTrackSummaryForUpdatingList(tracks);

        return response.success(trackSummaries, "곡 조회에 성공했습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> getTrackInfoByUserIdAndTrackIndex(String userId, Integer trackIndex) {
        Tracks track;
        boolean bookmark;

        if (userId.equals("me")) {
            String username = SecurityUtil.getCurrentUsername();
            Users user = (Users) customUserDetailsService.loadUserByUsername(username);

            track = user.getTracks().get(trackIndex - 1);

            bookmark = bookmarksRepository.existsByMusicIdAndUserId(track.getMusicId(), user.getId());
        } else if (usersRepository.existsById(Long.parseLong(userId))){
            track = tracksRepository.findByUserIdAndTrackIndex(Long.parseLong(userId), trackIndex)
                    .orElseThrow(() -> new RuntimeException("Track not found"));

            try {
                String username = SecurityUtil.getCurrentUsername();
                Users user = (Users) customUserDetailsService.loadUserByUsername(username);

                bookmark = bookmarksRepository.existsByMusicIdAndUserId(track.getMusicId(), user.getId());
            } catch (Exception e) {
                bookmark = false;
            }
        } else {
            return response.fail("존재하지 않는 유저입니다.", HttpStatus.NOT_FOUND);
        }

        TrackResponseDto.TrackInfo trackInfo = TrackResponseDto.TrackInfo.builder()
                .musicId(track.getMusicId())
                .trackTitle(track.getTrackTitle())
                .artistName(track.getArtistName())
                .albumImageUrl(track.getAlbumImageUrl())
                .lyrics(track.getLyrics())
                .isBookmarked(bookmark)
                .build();

        return response.success(trackInfo, "곡 정보 조회에 성공했습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> updateMyTrackInfo(String userId, Integer trackIndex, TrackRequestDto.Update update) {
        if (!userId.equals("me")) {
            return response.fail("접근 권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        String username = SecurityUtil.getCurrentUsername();
        Users user = (Users) customUserDetailsService.loadUserByUsername(username);

        Tracks track = tracksRepository.findByUserIdAndTrackIndex(user.getId(), trackIndex)
                .orElseThrow(() -> new RuntimeException("Track not found"));

        track.setMusicId(update.getMusicId());
        track.setTrackTitle(update.getTrackTitle());
        track.setArtistName(update.getArtistName());
        track.setAlbumImageUrl(update.getAlbumImageUrl());
        track.setLyrics(update.getLyrics());

        tracksRepository.save(track);

        return response.success("곡 업데이트에 성공했습니다.");
    }

    public ResponseEntity<?> clearMyTrackInfo(String userId, Integer trackIndex) {
        if (!userId.equals("me")) {
            return response.fail("접근 권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        String username = SecurityUtil.getCurrentUsername();
        Users user = (Users) customUserDetailsService.loadUserByUsername(username);

        Tracks track = tracksRepository.findByUserIdAndTrackIndex(user.getId(), trackIndex)
                .orElseThrow(() -> new RuntimeException("Track not found"));

        track.setMusicId(null);
        track.setTrackTitle(null);
        track.setArtistName(null);
        track.setAlbumImageUrl(null);
        track.setLyrics(null);

        tracksRepository.save(track);

        return response.success("곡 비우기에 성공했습니다.");
    }

    private static List<TrackResponseDto.TrackSummary> getTrackSummaryList(List<Tracks> tracks) {
        List<TrackResponseDto.TrackSummary> trackSummaries = new ArrayList<>();
        for (Tracks track : tracks) {
            TrackResponseDto.TrackSummary trackSummary = TrackResponseDto.TrackSummary.builder()
                    .trackIndex(track.getTrackIndex())
                    .albumImageUrl(track.getAlbumImageUrl())
                    .build();

            trackSummaries.add(trackSummary);
        }
        return trackSummaries;
    }

    private static List<TrackResponseDto.TrackSummaryForUpdating> getTrackSummaryForUpdatingList(List<Tracks> tracks) {
        List<TrackResponseDto.TrackSummaryForUpdating> trackSummaries = new ArrayList<>();
        for (Tracks track : tracks) {
            TrackResponseDto.TrackSummaryForUpdating trackSummary = TrackResponseDto.TrackSummaryForUpdating.builder()
                    .trackIndex(track.getTrackIndex())
                    .trackTitle(track.getTrackTitle())
                    .artistName(track.getArtistName())
                    .build();

            trackSummaries.add(trackSummary);
        }
        return trackSummaries;
    }
}
