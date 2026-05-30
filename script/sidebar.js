function updateSidebarHeight() {
  const sidebar = document.querySelector('.sidebar');
  const bottombar = document.querySelector('.bottombar');

  // Get the position of the bottom bar relative to the top of the viewport.
  const bottombarRect = bottombar.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  // The offset of the top of the sidebar from the top of the viewport (top bar height)
  const topOffset = getComputedStyle(document.documentElement)
    .getPropertyValue('--topbar-height').trim();
  const topbarHeight = parseInt(topOffset) || 60;

  // Calculate the theoretical maximum height of the sidebar (if it doesn't touch anything).
  const maxHeight = viewportHeight - topbarHeight;

  // Determine if the bottom bar is in the viewport and if it threatens the sidebar.
  if (bottombarRect.top < viewportHeight) {
    //The bottom bar is already on the screen; the bottom of the sidebar should stop at the top of the bottom bar.
    const newHeight = bottombarRect.top - topbarHeight;
    sidebar.style.height = Math.max(200, newHeight) + 'px'; // Minimum height protection
  } else {
    // The bottom bar remains at the bottom of the screen, while the sidebar expands to full screen.
    sidebar.style.height = maxHeight + 'px';
  }
}

// Listen for scrolling and window size changes
window.addEventListener('scroll', updateSidebarHeight);
window.addEventListener('resize', updateSidebarHeight);
window.addEventListener('load', updateSidebarHeight);