package com.example.soundspace.api.v1.service;

import com.example.soundspace.api.entity.GuestBook;
import com.example.soundspace.api.entity.Users;
import com.example.soundspace.api.v1.dto.request.GuestBookRequestDto;
import com.example.soundspace.api.v1.dto.response.GuestBookResponseDto;
import com.example.soundspace.api.v1.repository.GuestBookRepository;
import com.example.soundspace.api.v1.repository.UsersRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


// GuestBookService.java
@Service
public class GuestBookService {

    private final GuestBookRepository guestBookRepository;
    private final UsersRepository usersRepository;

    public GuestBookService(GuestBookRepository guestBookRepository, UsersRepository usersRepository) {
        this.guestBookRepository = guestBookRepository;
        this.usersRepository = usersRepository;
    }

    public GuestBookResponseDto writeGuestBook(Users writer, Long targetUserId, GuestBookRequestDto guestBookRequestDto) {
        Users targetUser = usersRepository.findById(targetUserId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id : " + targetUserId));

        // Check if writer is not null
        if (writer == null) {
            throw new IllegalArgumentException("Writer is null");
        }

        GuestBook guestBook = new GuestBook();
        guestBook.setWriter(writer);
        guestBook.setTargetUser(targetUser);
        guestBook.setContent(guestBookRequestDto.getContent());

        guestBookRepository.save(guestBook);

        // GuestBook을 GuestBookResponseDto로 변환
        GuestBookResponseDto responseDto = new GuestBookResponseDto();
        responseDto.setContent(guestBook.getContent());
        responseDto.setWriterNickname(writer.getNickname());

        return responseDto;
    }
}