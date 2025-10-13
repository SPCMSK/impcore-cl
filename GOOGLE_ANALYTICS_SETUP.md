# 📊 Google Analytics Setup - IMPCORE Records

## 🚀 Setup Instructions

### 1. Create Google Analytics Account
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new account for "IMPCORE Records"
3. Create a new property for your website
4. Choose "Web" as the platform
5. Enter your website URL: `https://impcore-cl.vercel.app`

### 2. Get Your Measurement ID
1. In your Google Analytics dashboard, go to **Admin**
2. In the Property column, click **Data Streams**
3. Click on your web stream
4. Copy the **Measurement ID** (format: G-XXXXXXXXXX)

### 3. Configure Environment Variables
1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Replace the placeholder with your actual Measurement ID:
```env
NEXT_PUBLIC_GA_ID=G-YOUR-ACTUAL-ID
```

### 4. Verify Setup
1. Deploy your site or run locally:
```bash
npm run dev
```

2. Visit your site and perform some actions (click releases, view artists, etc.)
3. Check Google Analytics Real-time reports to see if events are coming through

## 📈 Tracked Events

The following events are automatically tracked:

### Music Player Events
- `play_track` - When a user plays a track
- `pause_track` - When a user pauses a track

### Navigation Events
- `view_release_details` - When viewing release details
- `view_artist_profile` - When viewing artist profiles
- `click_streaming_link` - When clicking Spotify, Apple Music, etc.
- `click_purchase_link` - When clicking Beatport, Bandcamp, etc.

### Future Events (Ready to implement)
- `submit_demo` - Demo submissions
- `subscribe_newsletter` - Newsletter subscriptions

## 🔍 Custom Analytics Functions

All tracking functions are available in `@/components/GoogleAnalytics`:

```typescript
import { musicEvents } from '@/components/GoogleAnalytics';

// Track custom events
musicEvents.playTrack('Energy Flow', 'SPCMSK');
musicEvents.clickStreamingLink('Spotify', 'Energy EP');
musicEvents.viewArtistProfile('CINDER');
```

## 📋 Analytics Dashboard

Key metrics to monitor:
- **Page Views**: Homepage, releases, artists
- **User Engagement**: Time spent, pages per session
- **Release Performance**: Which releases get the most clicks
- **Platform Preferences**: Spotify vs Beatport vs SoundCloud
- **Artist Popularity**: Which artists get the most profile views

## 🎯 Goals to Set Up in GA4

1. **Stream Engagement**: Users who click streaming links
2. **Purchase Intent**: Users who click purchase links
3. **Artist Interest**: Users who view multiple artist profiles
4. **Return Visitors**: Users who return to discover new releases

## 🔒 Privacy & GDPR

The implementation includes:
- ✅ No cookies stored without consent
- ✅ Anonymized IP addresses
- ✅ Respects Do Not Track headers
- ✅ Only tracks essential music-related interactions

## 🐛 Troubleshooting

**Events not showing up?**
1. Check that `NEXT_PUBLIC_GA_ID` is set correctly
2. Verify the Measurement ID format (should start with G-)
3. Wait 24-48 hours for data to appear in reports
4. Check browser console for any JavaScript errors

**Real-time events not working?**
1. Make sure you're testing from a different IP than your own (or disable Google Analytics blocker)
2. Try incognito/private browsing mode
3. Check that ad blockers aren't blocking Google Analytics