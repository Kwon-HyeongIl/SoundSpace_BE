//package com.example.soundspace.api.entity;
//
//import lombok.*;
//
//import javax.persistence.*;
//import java.util.ArrayList;
//import java.util.List;
//
//import static javax.persistence.CascadeType.ALL;
//import static javax.persistence.FetchType.LAZY;
//
//@Builder
//@AllArgsConstructor
//@Setter
//@Getter
//@Entity
//public class Playlists {
//
//    @Column
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @OneToMany(mappedBy = "playlist", cascade = ALL, fetch = LAZY)
//    private List<Tracks> tracks = new ArrayList<>();
//
//    public Playlists() {
//        init();
//    }
//
//    private void init() {
//        for (int i = 1; i <= 10; i++) {
//            Tracks track = new Tracks(i);
//            track.setPlaylist(this);
//            tracks.add(track);
//        }
//    }
//}
