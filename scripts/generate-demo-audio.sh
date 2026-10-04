#!/usr/bin/env bash
set -euo pipefail

# Generates plain sine-tone MP3s for the mock podcast feeds.
# Only FFmpeg (with libmp3lame) is required; no speech synthesis is involved.
if ! command -v ffmpeg >/dev/null; then
  echo "ffmpeg is required to generate the demo audio" >&2
  exit 1
fi

output_dir="src/public/mock-feeds/audio"
mkdir -p "$output_dir"

# language:frequency(Hz) - different pitches make the two files distinguishable
for entry in "en:440" "ja:523"; do
  lang="${entry%%:*}"
  frequency="${entry##*:}"
  output="$output_dir/podcast-test-$lang.mp3"

  ffmpeg -nostdin -v error -y \
    -f lavfi -i "sine=frequency=$frequency:duration=3" \
    -filter:a "volume=0.3" \
    -codec:a libmp3lame -q:a 6 "$output"

  bytes="$(wc -c < "$output")"
  sed -i "/podcast-test-$lang\\.mp3/s/length=\"[0-9]*\"/length=\"$bytes\"/" \
    "src/public/mock-feeds/$lang/briefing.xml"
done
