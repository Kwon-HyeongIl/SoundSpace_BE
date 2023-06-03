package com.example.soundspace.api.v1.service;

import com.example.soundspace.api.entity.Guestbooks;
import com.example.soundspace.api.entity.Users;
import com.example.soundspace.api.security.SecurityUtil;
import com.example.soundspace.api.v1.dto.Response;
import com.example.soundspace.api.v1.dto.request.GuestbookRequestDto;
import com.example.soundspace.api.v1.dto.response.GuestbookResponseDto;
import com.example.soundspace.api.v1.repository.GuestbooksRepository;
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
public class GuestbooksService {

    private final GuestbooksRepository guestbooksRepository;
    private final UsersRepository usersRepository;
    private final CustomUserDetailsService customUserDetailsService;
    private final Response response;


    public ResponseEntity<?> getAllGuestbooksByUserId(String userId) {
        Long newUserId;

        if (userId.equals("me")) {
            String username = SecurityUtil.getCurrentUsername();
            Users user = (Users) customUserDetailsService.loadUserByUsername(username);

            newUserId = user.getId();
        } else if (!usersRepository.existsById(Long.parseLong(userId))){
            return response.fail("존재하지 않는 유저입니다.", HttpStatus.NOT_FOUND);
        } else {
            newUserId = Long.parseLong(userId);
        }

        List<Guestbooks> guestbooks = guestbooksRepository.findAllByTargetUserId(newUserId);
        if (guestbooks.isEmpty()) {
            return response.success("아직 작성된 방명록이 없습니다.");
        } else {
            List<GuestbookResponseDto.GuestbookInfo> guestbookInfos = new ArrayList<>();
            for (Guestbooks guestbook : guestbooks) {
                GuestbookResponseDto.GuestbookInfo guestbookInfo = GuestbookResponseDto.GuestbookInfo.builder()
                        .writerName(guestbook.getWriter().getUsername())
                        .content(guestbook.getContent())
                        .build();

                guestbookInfos.add(guestbookInfo);
            }

            return response.success(guestbookInfos, "방명록 목록 조회에 성공했습니다.",  HttpStatus.OK);
        }
    }
    public ResponseEntity<?> writeGuestbook(String userId, GuestbookRequestDto.WriteGuestbook writeGuestbook) {
        String username = SecurityUtil.getCurrentUsername();
        Users writer = (Users) customUserDetailsService.loadUserByUsername(username);

        Long targetUserId;
        if (userId.equals("me")) {
            targetUserId = writer.getId();
        } else {
            targetUserId = Long.parseLong(userId);
        }

        Users targetUser = usersRepository.findById(targetUserId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Guestbooks guestbook = Guestbooks.builder()
                .writer(writer)
                .targetUser(targetUser)
                .content(writeGuestbook.getContent())
                .build();

        guestbooksRepository.save(guestbook);

        return response.success("방명록 작성에 성공했습니다.");
    }

    public ResponseEntity<?> deleteGuestbookById(String userId, Long guestbookId) {
        String username = SecurityUtil.getCurrentUsername();
        Users currentUser = (Users) customUserDetailsService.loadUserByUsername(username);

        Long targetUserId;
        if (userId.equals("me")) {
            targetUserId = currentUser.getId();
        } else {
            targetUserId = Long.parseLong(userId);
        }

        Users targetUser = usersRepository.findById(targetUserId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Guestbooks guestbook = guestbooksRepository.findById(guestbookId)
                .orElseThrow(() -> new RuntimeException("guestbook not found"));

        if (!guestbook.getTargetUser().equals(targetUser)) {
            return response.fail("잘못된 접근입니다.", HttpStatus.FORBIDDEN);
        }

        if (!currentUser.equals(guestbook.getWriter())) {
            return response.fail("방명록 삭제 권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        guestbooksRepository.delete(guestbook);

        return response.success("방명록 삭제에 성공했습니다.");
    }
}

