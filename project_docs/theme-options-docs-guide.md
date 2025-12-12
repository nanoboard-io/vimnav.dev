# VimNav Docs Update – Theme Options Section

This guide explains how to extend [vimnav.dev/docs](https://vimnav.dev/docs) with documentation for the new theme management workflow.

## Target Location

This will be a new version page, with update to the configuration section relating the the new themes feature.

- Locate the **Extension Configuration** chapter.
- Insert a new subsection titled `### Theme Options` immediately after the existing description of the Extension Options page (before Side Panel content, if present).
- Update any navigation sidebar or table-of-contents entries to include the new subsection.
- This change ships with the 1.3.x documentation release; make sure version references (sidebar badges, changelog entries, etc.) reflect **v1.3.\***, but only on the new version page, which should be the new default.

## Content Checklist

### Overview

- 2–3 sentences describing built-in palettes plus custom iTerm2 uploads.
- Mention that the active theme recolors overlays, the side panel, and the options UI instantly—no tab refresh required.

### Selecting Themes

- Note the _Theme List_ in the side panel.
- Document how to activate a theme (single click/radio selection) and call out instant sync across tabs/windows.
- Remind readers that the help overlay (`?`) reflects the active palette.

### Uploading Custom Themes

- Explain the `.itermcolors` upload button path (`Upload Theme` in the side panel).
- Include the guardrails:
  - Max file size: **200 KB**.
  - Accepts valid iTerm2 XML; malformed files show an error toast.
  - Free tier stores up to **two** custom themes; describe delete flow.
- Note the naming behavior (uses embedded name or filename) and that uploads persist with metadata (timestamp, source info).

### Persistence & Sync

- State that VimNav writes theme data to `chrome.storage.local`.
- Clarify that reopening Chrome restores the last active theme automatically.
- Mention that background/content/sidepanel contexts listen for storage + runtime events, so changes propagate immediately.

### Removing Themes & Fallback

- Describe what happens when the active custom theme is deleted (automatic fallback to VimNav default).
- Mention side panel UI states (Delete button disabled for built-ins, confirmation prompts if any).

### Tabs Overlay Enhancements

- Add a short subsection in the Tabs overlay docs describing the enhanced move mode:
  - Note `m` to enter move mode, `j/k` to choose a destination, `P` to toggle before/after placement, and `Enter`/`Esc` to confirm/cancel.
  - Call out that the moved tab remains highlighted in its new spot so users can track it instantly.
  - Mention that grouped tabs respect the target group’s expand state and that VimNav preserves the previous scroll position while the list refreshes.
- Update the overlay navigation section to emphasize the group controls:
  - Document `o` (expand all groups) and `c` (collapse all groups).
  - Reiterate the focused-group shortcuts `h`/`l` for collapse/expand plus the automatic persistence of group expansion between sessions.
- Ensure the Help overlay (`?`) and keyboard reference tables on the docs site list the new/changed keybindings above.

### Troubleshooting Tips

- Common upload issues (invalid file, over size limit) and how the UI reports them.
- If a theme doesn’t appear to apply, advise checking console for storage errors and reopening the side panel/options page.
- Note that a manual refresh is only needed if Chrome’s extension storage is unavailable.

## Formatting & Style

- Match existing markdown style: heading hierarchy, bullet syntax, callouts.
- Use backticks for literal UI labels (`Upload Theme`, `Theme List`, `Delete`).
- Keep sentences concise; break lengthy instructions into bullet lists.
- Add screenshots or GIF placeholders if the docs usually include visuals (e.g., `![Sidepanel Theme List](path/to/image.png)`).

## Verification Checklist

- After editing, run the local docs build (if applicable) to ensure there are no broken anchors.
- Click through the generated navigation to confirm the new section appears in the expected order.
- Proofread for consistency with terminology used across the theming implementation (token names, feature labels).
- Update any doc version string from 1.2.x → **1.3.x** and confirm the site’s version picker (if present) points to the new release.
