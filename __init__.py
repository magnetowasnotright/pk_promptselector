import os
import folder_paths

# Informa ao ComfyUI para carregar arquivos da pasta "js"
WEB_DIRECTORY = "./js"

PROMPTS_DIR = os.path.join(folder_paths.base_path, "user", "default", "prompts")
DELIMITER = "---"
PREVIEW_LEN = 60

os.makedirs(PROMPTS_DIR, exist_ok=True)


def _load_prompts_from_file(path):
    if not os.path.isfile(path):
        return []

    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    raw_blocks = [b.strip() for b in content.split(DELIMITER)]
    parsed_prompts = []

    for block in raw_blocks:
        if not block:
            continue

        if "|" in block:
            title, text = block.split("|", 1)
            parsed_prompts.append((title.strip(), text.strip()))
        else:
            lines = [l.strip() for l in block.splitlines() if l.strip()]
            first_line = lines[0] if lines else block
            title = first_line[:PREVIEW_LEN]
            parsed_prompts.append((title, block.strip()))

    return parsed_prompts


def _load_all_prompts():
    if not os.path.isdir(PROMPTS_DIR):
        return []

    files = sorted(f for f in os.listdir(PROMPTS_DIR) if f.endswith(".txt"))
    all_prompts = []

    for fname in files:
        path = os.path.join(PROMPTS_DIR, fname)
        all_prompts.extend(_load_prompts_from_file(path))

    return all_prompts


class PromptFileSelector:
    @classmethod
    def INPUT_TYPES(cls):
        prompts = _load_all_prompts()
        options = []
        prompts_map = {}

        for i, (title, text) in enumerate(prompts):
            opt_key = f"#{i + 1} | {title}"
            options.append(opt_key)
            # Mapeia a opção do dropdown com o texto completo
            prompts_map[opt_key] = text

        if not options:
            options = ["(no prompt found)"]

        return {
            "required": {
                # O 'prompts_map' é enviado diretamente ao JS no navegador
                "prompt_option": (options, {"prompts_map": prompts_map}),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("prompt",)
    FUNCTION = "select"
    CATEGORY = "utils/text"

    @classmethod
    def IS_CHANGED(cls, prompt_option):
        return prompt_option

    def select(self, prompt_option):
        if not prompt_option or "|" not in prompt_option:
            return ("",)

        parts = prompt_option.split("|", 1)
        idx_str = parts[0].strip().lstrip("#")

        try:
            idx = int(idx_str) - 1
        except ValueError:
            return ("",)

        all_prompts = _load_all_prompts()
        if 0 <= idx < len(all_prompts):
            _title, text = all_prompts[idx]
            return (text,)

        return ("",)


NODE_CLASS_MAPPINGS = {
    "PromptFileSelector": PromptFileSelector,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "PromptFileSelector": "Prompt File Selector",
}