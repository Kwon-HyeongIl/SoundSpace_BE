//package com.example.soundspace.api.v1.service;
//
//import com.example.soundspace.api.entity.GuestBook;
//import com.example.soundspace.api.entity.Users;
//import com.example.soundspace.api.security.SecurityUtil;
//import com.example.soundspace.api.v1.dto.Response;
//import com.example.soundspace.api.v1.dto.request.GuestBookRequestDto;
//import com.example.soundspace.api.v1.repository.GuestBookRepository;
//import com.example.soundspace.api.v1.repository.UsersRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.NoSuchElementException;
//
//
//@Slf4j
//@RequiredArgsConstructor
//@Service
//@Transactional
//public class GuestBookService {
//
//    private final GuestBookRepository guestBookRepository;
//    private final UsersRepository usersRepository;
//    private final CustomUserDetailsService customUserDetailsService;
//    private final Response response;
//
//
////    public ResponseEntity<?> getAllGuestBooksById(Long guestBookId) {
////
////    }
//    public ResponseEntity<?> writeGuestBook(Long targetUserId, GuestBookRequestDto guestBookRequestDto) {
//        String username = SecurityUtil.getCurrentUsername();
//        Users writer = (Users) customUserDetailsService.loadUserByUsername(username);
//
//        Users targetUser = usersRepository.findById(targetUserId)
//                .orElseThrow(() -> new UsernameNotFoundException("User not found with id : " + targetUserId));
//
//        GuestBook guestBook = GuestBook.builder()
//                .writer(writer)
//                .targetUser(targetUser)
//                .content(guestBookRequestDto.getContent())
//                .build();
//
//        guestBookRepository.save(guestBook);
//
//        return response.success("방명록 작성에 성공했습니다.");
//    }
//
//    public ResponseEntity<?> deleteGuestBook(Long guestBookId) {
//        String username = SecurityUtil.getCurrentUsername();
//        Users writer = (Users) customUserDetailsService.loadUserByUsername(username);
//
//        GuestBook guestBook = guestBookRepository.findById(guestBookId)
//                .orElseThrow(() -> new NoSuchElementException("id로 방명록을 찾을 수 없습니다. : " + guestBookId));
//
//        if (!writer.getId().equals(guestBook.getWriter().getId())) {
//            throw new IllegalArgumentException("요청자는 방명록의 작성자가 아닙니다.");
//        }
//
//        guestBookRepository.delete(guestBook);
//
//        return response.success("방명록 삭제에 성공했습니다.");
//    }
//}
//
