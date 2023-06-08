package com.example.soundspace.api.entity;

import lombok.*;

import javax.persistence.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
public class Bookmarks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long musicId;

    @Column
    private String trackTitle;

    @Column
    private String albumImageUrl;

    @Column
    private String artistName;

    @ManyToOne
    @JoinColumn
    private Users user;
}

