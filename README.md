# pk_promptselector

A custom node for ComfyUI designed to load, organize, and preview text prompts from local .txt files with support for multiline prompts and real-time dynamic previews.
This is a quite simple prompt loader that I made (with help from Gemini and Claude).

## 🚀 Features</h2>
⚡ Real-time Preview: Instant visualization of the selected prompt inside the node itself without needing to queue execution (Queue Prompt).

📄 Multiline Support: Long prompts containing line breaks are preserved intact within the same block.

🏷️ Custom Titles: Organize your prompts using the syntax Title|Prompt text.

📁 Automatic Organization: Reads all .txt files saved in the configured directory and displays them in a clean numbered list (#1|Title).

📦 Installation
1. Navigate to your ComfyUI custom nodes directory:

<pre>cd ComfyUI/custom_nodes/</pre>

2. Clone this repository (or copy the node folder into the directory):

<pre>git clone https://github.com/your-username/promptselect.git</pre>

The final folder structure should look like this:

<pre>ComfyUI/
└── custom_nodes/
    └── promptselect/
        ├── __init__.py
        ├── README.md
        └── js/
            └── prompt_selector.js</pre>

3. Restart ComfyUI.

## 📁 Where to Place Your Prompt Files
The node automatically creates and reads .txt files located in the following path:

<pre>ComfyUI/user/default/prompts/</pre>

If the folder does not exist, it will be created automatically upon launching ComfyUI with the node installed.

## 📝 .txt File Format
Prompts must be separated strictly by the --- delimiter.

You can set a title for a prompt using the | character. If no title is provided, the first line of the block will be used as the preview title.

Example my_prompts.txt file:

<pre>Cyberpunk City|A detailed photo of a cyberpunk city,
neon signs reflecting on wet asphalt,
volumetric fog, sharp focus, 8k resolution.
---
Portrait Studio|Studio photography of a portrait,
dramatic lighting, 85mm lens.
---
This prompt has no explicit title, so this first line becomes the menu title.
The rest of the text remains part of the prompt.</pre>

## 💻 How to Use
1. On the ComfyUI canvas, right-click and navigate to utils/text -> Prompt File Selector (com preview).
2. From the prompt_option dropdown, select your desired prompt (#1|Title, #2|Title, etc.).
3. The full prompt text will instantly appear in the Preview text box inside the node body.
4. Connect the STRING output of the node to your CLIP Text Encode or Positive Prompt node.

⚙️ Inputs and Outputs
Inputs
• prompt_option (Dropdown): A list containing all available prompts found across the .txt files.

Outputs
• prompt (STRING): The full text string of the selected prompt.

## 📄 License
This project is licensed under the GNU General Public License (GPL-3.0). Feel free to modify and redistribute it under the terms of the GNU license.

****
Um nó customizado para o ComfyUI projetado para carregar, organizar e pré-visualizar prompts de texto a partir de arquivos .txt locais, com suporte a múltiplas linhas e preview dinâmico em tempo real.

## 🚀 Funcionalidades
⚡ Preview em Tempo Real: Visualização instantânea do prompt selecionado dentro da própria caixa do nó, sem a necessidade de rodar a fila (Queue Prompt).

🏷️ Títulos Personalizados: Organize seus prompts usando a sintaxe Título | Texto do prompt.

📁 Organização Automática: Lê todos os arquivos .txt salvos no diretório configurado e os exibe em uma lista numerada limpa (#1 | Título).

## 📦 Instalação
1. Navegue até a pasta de nós customizados do seu ComfyUI:

<pre>cd ComfyUI/custom_nodes/</pre>

2. Clone este repositório (ou copie a pasta do nó para o diretório):

<pre>git clone https://github.com/seu-usuario/promptselect.git</pre>

A estrutura final das pastas deve ficar assim:

<pre>ComfyUI/
└── custom_nodes/
    └── promptselect/
        ├── __init__.py
        ├── README.md
        └── js/
            └── prompt_selector.js</pre>

3. Reinicie o ComfyUI.

## 📁 Onde colocar seus arquivos de prompt
O nó cria e lê automaticamente arquivos .txt localizados na pasta:

<pre>ComfyUI/user/default/prompts/</pre>

Caso a pasta não exista, ela será criada automaticamente ao iniciar o ComfyUI com o nó instalado.

## 📝 Formato do Arquivo .txt
Os prompts devem ser separados estritamente pelo delimitador ---.

Você pode definir um título para o prompt usando o caractere |. Se nenhum título for definido, a primeira linha do bloco será usada como título de pré-visualização.

Exemplo de arquivo meus_prompts.txt:

<pre>Cyberpunk City | A detailed photo of a cyberpunk city,
neon signs reflecting on wet asphalt,
volumetric fog, sharp focus, 8k resolution.
---
Portrait Studio | Studio photography of a portrait,
dramatic lighting, 85mm lens.
---
Este prompt não tem título explicito, então esta primeira linha vira o título no menu.
O restante do texto continua fazendo parte do prompt.</pre>

## 💻 Como Usar
1. No canvas do ComfyUI, clique com o botão direito e navegue até utils/text -> Prompt File Selector (com preview).
2. No dropdown prompt_option, escolha o prompt desejado (#1 | Título, #2 | Título, etc.).
3. O texto completo do prompt aparecerá instantaneamente na caixa de texto Preview no corpo do próprio nó.
4. Conecte a saída STRING do nó ao seu nó de CLIP Text Encode ou Positive Prompt.

## ⚙️ Entradas e Saídas
Entradas (Inputs)
• prompt_option (Dropdown): Lista contendo todos os prompts encontrados nos arquivos .txt.

Saídas (Outputs)
• prompt (STRING): A string contendo o texto completo do prompt selecionado.

## 📄 Licença
Este projeto está licenciado sob o modelo GNU General Public License (GPL-3.0). Fique à vontade para modificá-lo e redistribui-lo sob os termos da licença GNU.
