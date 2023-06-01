package com.example.soundspace.api.entity;

import lombok.*;

import javax.persistence.*;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
public class Tracks extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long musicId;

    @Column
    private Integer trackIndex;

    @Column
    private String trackTitle;

    @Column
    private String artistName;

    @Column
    private String albumImageUrl;

    @Column
    @Lob
    private String lyrics;

    @ManyToOne
    @JoinColumn(name = "playlist_id")
    private Playlists playlist;

    public Tracks(int index) {
        trackIndex = index;
    }
}
