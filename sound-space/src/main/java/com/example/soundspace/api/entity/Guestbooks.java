package com.example.soundspace.api.entity;

import lombok.*;

import javax.persistence.*;


@Builder
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Guestbooks extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "writer_id")
    private Users writer;

    @ManyToOne
    @JoinColumn(name = "target_user_id")
    private Users targetUser;

    private String content;
}
