# VimEdit Documentation Update for VimNav.dev

Based on the current VimNav docs structure and styling, here are comprehensive documentation page update instructions:

## Documentation Update Instructions for VimNav.dev

### 1. Add New Section to Main Documentation

**Location**: Add after the existing "Mode System" section or create a new "Text Editing" section

**Section Structure**:

````markdown
## 📝 VimEdit Mode

VimNav includes a powerful VimEdit feature that opens a full vim editor for any input field on web pages. This allows you to edit form fields, text areas, and contenteditable elements using vim's complete editing capabilities.

### Entering VimEdit Mode

1. **Field Selection**: Press `Ctrl+i` to activate input field selection
2. **Hint Navigation**: Type hint letters (a, b, c, etc.) to select the desired input field
3. **Auto-selection**: When only one field matches your input, it's selected automatically
4. **Manual confirmation**: Press `Enter` to confirm selection when multiple fields match

### The VimEdit Interface

Once a field is selected, VimEdit opens with:

- **Full vim modal interface** with transparent overlay
- **Line numbers** for multi-line editing
- **Color-coded status bar** showing current mode and cursor position
- **Command line** for vim commands (`:w`, `:q`, etc.)
- **Visual mode indicators** with distinct colors for different selection types

### Vim Modes in VimEdit

#### Normal Mode (Default)

Standard vim navigation and text manipulation:

**Movement**:

- `h`, `j`, `k`, `l` - Character/line movement
- `w`, `b`, `e` - Word movement (treats punctuation as separate words)
- `W`, `B`, `E` - WORD movement (treats non-whitespace as single words)
- `0`, `$` - Line start/end
- `gg`, `G` - File start/end
- `f{char}`, `F{char}` - Find character
- `t{char}`, `T{char}` - Till character

**Editing**:

- `x`, `X` - Delete character
- `dd` - Delete line
- `yy` - Yank (copy) entire line
- `p`, `P` - Paste (line-based or character-based)
- `r{char}` - Replace character
- `dw`, `cw`, `yw` - Word operations (small words)
- `dW`, `cW`, `yW` - WORD operations (big words)
- `df{char}`, `dt{char}` - Delete find/till character
- `u` - Undo last change
- `Ctrl+r` - Redo last undone change

**Mode Transitions**:

- `i` - Insert mode at cursor
- `I` - Insert at line start
- `a` - Insert after cursor
- `A` - Insert at line end
- `o`, `O` - Open new line
- `v` - Visual mode
- `V` - Visual line mode

#### Insert Mode

Standard text insertion with vim keybindings:

- `Escape` - Return to normal mode
- Standard typing inserts text
- `Backspace`, `Delete` - Character deletion
- `Enter` - New line
- `Tab` - Insert spaces (configurable)

#### Visual Mode

Text selection and manipulation with enhanced visual feedback:

**Character Visual Mode (`v`)**:
- **Blue highlighting** for precise character-level selection
- Movement keys extend selection character by character
- `0`, `$` - Extend selection to line boundaries
- `G` - Extend selection to end of file

**Line Visual Mode (`V`)**:
- **Orange highlighting** for full-line selection
- Movement keys extend selection line by line
- Always selects entire lines regardless of cursor position
- `0`, `$`, `G` - Extend selection maintaining line mode

**Operations**:
- `d`, `x` - Delete selection
- `y` - Yank selection
- `c` - Change selection (delete and enter insert mode)

#### Command Mode

Vim command-line interface:

- `:` - Enter command mode
- `:w` - Save changes to input field
- `:q` - Quit VimEdit
- `:wq` - Save and quit
- `:q!` - Quit without saving

### Mode Indicators

VimEdit provides visual feedback through color-coded indicators:

#### Status Bar Mode Colors
- **Gray background**: Normal mode (-- NORMAL --)
- **Green background**: Insert mode (-- INSERT --)
- **Purple background**: Visual mode (-- VISUAL -- or -- VISUAL LINE --)
- **Red background**: Command/Replace mode (-- REPLACE --)

#### Visual Selection Colors
- **Blue highlighting**: Character visual mode (`v`) for precise selection
- **Orange highlighting**: Line visual mode (`V`) for full-line selection

### Undo/Redo System

VimEdit includes a comprehensive undo/redo system that tracks all editing operations:

#### How Undo/Redo Works

- **Session-based tracking**: Each editing session (INSERT, replace, delete operation) creates one undo entry
- **Smart change detection**: Only saves to history when text actually changes
- **Automatic history management**: Maintains up to 50 undo/redo entries
- **Redo clearing**: Making new changes clears redo history (standard vim behavior)

#### Undo/Redo Operations

- **`u`** - Undo last change
- **`Ctrl+r`** - Redo last undone change
- **Status feedback**: Shows "1 change undone" or "1 change redone" messages
- **History limits**: Shows "Already at oldest change" or "Already at newest change" when at limits

#### What Can Be Undone

**All editing operations are undoable**:
- INSERT mode sessions (`i`, type text, `Escape`)
- DELETE operations (`x`, `dd`, `dw`, `d3w`, `df{char}`, `dt{char}`)
- CHANGE operations (`cw`, `cc` - creates two undo entries: delete + insert)
- REPLACE operations (`r{char}`)
- PASTE operations (`p`, `P`)
- Visual mode operations (`v` + `d`, `V` + `d`)

#### Usage Examples

```vim
# Basic undo/redo
i → "hello world" → Escape → u → Ctrl+r

# Complex editing with undo
dw → u         # Delete word, then undo
d3w → u        # Delete 3 words, then undo
cw → "new" → Escape → u → u  # Change word (2 undos: insert + delete)
yy → p → u     # Yank line, paste, undo paste
```

### Smart Clipboard System

VimEdit automatically detects whether clipboard content should be pasted as lines or characters:

#### Line-based Operations

**Commands that yank entire lines**:
- `yy` - Yank current line
- `dd` - Delete current line (saved to clipboard)
- `cc` - Change current line
- `V` + `y` - Visual line mode yank

**Line-based pasting**:
- `p` - Paste line **below** current line
- `P` - Paste line **above** current line
- Cursor positioned at start of pasted line

#### Character-based Operations

**Commands that yank character ranges**:
- `yw`, `yW` - Yank word/WORD
- `y$`, `y0` - Yank to line end/start
- `df{char}`, `yt{char}` - Yank find/till ranges
- `v` + `y` - Visual character mode yank

**Character-based pasting**:
- `p` - Paste **after** cursor position
- `P` - Paste **before** cursor position
- Inserts text inline within current line

#### Smart Paste Examples

```vim
# Line-based example
yy              # Yank "hello world"
j → p           # Paste below: creates new line with "hello world"

# Character-based example
yw              # Yank "hello" (word)
$ → p           # Paste after cursor: "hello worldhello"
```

### Word Movement Explained

VimEdit supports both **word** and **WORD** movement for precise text navigation:

#### Word Movement (`w`, `b`, `e`)
Treats punctuation as separate words for fine-grained control:
- `this-is-a-word` → stops at: `t`, `-`, `i`, `-`, `a`, `-`, `w`
- `file.name.txt` → stops at: `f`, `.`, `n`, `.`, `t`

#### WORD Movement (`W`, `B`, `E`)
Treats any non-whitespace sequence as a single word for speed:
- `this-is-a-word` → stops at: `t`, end of `word`
- `file.name.txt` → stops at: `f`, end of `txt`

### Key Features

#### Smart Field Selection

- **Hint-based selection**: Visual hints appear over all editable fields
- **Intelligent filtering**: Type letters to filter hints
- **Auto-selection**: Automatically selects when only one match remains
- **Scroll-aware positioning**: Hints stay positioned correctly regardless of page scroll

#### Full Vim Compatibility

- **Complete vim keybindings**: All standard vim commands work
- **Advanced word movement**: Supports both word (`w`/`e`) and WORD (`W`/`E`) navigation
- **Punctuation handling**: Treats punctuation as separate words for precise editing
- **Enhanced visual modes**: Character and line selection with color-coded feedback
- **Mode-aware status bar**: Color-coded indicators for Normal, Insert, Visual, and Command modes
- **Complete motion support**: `v$`, `v0`, `vG` and all standard vim text objects
- **Multi-line editing**: Perfect for textareas and contenteditable elements
- **Smart clipboard operations**: Automatic line vs character-based copy/paste detection
- **Full undo/redo support**: Complete history management with `u` and `Ctrl+r`
- **Operator+motion commands**: Full support for `dw`, `d3w`, `df{char}`, `dt{char}`, etc.
- **Maximize support**: `Ctrl+I` to toggle full-screen editing mode

### Usage Examples

#### Basic Form Editing

1. Navigate to any web form
2. Press `Ctrl+i` to see input field hints
3. Type the hint letter (e.g., `a`) to select first field
4. Edit using vim commands:
   - `i` to start typing
   - `Escape` to return to normal mode
   - `:wq` to save and close

#### Advanced Text Manipulation

```vim
# Select a textarea with lots of text
Ctrl+i → b  # Select field with hint 'b'

# In VimEdit:
gg          # Go to start
dw          # Delete first word (treats punctuation separately)
u           # Undo deletion
d3w         # Delete 3 words
Ctrl+r      # Redo (restore 3 words)
dW          # Delete entire WORD (ignores punctuation)
A           # Insert at end of line
Ctrl+I      # Toggle maximize mode
# Type new content
Escape      # Back to normal mode
:w          # Save changes
:q          # Exit editor
```

#### Advanced Editing with Undo/Redo

```vim
# Complex editing workflow
Ctrl+i → a  # Select field

# Edit with full undo support:
dd          # Delete line
yy          # Yank line above
p           # Paste below
dfc         # Delete from cursor to 'c' (including 'c')
u           # Undo delete to 'c'
dtc         # Delete from cursor to 'c' (excluding 'c')
cw          # Change word
# Type "replacement"
Escape      # Back to normal
u           # Undo insert
u           # Undo delete (from cw)
Ctrl+r      # Redo delete
Ctrl+r      # Redo insert
:wq         # Save and exit
```
````

#### Multi-line Content Editing

```vim
# Edit a large contenteditable div
Ctrl+i → c  # Select the div

# Vim operations:
V           # Visual line mode (orange highlighting)
jjj         # Select 3 entire lines
d           # Delete selected lines
v$          # Character visual mode to end of line (blue highlighting)
o           # Open new line
# Type replacement content
:wq         # Save and exit
```

### Configuration

VimEdit behavior can be customized through extension settings:

#### Performance Settings

- `maxInputs`: Limit number of input fields scanned (default: 100)
- `enableDebugMode`: Show performance metrics and debug info

#### Editor Settings

- `tabSize`: Number of spaces for tab character (default: 2)
- `autoSave`: Automatically save on mode transitions

### Tips and Tricks

#### Efficient Field Selection

- **Single character hints**: Most pages only need single letters (a, b, c)
- **Quick selection**: On forms with one field, `Ctrl+i` → `a` is often enough
- **Visual scanning**: Hints appear over fields in reading order

#### Advanced Vim Usage

- **Word vs WORD movement**: Use `w`/`e` for precise punctuation handling, `W`/`E` for speed
- **Punctuation editing**: `this-is-a-word` - `e` stops at each part, `E` goes to end
- **Find vs Till operations**: `df{char}` includes the character, `dt{char}` excludes it
- **Undo strategy**: Make logical changes, then undo as needed - each INSERT session = 1 undo
- **Line vs character paste**: `yy`+`p` creates new lines, `yw`+`p` inserts inline
- **Visual mode colors**: Blue for character selection, orange for line selection
- **Status bar colors**: Gray (Normal), Green (Insert), Purple (Visual), Red (Command/Replace)
- **Visual text objects**: `v$` select to end of line, `v0` to beginning, `vG` to end of file
- **Maximize mode**: `Ctrl+I` for distraction-free full-screen editing
- **Operator combinations**: `d3w`, `c2W`, `y5j` - combine operators with counts and motions
- **Redo workflow**: Use `u` to undo, `Ctrl+r` to redo, make changes to clear redo history

#### Troubleshooting

- **Field not detected**: Some custom inputs may not be recognized
- **Performance issues**: Reduce `maxInputs` setting for complex pages
- **Keyboard conflicts**: VimEdit captures all keys when active

### Keyboard Reference

| Action                | Key                     | Description                           |
| --------------------- | ----------------------- | ------------------------------------- |
| **Activation**        |
| Enter VimEdit         | `Ctrl+i`                | Show input field selection hints      |
| **Field Selection**   |
| Filter hints          | `a-z`                   | Type letters to filter hint labels    |
| Confirm selection     | `Enter`                 | Select field when multiple matches    |
| Cancel                | `Escape`                | Close field selection                 |
| **Editor Navigation** |
| Character movement    | `h` `j` `k` `l`         | Left, down, up, right                 |
| Word movement         | `w` `b` `e`             | Next word, previous word, end of word |
| WORD movement         | `W` `B` `E`             | Next WORD, previous WORD, end of WORD |
| Line movement         | `0` `$`                 | Start of line, end of line            |
| File movement         | `gg` `G`                | Start of file, end of file            |
| **Text Editing**      |
| Insert modes          | `i` `a` `I` `A` `o` `O` | Various insert positions              |
| Delete                | `x` `dd` `dw` `dW`      | Character, line, word, WORD           |
| Copy                  | `yy` `yw` `yW`          | Line, word, WORD                      |
| Paste                 | `p` `P`                 | After/below, before/above cursor      |
| Find/Till delete      | `df{char}` `dt{char}`   | Delete find (inclusive), till (exclusive) |
| Undo/Redo            | `u` `Ctrl+r`            | Undo last change, redo last undo     |
| **Visual Selection**  |
| Character visual      | `v`                     | Character-level selection (blue)      |
| Line visual           | `V`                     | Line-level selection (orange)         |
| Visual motions        | `v$` `v0` `vG`          | Select to line end, start, file end   |
| **Modes**             |
| Normal mode           | `Escape`                | Default navigation mode               |
| Insert mode           | `i` `a` `o` etc.        | Text insertion                        |
| Visual mode           | `v` `V`                 | Text selection                        |
| Command mode          | `:`                     | Vim commands                          |
| **Save/Exit**         |
| Save                  | `:w`                    | Apply changes to input field          |
| Quit                  | `:q`                    | Close editor                          |
| Save and quit         | `:wq`                   | Save changes and close                |
| Quit without saving   | `:q!`                   | Close without applying changes        |

---

````

### 2. Update Navigation/Index

Add VimEdit to the main documentation index/table of contents:

```markdown
- [📝 VimEdit Mode](#vimedit-mode)
  - [Entering VimEdit Mode](#entering-vimedit-mode)
  - [The VimEdit Interface](#the-vimedit-interface)
  - [Vim Modes in VimEdit](#vim-modes-in-vimedit)
  - [Key Features](#key-features)
  - [Usage Examples](#usage-examples)
  - [Configuration](#configuration)
  - [Keyboard Reference](#keyboard-reference)
````

### 3. Update Quick Reference Section

Add VimEdit shortcuts to any existing quick reference:

```markdown
#### Text Editing

- `Ctrl+i` - Open VimEdit field selection
- `u` - Undo last change
- `Ctrl+r` - Redo last undone change
- `:w` - Save changes in VimEdit
- `:wq` - Save and exit VimEdit
- `:q!` - Exit without saving
```

### 4. Styling Notes

- **Maintain existing emoji patterns**: Use 📝 for VimEdit sections
- **Follow code formatting**: Use backticks for keyboard shortcuts
- **Use existing table structures**: Match the keyboard reference table style
- **Keep consistent headings**: Follow the established hierarchy pattern
- **Include practical examples**: Show real-world usage scenarios like the existing docs

This documentation follows VimNav's existing patterns while providing comprehensive coverage of the VimEdit feature's capabilities.

