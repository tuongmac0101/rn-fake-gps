#!/bin/bash

# Script to remove transparency from App Store icon
# Apple App Store requires icons without transparency

ICON_PATH="assets/logo.png"
BACKUP_PATH="assets/logo_backup.png"

echo "🔧 Fixing icon transparency for App Store submission..."

# Create backup
if [ -f "$ICON_PATH" ]; then
  cp "$ICON_PATH" "$BACKUP_PATH"
  echo "✅ Backup created: $BACKUP_PATH"
  
  # Remove transparency by compositing on white background
  # Using sips (macOS built-in tool)
  if command -v sips &> /dev/null; then
    # Create a white background and composite the icon on top
    sips -s format png --setProperty formatOptions 0 "$ICON_PATH" --out "$ICON_PATH.tmp" > /dev/null 2>&1
    
    # Alternative: Use ImageMagick if available
    if command -v convert &> /dev/null; then
      convert "$ICON_PATH" -background white -alpha remove -alpha off "$ICON_PATH"
      echo "✅ Transparency removed using ImageMagick"
    else
      echo "⚠️  ImageMagick not found. Please install it or manually remove transparency:"
      echo "   Option 1: Install ImageMagick: brew install imagemagick"
      echo "   Option 2: Use online tool or Photoshop to remove transparency"
      echo "   Option 3: Open in Preview (macOS) and export without transparency"
    fi
    
    # Verify
    if command -v sips &> /dev/null; then
      ALPHA=$(sips -g hasAlpha "$ICON_PATH" 2>/dev/null | grep "hasAlpha" | awk '{print $2}')
      if [ "$ALPHA" = "no" ]; then
        echo "✅ Icon transparency removed successfully!"
      else
        echo "⚠️  Icon still has transparency. Please fix manually."
      fi
    fi
  else
    echo "⚠️  sips not found. Please use ImageMagick or manual method."
  fi
else
  echo "❌ Icon file not found: $ICON_PATH"
  exit 1
fi

echo ""
echo "📝 Next steps:"
echo "   1. Verify the icon looks correct"
echo "   2. Test the build: bun run build:ios:release"
echo "   3. If backup needed: cp $BACKUP_PATH $ICON_PATH"
