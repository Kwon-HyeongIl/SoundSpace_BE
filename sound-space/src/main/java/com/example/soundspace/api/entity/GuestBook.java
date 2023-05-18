package com.example.soundspace.api.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GuestBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users writer;  // 작성자

    @ManyToOne
    @JoinColumn(name = "target_user_id")
    private Users targetUser;  // 방명록의 주인

    private String content;  // 방명록 내용
}
