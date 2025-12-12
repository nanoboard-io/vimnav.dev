# VimNav Docs Update – Keybinds Editor Section

This guide explains how to extend [vimnav.dev/docs](https://vimnav.dev/docs) with documentation for the new keybinds editor and configurable keymap system.

## Target Location

This will be a new version page, with updates to the configuration section for the keybinds features.

- Locate the **Extension Configuration** chapter.
- Insert a new subsection titled `### Keybinds Editor` immediately after the existing Extension Options description.
- Add a prominent callout in the main features section highlighting keyboard customization.
- Update any navigation sidebar or table-of-contents entries to include the new subsection.
- This change ships with the keybinds release; update version references to reflect the appropriate version number.

## Content Checklist

### Overview

- 2–3 sentences describing the built-in keymap editor that allows users to view, edit, and customize all keyboard shortcuts.
- Mention that VimNav uses a Vim-inspired keymap system with modal editing (Normal, Insert, Visual modes) and context-specific bindings (overlays, states).
- Note that all keybindings are fully customizable and changes take effect immediately—no page reload required.

### Accessing the Editor

- Document how to open the keymap editor:
  - Open command palette (`:`)
  - Type `:keybinds`
  - Or bind a custom key to `keymap-editor.open`
- Describe the three-tab interface:
  - **Bindings Tab**: Browse, search, and edit all keybindings
  - **Info Tab**: View keymap metadata, warnings, and conflict detection
  - **Docs Tab**: Quick reference for the keymap system

### Viewing Keybindings

- Explain the DSL format used to display bindings:
  ```
  <keys> → <command> (<modes>, <contexts>) "<description>"
  ```
- Provide examples:
  ```
  j → scroll.down (n, root) "Scroll down"
  <C-f> → scroll.pageDown (n, root) "Page down"
  g g → scroll.top (n, root) "Scroll to top"
  <CR> → tabs.activate (n, tabs-overlay) "Activate selected tab"
  ```
- Document the navigation keys:
  - `j`/`k` - Move down/up through bindings
  - `g g`/`G` - Jump to first/last binding
  - `/` - Focus search input to filter bindings
  - `Ctrl+h`/`Ctrl+l` - Switch between tabs

### Editing Keybindings

- Explain the edit workflow:
  1. Navigate to a binding with `j`/`k` or search with `/`
  2. Press `Enter` to enter edit mode
  3. Modify the **Keys** field (e.g., change `j` to `<C-j>`)
  4. Update the **Description** field if desired
  5. Press `Enter` to save or `Escape` to cancel
- Note that command, modes, and contexts are read-only during editing (delete and recreate to change these)
- Mention the structured editing interface with separate fields for keys and description
- Explain context-aware Escape behavior:
  - While editing: cancels edit, returns to browse mode (editor stays open)
  - While browsing: closes the entire editor

### Adding New Keybindings

- Document the add workflow:
  1. Navigate to where you want to insert the binding
  2. Press `a` to add a new binding
  3. Fill in all required fields in the DSL format:
     ```
     <C-d> → scroll.halfPageDown (n, root) "Scroll half page down"
     ```
  4. Press `Enter` to save
- Include key notation reference:
  - `<C-x>` - Ctrl + x
  - `<A-x>` - Alt + x
  - `<S-x>` - Shift + x
  - `<M-x>` - Meta (Cmd) + x
  - `<Space>` - Space bar
  - `<CR>` - Enter/Return
  - `<Esc>` - Escape
  - `<BS>` - Backspace
  - `<Tab>` - Tab
  - `g g` - Multi-key sequence (press g twice)

### Deleting Keybindings

- Explain the delete workflow:
  1. Navigate to the binding you want to remove
  2. Press `d`
  3. Confirm the deletion when prompted
- Note that deleted bindings are removed immediately and persist across sessions

### Conflict Detection

- Describe the automatic conflict detection system
- Explain conflict badges: **⚠️ N** where N is the number of conflicts
- Show example:
  ```
  <Space> → scroll.pageDown (n, root) ⚠️ 1
  <Space> → scroll.bottom (n, root) ⚠️ 1
  ```
- Note that hovering shows conflict details: "Conflicts with 1 other binding(s): scroll.bottom"
- Explain that last binding loaded wins at runtime if conflicts remain
- Provide resolution guidance:
  1. Navigate to conflicting binding
  2. Press `Enter` to edit
  3. Change keys to something unique
  4. Press `Enter` to save
  5. Conflict warning disappears

### Exporting Keymaps

- Document the export workflow:
  1. Press `x` from any tab in the editor
  2. File `vimnav-keymap.json` downloads automatically
  3. JSON contains all current keybindings with metadata
- Suggest uses:
  - Backup before making major changes
  - Share custom keymaps with others
  - Edit manually in a text editor
  - Version control your configuration

### Importing Keymaps

- Explain the import workflow:
  1. Press `i` from any tab in the editor
  2. Select a valid JSON keymap file
  3. File is validated and loaded immediately
  4. Invalid files show error toast with details
- Note that import replaces the entire current keymap (suggest exporting first as backup)
- Mention validation errors:
  - Invalid JSON syntax
  - Missing required fields (keys, command, modes)
  - Unknown modes or contexts
  - Malformed key notation

### Resetting to Defaults

- Document the reset workflow:
  1. Press `R` from the keymap editor
  2. Confirm the reset action
  3. All custom bindings are cleared
  4. Default VimNav keymap is restored
- Warn that this action cannot be undone (suggest exporting first)

### Modes and Contexts

- Explain the three Vim-style modes:
  - `n` - Normal mode (default navigation mode)
  - `i` - Insert mode (when typing in input fields)
  - `v` - Visual mode (text selection)
- Describe common contexts:
  - `root` - Base page navigation
  - `tabs-overlay` - Tabs overlay
  - `hint` - Hint overlay (link navigation)
  - `keymap-editor` - Keymap editor itself
  - `command-palette` - Command palette
  - `input-select` - Input selector overlay
- Note that context-specific bindings only work when that context is active (e.g., tabs-overlay bindings only work when tabs overlay is open)

### Command Categories

- List common command categories with examples:
  - `scroll.*` - Page scrolling (scroll.down, scroll.pageUp, scroll.top)
  - `tabs.*` - Tab management (tabs.open, tabs.navigateDown, tabs.activate)
  - `hint.*` - Link navigation (hint.open, hint.click)
  - `history.*` - Browser history (history.back, history.forward)
  - `mode.*` - Mode switching (mode.insert, mode.visual)
  - `marks.*` - Marks system (marks.startCreate, marks.startNavigate)
  - `search.*` - In-page search (search.start, search.next)
- Explain the `category.action` naming pattern for consistency

### Persistence & Sync

- State that VimNav writes keymap data to `chrome.storage.local`
- Clarify that changes take effect immediately across all tabs and windows
- Note that reopening Chrome restores custom keymap automatically
- Mention that the editor itself updates live when saving changes (no need to close and reopen)

### Troubleshooting Tips

- **Keybinding not working after edit:**
  - Verify the binding saved correctly (check in editor list)
  - Ensure mode is correct (`n` for normal page navigation)
  - Ensure context is correct (`root` for general page navigation)
  - Check browser console for keymap errors
  - Try reloading the page
- **Export/Import issues:**
  - Check browser console for errors
  - Ensure browser allows file downloads (export)
  - Verify JSON file is valid (import)
  - Try exporting default keymap first to see correct format
- **Conflict warnings:**
  - Last binding wins at runtime
  - Use different keys, or different modes/contexts to resolve
  - Check Info tab for full conflict report
- **Editor not opening:**
  - Ensure command palette is working (`:` key)
  - Check that `keymap-editor.open` command exists
  - Try reloading the extension

### Best Practices

- Include tips for effective keymap customization:
  - **Export before major changes** - Keep backups of working configurations
  - **Test incrementally** - Make one change at a time and test
  - **Use consistent patterns** - Follow `category.action` naming for custom commands
  - **Be specific with descriptions** - Help your future self understand each binding
  - **Leverage contexts** - Use context-specific bindings to avoid conflicts
  - **Respect browser shortcuts** - Avoid overriding critical browser keys (Ctrl+T, Ctrl+W, etc.)
  - **Document your customizations** - Add clear descriptions for custom bindings

## Formatting & Style

- Match existing markdown style: heading hierarchy, bullet syntax, callouts
- Use backticks for literal UI labels (`:keybinds`, `Bindings`, `Info`, `Docs`)
- Use code blocks for DSL examples and key notation
- Keep sentences concise; break lengthy instructions into numbered lists
- Add screenshots or GIF placeholders if docs usually include visuals:
  - `![Keybinds Editor Interface](path/to/image.png)`
  - `![Editing a Keybinding](path/to/edit-animation.gif)`
  - `![Conflict Detection](path/to/conflicts.png)`
- Use callout boxes for important warnings (reset cannot be undone, export before major changes, etc.)

## Verification Checklist

- After editing, run the local docs build (if applicable) to ensure no broken anchors
- Click through navigation to confirm new section appears in expected order
- Proofread for consistency with terminology used in the implementation (DSL, modes, contexts, commands)
- Verify all code examples use correct syntax and actually work
- Test all documented workflows match actual editor behavior
- Ensure keyboard shortcuts mentioned match default keymap
- Update any doc version strings to reflect the keybinds release version
- Confirm version picker (if present) points to new release

## Additional Content Suggestions

### Quick Start Section

Consider adding a "Quick Start" callout box at the beginning:

> **Quick Start**: Open command palette with `:`, type `:keybinds`, press Enter. Navigate with `j`/`k`, press `Enter` to edit, `a` to add, `d` to delete. Press `x` to export your keymap as backup.

### Example Customizations

Include a section with common customization examples:

**Make `Space G` scroll to top instead of `gg`**
```
j → scroll.top (n, root) "Scroll to top"
```

**Add Ctrl+d for half-page scroll:**
```
<C-d> → scroll.halfPageDown (n, root) "Scroll half page down"
<C-u> → scroll.halfPageUp (n, root) "Scroll half page up"
```

**Create custom hint key:**
```
<Space> → hint.open (n, root) "Open hint overlay"
```
