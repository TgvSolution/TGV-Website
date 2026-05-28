#!/usr/bin/env bash
# =============================================================================
# init-dev-team.sh — Initialise l'équipe d'agents Claude Code dans un projet
# Usage : ./init-dev-team.sh [chemin/vers/projet]
# Sans argument : initialise dans le répertoire courant
# =============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_DIR="${1:-$(pwd)}"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔══════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Initialisation de l'équipe d'agents    ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════╝${NC}"
echo ""
echo -e "Projet cible : ${YELLOW}${TARGET_DIR}${NC}"
echo ""

if [ ! -d "$TARGET_DIR" ]; then
    echo "❌ Le répertoire '$TARGET_DIR' n'existe pas."
    exit 1
fi

# ── Agents ────────────────────────────────────────────────────────────────────
AGENTS_DIR="$TARGET_DIR/.claude/agents"
mkdir -p "$AGENTS_DIR"

echo "📋 Copie des agents..."
AGENTS=("architect" "infra-architect" "developer" "code-reviewer" "security-auditor" "test-writer" "doc-writer" "devops" "debugger")
for agent in "${AGENTS[@]}"; do
    src="$SCRIPT_DIR/.claude/agents/${agent}.md"
    dst="$AGENTS_DIR/${agent}.md"
    if [ -f "$src" ]; then
        if [ -f "$dst" ]; then
            echo -e "  ${YELLOW}⚠️  ${agent}.md existe déjà — ignoré${NC}"
        else
            cp "$src" "$dst"
            echo -e "  ${GREEN}✅ ${agent}.md${NC}"
        fi
    fi
done

# ── GitHub Actions workflows
echo ""
echo "🔄 GitHub Actions workflows..."
mkdir -p "$TARGET_DIR/.github/workflows"
GH_WORKFLOWS_SRC="$SCRIPT_DIR/.github/workflows"
for wf in ci.yml deploy-staging.yml deploy-prod.yml deploy-prod-aws.yml; do
    src="$GH_WORKFLOWS_SRC/$wf"
    dst="$TARGET_DIR/.github/workflows/$wf"
    if [ -f "$dst" ]; then
        echo -e "  ${YELLOW}⚠️  $wf existe déjà — ignoré${NC}"
    else
        cp "$src" "$dst"
        echo -e "  ${GREEN}✅ .github/workflows/$wf${NC}"
    fi
done

# ── Settings (hooks) ──────────────────────────────────────────────────────────
echo ""
echo "⚙️  Configuration des hooks..."
SETTINGS="$TARGET_DIR/.claude/settings.json"
if [ -f "$SETTINGS" ]; then
    echo -e "  ${YELLOW}⚠️  settings.json existe déjà — ignoré${NC}"
else
    cp "$SCRIPT_DIR/.claude/settings.json" "$SETTINGS"
    echo -e "  ${GREEN}✅ .claude/settings.json${NC}"
fi

# ── Documentation ─────────────────────────────────────────────────────────────
echo ""
echo "📁 Structure de documentation..."
mkdir -p "$TARGET_DIR/docs/adr"

declare -A DOC_FILES=(
    ["DEVLOG.md"]="$SCRIPT_DIR/DEVLOG.md"
    ["docs/future-work.md"]="$SCRIPT_DIR/docs/future-work.md"
    ["BUGS.md"]="$SCRIPT_DIR/BUGS.md"
    ["docs/adr/README.md"]="$SCRIPT_DIR/docs/adr/README.md"
)

for dst_rel in "${!DOC_FILES[@]}"; do
    src="${DOC_FILES[$dst_rel]}"
    dst="$TARGET_DIR/$dst_rel"
    if [ -f "$dst" ]; then
        echo -e "  ${YELLOW}⚠️  $dst_rel existe déjà — ignoré${NC}"
    else
        cp "$src" "$dst"
        echo -e "  ${GREEN}✅ $dst_rel${NC}"
    fi
done

# ── CLAUDE.md ─────────────────────────────────────────────────────────────────
echo ""
CLAUDE_MD="$TARGET_DIR/CLAUDE.md"
if [ -f "$CLAUDE_MD" ]; then
    echo -e "${YELLOW}⚠️  CLAUDE.md existe déjà — non remplacé${NC}"
else
    cp "$SCRIPT_DIR/CLAUDE.md" "$CLAUDE_MD"
    echo -e "${GREEN}✅ CLAUDE.md créé${NC}"
fi

# ── Résumé ────────────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}╔══════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   ✅ Équipe initialisée avec succès !    ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════╝${NC}"
echo ""
echo -e "Prochaines étapes :"
echo -e "  1. ${YELLOW}Ouvre CLAUDE.md${NC} et remplis le tableau en haut"
echo -e "     (nom du projet, architecture, port, branches)"
echo -e ""
echo -e "  2. Lance Claude Code dans le projet :"
echo -e "     ${BLUE}cd $TARGET_DIR && claude${NC}"
echo -e ""
echo -e "  Les agents maintiennent automatiquement :"
echo -e "    • DEVLOG.md         — journal des modifications"
echo -e "    • docs/future-work.md — améliorations identifiées"
echo -e "    • docs/adr/         — décisions d'architecture"
echo -e "    • BUGS.md           — registre des bugs non bloquants"
    echo -e "    • JSDoc             — documentation inline des fonctions"
