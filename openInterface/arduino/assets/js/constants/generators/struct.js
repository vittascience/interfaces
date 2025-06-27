// MP3
const STRUCT_MP3_PLAY_HISTORY = 
`struct Play_history {
  uint8_t disk;
  uint16_t index;
  char name[8];
}* SPISong, *SDSong;`;