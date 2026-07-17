import { app } from "../../scripts/app.js";

app.registerExtension({
    name: "PromptFileSelector.PreviewWidget",
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if (nodeData.name !== "PromptFileSelector") return;

        // Extrai o prompts_map diretamente das definições brutas enviadas pelo Python
        const promptSpec = nodeData.input?.required?.prompt_option;
        const promptsMap = (promptSpec && promptSpec[1]) ? (promptSpec[1].prompts_map || {}) : {};

        // Hook na criação do nó
        const origOnNodeCreated = nodeType.prototype.onNodeCreated;
        nodeType.prototype.onNodeCreated = function () {
            const me = origOnNodeCreated ? origOnNodeCreated.apply(this, arguments) : undefined;

            const dropdownWidget = this.widgets?.find(w => w.name === "prompt_option");
            if (!dropdownWidget) return me;

            // Evita criar duplicados se o nó for recarregado
            if (this.widgets?.find(w => w.name === "preview_widget")) return me;

            // 1. Cria o elemento HTML textarea
            const textarea = document.createElement("textarea");
            textarea.readOnly = true;
            textarea.style.width = "100%";
            textarea.style.height = "100%";
            textarea.style.backgroundColor = "#121212";
            textarea.style.color = "#00ffcc";
            textarea.style.border = "1px solid #333";
            textarea.style.borderRadius = "4px";
            textarea.style.padding = "8px";
            textarea.style.resize = "none";
            textarea.style.boxSizing = "border-box";
            textarea.style.fontFamily = "monospace";
            textarea.style.fontSize = "12px";
            textarea.style.lineHeight = "1.4";

            // 2. Registra o widget DOM no nó
            this.addDOMWidget("preview_widget", "preview", textarea, {
                getValue() { return textarea.value; },
                setValue(v) { textarea.value = v; }
            });

            // Ajusta o tamanho do nó para acomodar o preview confortavelmente
            this.setSize([Math.max(this.size[0], 380), Math.max(this.size[1], 240)]);

            // 3. Função de atualização do texto
            const updatePreview = (selectedVal) => {
                const val = selectedVal || dropdownWidget.value;
                const text = promptsMap[val] || "";
                textarea.value = text;
                this.setDirtyCanvas(true, true);
            };

            // 4. Escuta as alterações no dropdown
            const origCallback = dropdownWidget.callback;
            dropdownWidget.callback = function (val) {
                if (origCallback) origCallback.apply(this, arguments);
                updatePreview(val);
            };

            // Garante a atualização na inicialização
            setTimeout(() => updatePreview(), 100);

            return me;
        };

        // Garante que o preview carregue ao abrir um workflow salvo (.json)
        const origOnConfigure = nodeType.prototype.onConfigure;
        nodeType.prototype.onConfigure = function () {
            const r = origOnConfigure ? origOnConfigure.apply(this, arguments) : undefined;
            setTimeout(() => {
                const dropdownWidget = this.widgets?.find(w => w.name === "prompt_option");
                const previewWidget = this.widgets?.find(w => w.name === "preview_widget");
                if (dropdownWidget && previewWidget?.element) {
                    previewWidget.element.value = promptsMap[dropdownWidget.value] || "";
                }
            }, 100);
            return r;
        };
    }
});