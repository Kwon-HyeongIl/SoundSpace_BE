package com.example.soundspace.api.v1.service;

import com.example.soundspace.api.entity.Bookmarks;
import com.example.soundspace.api.entity.Users;
import com.example.soundspace.api.security.SecurityUtil;
import com.example.soundspace.api.v1.dto.Response;
import com.example.soundspace.api.v1.dto.request.BookmarkRequestDto;
import com.example.soundspace.api.v1.dto.response.BookmarkResponseDto;
import com.example.soundspace.api.v1.repository.BookmarksRepository;
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
public class BookmarksService {

    private final CustomUserDetailsService customUserDetailsService;
    private final BookmarksRepository bookmarksRepository;
    private final Response response;

    public ResponseEntity<?> getAllMyBookmarks() {
        String username = SecurityUtil.getCurrentUsername();
        Users user = (Users) customUserDetailsService.loadUserByUsername(username);

        List<Bookmarks> bookmarks = bookmarksRepository.findAllByUserId(user.getId());
        if (bookmarks.isEmpty()) {
            return response.success("아직 북마크한 곡이 없습니다.");
        }
        else {
            List<BookmarkResponseDto.BookmarkInfo> bookmarkInfos = new ArrayList<>();
            for (Bookmarks bookmark : bookmarks) {
                BookmarkResponseDto.BookmarkInfo bookmarkInfo = BookmarkResponseDto.BookmarkInfo.builder()
                        .musicId(bookmark.getMusicId())
                        .trackTitle(bookmark.getTrackTitle())
                        .artistName(bookmark.getArtistName())
                        .build();

                bookmarkInfos.add(bookmarkInfo);
            }
            return response.success(bookmarkInfos, "북마크 목록 조회에 성공했습니다.", HttpStatus.OK);
        }
    }

    public ResponseEntity<?> toggleBookmarkAtMusic(Long musicId, BookmarkRequestDto.toggleBookmarkAtMusic bookmarkInfo) {
        String username = SecurityUtil.getCurrentUsername();
        Users user = (Users) customUserDetailsService.loadUserByUsername(username);
        Long userId = user.getId();

        Optional<Bookmarks> optionalBookmark = bookmarksRepository.findByMusicIdAndUserId(musicId, userId);
        if (optionalBookmark.isPresent()) {
            bookmarksRepository.deleteById(optionalBookmark.get().getId());

            return response.success("북마크 해제에 성공했습니다.");
        } else {
            Bookmarks bookmarks = Bookmarks.builder()
                    .musicId(musicId)
                    .trackTitle(bookmarkInfo.getTrackTitle())
                    .artistName(bookmarkInfo.getArtistName())
                    .user(user)
                    .build();

            bookmarksRepository.save(bookmarks);

            return response.success("북마크 생성에 성공했습니다.");
        }
    }
}
