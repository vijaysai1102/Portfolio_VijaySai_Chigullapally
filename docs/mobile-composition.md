# Mobile composition

The responsive concept in homepage-concept.html is the T06 mockup. At 360px/390px, use 22px gutters, one-column hero and projects, a 270px maximum monogram, 48px heading, full-width demo and wrapping content. At 768px use the desktop reading order with smaller typography; no information is hidden by hover. At 700px production navigation switches to a native menu button and stacked links, with Escape/selection close and focus restoration.

Chat opens as a bottom panel with left/right margins and a visible close button, max-height relative to dynamic viewport and independently scrolling messages; keyboard input remains reachable. Dialog opening preserves page scroll. Demo has wrapping controls and horizontally contained rows; expansion uses a native modal with close and reset controls. No third-party frame on narrow screens.

The concept shows open-chat and selected sample-project states. In production the launcher starts collapsed so content is not obstructed. Above 700px chat is a 380px panel at the bottom-right. The centerpiece is static on touch; under reduced motion all transitions become immediate.

Verification limitation: local concept returns HTTP 200 and markup includes a viewport meta and responsive rules. CUA browser host unavailable, so the 360/390/tablet render, keyboard and touch review remain pending. User authorized proceeding and reviewing after implementation; no rendered review is claimed.
