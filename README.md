# AI DocGen – Intelligent Documentation Generator

🚀 **Automatically generate comprehensive, AI-powered technical documentation for Python, JavaScript, and TypeScript codebases.**

[![VS Code Marketplace](https://img.shields.io/badge/VS%20Code-Marketplace-blue?logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=akash0x.ai-docgen)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?logo=github)](https://github.com/iesxz-c/documentation-generator-cli-vscode-extension)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

AI DocGen is an end-to-end documentation generation pipeline that transforms raw code into structured, human-readable technical documentation. Available as both a **Python CLI** and a **VS Code Extension**.

---

## 📦 Installation

### VS Code Extension (Recommended)

Install directly from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=akash0x.ai-docgen):

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search "AI DocGen"
4. Click Install

Or install via command line:
```bash
code --install-extension akash0x.ai-docgen
```

### Python CLI

```bash
git clone https://github.com/iesxz-c/documentation-generator-cli-vscode-extension.git
cd ai-docgen
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

---

## 🎯 Features

### 🔍 **Multi-Language Parsing**
- Python (.py), JavaScript (.js, .jsx), TypeScript (.ts, .tsx)
- Tree-sitter AST parsing with intelligent fallbacks
- Extracts functions, classes, imports, docstrings, and call graphs

### 📊 **Architecture Visualization**
- Mermaid flowcharts showing file dependencies
- Per-file workflow diagrams
- Knowledge graphs with nodes and edges
- Folder structure trees

### 📝 **Rich Documentation**
- **What This File Does** – AI-powered summaries
- **Line-by-Line Explanation** – Detailed code breakdown
- **Dry Run / Execution Trace** – Simulated execution paths
- **Function/Class Docs** – Complete API documentation

### 🧠 **AI-Powered Analysis**
- Google Gemini 2.0 Flash integration
- Automatic fallback to heuristic analysis
- Graceful handling of API limits

### 🔄 **Git Integration**
- Commit history analysis
- File hotspot detection
- Change impact tracking

---

## 🚀 Quick Start

### Using the VS Code Extension

1. **Set Python Path** (first time only):
   - Command Palette → "AI DocGen: Set Python Path"
   - Select your Python executable with dependencies installed

2. **Generate Docs**:
   - Click the "AI DocGen" button in the status bar, or
   - Command Palette → "AI DocGen: Generate Docs for Workspace"

3. **View Results**:
   - Generated docs open automatically at `build/docs.md`
   - Check the "AI DocGen" output channel for logs

### Using the Python CLI

```bash
# Generate docs for sample repo
python -m cli.cli sample_repo --output build/docs.md

# Generate docs for current directory
python -m cli.cli . --output docs/API.md

# Generate docs for any project
python -m cli.cli /path/to/project --output /path/to/output/docs.md
```

---

## ⚙️ Configuration

### Optional: Gemini API Key

For AI-powered summaries, create a `.env` file:

```env
GOOGLE_API_KEY=your_api_key_here
```

Get your key from [Google AI Studio](https://aistudio.google.com/app/apikey)

**Note:** Without an API key, the tool uses heuristic analysis (still works great!)

### VS Code Extension Settings

- `aiDocGen.pythonPath`: Absolute path to Python executable
- `aiDocGen.outputPath`: Output markdown path (default: `build/docs.md`)
- `aiDocGen.repoPath`: Repository path to document (default: workspace root)

---

## 📖 Usage

### Command Line Interface

```bash
usage: python -m cli.cli [-h] [--output OUTPUT] [repo]

positional arguments:
  repo              Path to repo to document (default: sample_repo)

optional arguments:
  --output OUTPUT   Output markdown path (default: build/docs.md)
  -h, --help        Show this help message
```

### VS Code Commands

- **AI DocGen: Generate Docs for Workspace** – Document the current workspace
- **AI DocGen: Generate Docs for Folder** – Choose a specific folder to document
- **AI DocGen: Set Python Path** – Configure the Python executable path

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Input Repository                         │
│              (Python, JavaScript, TypeScript)                │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
    ┌────────┐  ┌────────┐  ┌────────┐
    │Python  │  │  JS    │  │   TS   │
    │Parser  │  │Parser  │  │Parser  │
    └────┬───┘  └───┬────┘  └───┬────┘
         │          │           │
         └──────────┼───────────┘
                    │
         ┌──────────▼──────────┐
         │  Parsed AST Data    │
         └──────────┬──────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
        ▼           ▼           ▼
    ┌────────┐ ┌────────┐ ┌────────┐
    │  Git   │ │Knowledge│ │ LLM    │
    │Analyzer│ │ Graph  │ │Summary │
    └────┬───┘ └───┬────┘ └───┬────┘
         │         │          │
         └─────────┼──────────┘
                   │
        ┌──────────▼──────────┐
        │  Markdown Builder   │
        └──────────┬──────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │  Output: docs.md     │
        └──────────────────────┘
```

---

## 📄 Output Structure

Generated documentation includes:

1. **Project Overview** – File count, functions, classes, imports
2. **Architecture Overview** – Mermaid flowchart of dependencies
3. **Statistics** – Code metrics
4. **Folder Structure** – Directory tree
5. **Per-File Workflows** – Individual file flowcharts
6. **Modules** – Detailed per-file documentation with:
   - Purpose summary
   - Line-by-line explanation
   - Execution trace
   - Function/class documentation
7. **Git Insights** – Commit history and hotspots
8. **How to Run** – Commands and dependencies

---

## 🛠️ Development

### VS Code Extension Development

The extension source is in `vscode-extension/`:

```bash
cd vscode-extension
npm install
npm run compile

# Launch Extension Development Host
# Press F5 in VS Code
```

### Python CLI Development

```bash
# Install in editable mode
pip install -e .

# Run tests
python test_parser.py
```

---

## 📦 Requirements

See [requirements.txt](requirements.txt):
- GitPython>=3.1.0
- google-genai>=1.0.0
- tree-sitter>=0.25.0
- tree-sitter-languages>=1.10.0

---

## 📝 License

MIT License - see [LICENSE](LICENSE)

---

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

---

## 🔗 Links

- **VS Code Extension**: https://marketplace.visualstudio.com/items?itemName=akash0x.ai-docgen
- **GitHub Repository**: https://github.com/iesxz-c/documentation-generator-cli-vscode-extension
- **Report Issues**: https://github.com/iesxz-c/documentation-generator-cli-vscode-extension/issues

---

## 👨‍💻 Author

**Akash** ([@iesxz-c](https://github.com/iesxz-c))

---

Made with ❤️ by Akash

## 📋 Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [Architecture](#architecture)
- [Configuration](#configuration)
- [Output Structure](#output-structure)
- [Examples](#examples)
- [Requirements](#requirements)

## 🛠️ Installation

### Prerequisites

- Python 3.8+
- Node.js 14+ (for tree-sitter support)
- Git (optional, for git history analysis)

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/iesxz-c/ai-doc-generator-cli.git
   cd ai-docgen
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up Gemini API (optional):**
   Create a `.env` file in the project root:
   ```env
   GOOGLE_API_KEY=your_api_key_here
   ```
   Get your key from [Google AI Studio](https://aistudio.google.com/app/apikey)

## 🚀 Quick Start

### Basic Usage

Generate documentation for a repository:

```bash
python -m cli.cli <repo_path> --output <output_file>
```

### Examples

**Generate docs for sample repo:**
```bash
python -m cli.cli sample_repo --output build/docs.md
```

**Generate docs for current directory:**
```bash
python -m cli.cli . --output docs/API.md
```

**Generate docs for large project:**
```bash
python -m cli.cli /path/to/project --output /path/to/output/docs.md
```

## 📖 Usage

### Command Line Interface

```bash
usage: python -m cli.cli [-h] [--output OUTPUT] [repo]

positional arguments:
  repo              Path to repo to document (default: sample_repo)

optional arguments:
  --output OUTPUT   Output markdown path (default: build/docs.md)
  -h, --help        Show this help message
```

### Programmatic Usage

```python
from cli.cli import run_pipeline

# Generate documentation
output_path = run_pipeline(
    repo_path="path/to/your/repo",
    output_path="docs.md"
)
print(f"Documentation generated at {output_path}")
```

### As a Python Module

```python
from parser import PythonParser, JavaScriptParser
from git_analyzer.git_history import describe_repo
from graph.knowledge_graph import build_graph, to_mermaid
from summarizer.llm_summarizer import LLMSummarizer
from docs_generator.markdown_builder import MarkdownBuilder

# Parse code
py_parser = PythonParser()
js_parser = JavaScriptParser()
parsed_files = py_parser.walk_directory("repo") + js_parser.walk_directory("repo")

# Analyze git
git_info = describe_repo("repo")

# Build graph
graph = build_graph(parsed_files, git_info)
mermaid = to_mermaid(graph)

# Generate summaries
summarizer = LLMSummarizer()
summaries = summarizer.generate_all(parsed_files, mermaid, git_info, None, {})

# Build markdown
builder = MarkdownBuilder()
docs = builder.build(parsed_files, summaries, mermaid, git_info, None, {}, "", "", [], [])
```

## 🏗️ Architecture

### Component Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Input Repository                         │
│              (Python, JavaScript, TypeScript)                │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
    ┌────────┐  ┌────────┐  ┌────────┐
    │Python  │  │  JS    │  │   TS   │
    │Parser  │  │Parser  │  │Parser  │
    └────┬───┘  └───┬────┘  └───┬────┘
         │          │           │
         └──────────┼───────────┘
                    │
         ┌──────────▼──────────┐
         │  Parsed AST Data    │
         │  (Functions, Classes│
         │   Imports, Calls)   │
         └──────────┬──────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
        ▼           ▼           ▼
    ┌────────┐ ┌────────┐ ┌────────┐
    │  Git   │ │Knowledge│ │ LLM    │
    │Analyzer│ │ Graph  │ │Summary │
    └────┬───┘ └───┬────┘ └───┬────┘
         │         │          │
         └─────────┼──────────┘
                   │
        ┌──────────▼──────────┐
        │  Markdown Builder   │
        │  (Format & Render)  │
        └──────────┬──────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │  Output: docs.md     │
        │  (Full Documentation)│
        └──────────────────────┘
```

### Module Breakdown

**`parser/`** – Multi-language code parsing
- `base_parser.py` – Abstract parser interface
- `python_parser.py` – Python AST extraction
- `js_parser.py` – JavaScript/TypeScript parsing

**`git_analyzer/`** – Git history analysis
- `git_history.py` – Commit mining, hotspot detection

**`graph/`** – Knowledge graph construction
- `knowledge_graph.py` – Build nodes/edges, Mermaid rendering

**`summarizer/`** – LLM-powered analysis
- `llm_summarizer.py` – Gemini integration, heuristic fallbacks

**`docs_generator/`** – Markdown generation
- `markdown_builder.py` – Format and render documentation

**`cli/`** – Command-line orchestration
- `cli.py` – Pipeline orchestrator

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Google Gemini API Key (optional)
GOOGLE_API_KEY=your_key_here

# Optional: Model selection
# GEMINI_MODEL=gemini-2.0-flash-exp
```

### Default Settings

| Setting | Default | Purpose |
|---------|---------|---------|
| Output Path | `build/docs.md` | Where to save generated docs |
| Repo Path | `sample_repo` | Code repository to document |
| Model | `gemini-2.0-flash-exp` | LLM model for summaries |
| Max Tree Depth | 4 | Folder structure depth limit |

## 📄 Output Structure

Generated documentation includes:

### 1. **Project Overview**
   - File count, functions, classes, imports
   - High-level project summary

### 2. **Architecture Overview**
   - Mermaid flowchart of file dependencies
   - Class and function definitions

### 3. **Statistics**
   - Code metrics (files, functions, classes)

### 4. **Folder Structure**
   - Directory tree (respects max depth)

### 5. **Per-File Workflows**
   - Mermaid flowchart per file
   - Shows functions and classes defined

### 6. **Modules**
   - Per-file documentation:
     - **What This File Does** – Purpose summary
     - **Line-by-Line Explanation** – Code breakdown
     - **Dry Run / Execution Trace** – Example execution
     - **Imports** – External dependencies
     - **Functions** – Signatures and docstrings
     - **Classes** – Class definitions

### 7. **Summaries**
   - Architecture summary
   - File roles
   - Function documentation
   - Recent changes (from git)
   - .gitignore analysis

### 8. **Git Insights**
   - Recent commits
   - File hotspots
   - Change history

### 9. **How to Run**
   - Run command per file
   - Dependency listing

## 📚 Examples

### Example 1: Python Project

**Input:** `sample_repo/sample.py`
```python
class Solution(object):
    def twoSum(self, nums, target):
        """Find two numbers that sum to target."""
        d = {}
        for i, j in enumerate(nums):
            k = target - j
            if k in d:
                return [d[k], i]
            d[j] = i
```

**Generated Output:**
```markdown
#### What This File Does
This file implements a LeetCode-style solution for the two-sum problem. 
It contains a Solution class with a method that finds two numbers in a 
list that add up to a target value using a hash map for O(n) time complexity.

#### Line-by-Line Explanation
Line 1: Define class Solution
Line 2: Define function twoSum
Line 8: Variable assignment - d={}
Line 9: Loop iteration - for i,j in enumerate(nums):
Line 10: Variable assignment - k=target-j
Line 11: Conditional check - if k in d:
Line 12: Return statement - return [d[k],i]

#### Dry Run / Execution Trace
Example Execution (Two-Sum Problem):
Input: nums = [2, 7, 11, 15], target = 9
1. Initialize empty dict: d = {}
2. Iterate through nums:
   - i=0, j=2: k = 9-2 = 7, 7 not in d, d[2] = 0
   - i=1, j=7: k = 9-7 = 2, 2 IS in d, return [d[2], 1] = [0, 1]
Output: [0, 1]
```

### Example 2: JavaScript Server

**Input:** `sample_repo/index.js`
```javascript
const http = require('node:http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

**Generated Output:**
```markdown
#### What This File Does
This file sets up a web server. It creates an HTTP server that listens 
on a specified port and handles incoming requests, returning responses to clients.

#### How to Run
**Command:** `node index.js`
**Dependencies:**
- (no external dependencies)
```

## 📦 Requirements

See `requirements.txt`:

```
GitPython>=3.1.0
google-genai>=0.3.0
python-dotenv>=0.19.0
tree-sitter>=0.20.0
```

### Optional Dependencies

- **tree-sitter-python** – Enhanced Python parsing
- **tree-sitter-javascript** – Enhanced JavaScript parsing
- **tree-sitter-typescript** – TypeScript parsing

## 🔄 Workflow

1. **Parse Code** – Extract AST, functions, classes, imports
2. **Analyze Git** – Mine commits, identify hotspots
3. **Build Graph** – Create knowledge graph with dependencies
4. **Generate Summaries** – Use Gemini or heuristics
5. **Render Markdown** – Format and output documentation

## ⚡ Performance

- **Small repos** (<50 files): ~5-10 seconds
- **Medium repos** (50-200 files): ~20-30 seconds
- **Large repos** (200+ files): ~1-2 minutes

*Times include Gemini API calls; faster with fallback heuristics.*

## 🤝 Contributing

Contributions welcome! Areas for improvement:

- [ ] Additional language support (Go, Rust, Java, etc.)
- [ ] VS Code extension
- [ ] Enhanced call graph analysis
- [ ] Custom template support
- [ ] HTML/PDF output formats
- [ ] CI/CD integration examples

## 📜 License

MIT License – See LICENSE file

## 🙋 Support

Found a bug or have a feature request? Open an issue on [GitHub](https://github.com/iesxz-c/ai-doc-generator-cli/issues).

---

**Happy documenting!** 🚀
