# How to Add the Godfather Love Theme Background Music

The background music system has been set up and is ready to use. However, you need to add the actual audio file for "Love Theme from The Godfather".

## Steps to Add the Music:

### Option 1: Download and Use Local File (Recommended)

1. **Download the audio file**:
   - Search for "Love Theme from The Godfather" and download it as an MP3 file
   - Or download from: https://www.youtube.com/watch?v=HWqKPWO5T4o (use a YouTube to MP3 converter)

2. **Create the sounds folder**:
   ```bash
   mkdir public/sounds
   ```

3. **Add the file**:
   - Place the downloaded MP3 file in `public/sounds/`
   - Rename it to something simple like `godfather-love-theme.mp3`

4. **Update the code**:
   - Open `src/app/valentine/page.tsx`
   - Find line 21: `audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');`
   - Replace with: `audioRef.current = new Audio('/sounds/godfather-love-theme.mp3');`

### Option 2: Use a Streaming URL

If you have a direct URL to the Godfather Love Theme MP3 file, you can use it directly:

```typescript
audioRef.current = new Audio('YOUR_URL_HERE');
```

## Current Setup

The background music player is configured with:
- 🎵 **Looping**: Yes (plays continuously)
- 🔊 **Volume**: 30% (subtle background music)
- 🎛️ **Control**: Music button in top-right corner (🔊/🔇)
- ▶️ **Auto-play**: No (user must click to start, browser requirement)

## Testing

After adding the file:
1. Visit `http://localhost:3001/valentine`
2. Click the music button (🔇) in the top-right corner
3. The music should start playing and the icon changes to 🔊
4. Click again to pause

---

**Note**: The current placeholder URL is `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3` which plays generic background music. Replace it with the Godfather theme for the romantic atmosphere!
