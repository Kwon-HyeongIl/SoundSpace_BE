package com.example.soundspace.api.v1.service;

import com.example.soundspace.api.entity.GuestBook;
import com.example.soundspace.api.entity.Users;
import com.example.soundspace.api.jwt.JwtTokenProvider;
import com.example.soundspace.api.v1.dto.request.GuestBookRequestDto;
import com.example.soundspace.api.v1.dto.response.GuestBookResponseDto;
import com.example.soundspace.api.v1.repository.GuestBookRepository;
import com.example.soundspace.api.v1.repository.UsersRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.persistence.EntityNotFoundException;
import java.util.NoSuchElementException;


@Service
@Transactional
public class GuestBookService {

    private final GuestBookRepository guestBookRepository;
    private final UsersRepository usersRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public GuestBookService(GuestBookRepository guestBookRepository,
                            UsersRepository usersRepository,
                            JwtTokenProvider jwtTokenProvider) {
        this.guestBookRepository = guestBookRepository;
        this.usersRepository = usersRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    private String removeBearerFromToken(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            return token.substring("Bearer ".length());
        }
        return token;
    }

    public String getAuthenticatedUsername(String token) {
        token = removeBearerFromToken(token);
        if (!jwtTokenProvider.validateToken(token)) {
            throw new IllegalArgumentException("Invalid token");
        }

        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        if(authentication == null) {
            throw new IllegalArgumentException("Authentication failed. User is not authenticated.");
        }
        return authentication.getName();
    }

    public GuestBookResponseDto writeGuestBook(String writerUsername, Long targetUserId, GuestBookRequestDto guestBookRequestDto) {
        if(writerUsername == null) {
            throw new IllegalArgumentException("Authentication failed. User is not authenticated.");
        }
        Users writer = usersRepository.findByUsername(writerUsername)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username : " + writerUsername));
        Users targetUser = usersRepository.findById(targetUserId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id : " + targetUserId));

        GuestBook guestBook = new GuestBook();
        guestBook.setWriter(writer);
        guestBook.setTargetUser(targetUser);
        guestBook.setContent(guestBookRequestDto.getContent());

        guestBookRepository.save(guestBook);

        GuestBookResponseDto responseDto = new GuestBookResponseDto();
        responseDto.setContent(guestBook.getContent());
        responseDto.setWriterUsername(writer.getUsername());

        return responseDto;
    }

    public void deleteGuestBook(String requesterUsername, Long guestBookId) {
        Users requester = usersRepository.findByUsername(requesterUsername)
                .orElseThrow(() -> new UsernameNotFoundException("username으로 사용자를 찾을 수 없습니다. : " + requesterUsername));

        GuestBook guestBook = guestBookRepository.findById(guestBookId)
                .orElseThrow(() -> new NoSuchElementException("id로 방명록을 찾을 수 없습니다. : " + guestBookId));

        if (!requester.getId().equals(guestBook.getWriter().getId())) {
            throw new IllegalArgumentException("요청자는 방명록의 작성자가 아닙니다.");
        }

        guestBookRepository.delete(guestBook);
    }
}

