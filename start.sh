#!/usr/bin/env bash
# ============================================================
# start.sh — run NeuroViz locally
# ============================================================
# This script lives inside the NeuroViz_Project folder.
# Usage:
#   1. Open Terminal
#   2. Drag this folder into the Terminal window OR `cd` to it
#   3. Run:    bash start.sh
#
# What it does:
#   - Picks an open port starting at 8765
#   - Starts a local web server in this folder
#   - Opens your default browser to the site
#   - Press Ctrl+C in the Terminal to stop
# ============================================================

set -e

# Always operate inside this script's own folder, no matter where you call it from
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Confirm we're in the right place — index.html should be next to us
if [ ! -f "index.html" ]; then
  echo ""
  echo "ERROR: index.html not found in $SCRIPT_DIR"
  echo "Make sure start.sh sits in the same folder as index.html."
  exit 1
fi

# Find an available port
PORT=8765
while lsof -i :"$PORT" >/dev/null 2>&1 || ss -ltn 2>/dev/null | grep -q ":$PORT "; do
  PORT=$((PORT + 1))
  if [ "$PORT" -gt 8800 ]; then
    echo "ERROR: Could not find a free port between 8765 and 8800"
    exit 1
  fi
done

URL="http://localhost:$PORT/"

# Pick whichever server tool is installed
if command -v python3 >/dev/null 2>&1; then
  SERVER_CMD=(python3 -m http.server "$PORT")
elif command -v python >/dev/null 2>&1; then
  SERVER_CMD=(python -m SimpleHTTPServer "$PORT")
else
  echo "ERROR: python3 (or python) is required to run the server"
  echo "On macOS, python3 ships with the OS — try: which python3"
  exit 1
fi

# Open the browser after a brief delay (best-effort, OS-aware)
(
  sleep 1.5
  if   command -v open >/dev/null 2>&1; then open "$URL"        # macOS
  elif command -v xdg-open >/dev/null 2>&1; then xdg-open "$URL" # Linux
  elif command -v start >/dev/null 2>&1; then start "$URL"       # Git-Bash on Windows
  fi
) &

echo ""
echo "============================================================"
echo "  NeuroViz - Cognitive Health Atlas"
echo "============================================================"
echo "  Folder:  $SCRIPT_DIR"
echo "  URL:     $URL"
echo ""
echo "  Browser will open automatically in 1-2 seconds."
echo "  Press Ctrl+C to stop the server."
echo "============================================================"
echo ""

# Run the server (foreground, so Ctrl+C cleanly stops it)
exec "${SERVER_CMD[@]}"
