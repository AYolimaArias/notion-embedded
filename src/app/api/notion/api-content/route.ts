import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { Client } from "@notionhq/client";

export async function GET(request: NextRequest) {
  try {
    // Verificar token desde query parameter
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Access token required" },
        { status: 401 }
      );
    }

    // Verificar token
    try {
      const user = verifyToken(token);
      console.log(
        `📝 Notion API content accessed by user: ${
          user.username
        } at ${new Date().toISOString()}`
      );
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 403 }
      );
    }

    // Configurar cliente de Notion
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });

    const pageId = process.env.NOTION_PAGE_ID;

    if (!pageId) {
      return NextResponse.json(
        { error: "Notion page ID not configured" },
        { status: 500 }
      );
    }

    console.log("🔄 Fetching content from Notion API...");

    // Obtener el contenido de la página
    const page = await notion.pages.retrieve({ page_id: pageId });

    // Obtener los bloques de la página
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
    });

    // Extraer el título de la página
    const pageTitle = extractPageTitle(page);
    console.log("📄 Página de Notion:", JSON.stringify(page, null, 2));
    console.log("🏷️ Título extraído:", pageTitle);

    // Procesar el contenido
    const processedContent = {
      page,
      blocks: blocks.results,
      title: pageTitle,
      renderedContent: await renderNotionBlocks(blocks.results, notion),
    };

    return NextResponse.json({
      success: true,
      content: processedContent,
    });
  } catch (error) {
    console.error("Notion API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Notion content" },
      { status: 500 }
    );
  }
}

// Función para renderizar los bloques de Notion
async function renderNotionBlocks(
  blocks: any[],
  notion: Client
): Promise<string> {
  let html = "";
  let currentListType = "";
  let listHtml = "";

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];

    // Manejar listas agrupadas
    if (block.type === "bulleted_list_item") {
      if (currentListType !== "ul") {
        // Cerrar lista anterior si existe
        if (listHtml) {
          html += `</${currentListType}>`;
        }
        // Iniciar nueva lista
        currentListType = "ul";
        listHtml = "";
      }
      listHtml += await renderBlock(block, notion);
    } else if (block.type === "numbered_list_item") {
      if (currentListType !== "ol") {
        // Cerrar lista anterior si existe
        if (listHtml) {
          html += `</${currentListType}>`;
        }
        // Iniciar nueva lista
        currentListType = "ol";
        listHtml = "";
      }
      listHtml += await renderBlock(block, notion);
    } else {
      // Cerrar lista actual si existe
      if (listHtml) {
        html += `<${currentListType}>${listHtml}</${currentListType}>`;
        listHtml = "";
        currentListType = "";
      }
      // Renderizar bloque normal
      html += await renderBlock(block, notion);
    }
  }

  // Cerrar lista final si existe
  if (listHtml) {
    html += `<${currentListType}>${listHtml}</${currentListType}>`;
  }

  return html;
}

// Función para extraer el título de la página de Notion
function extractPageTitle(page: any): string {
  console.log("🔍 Extrayendo título de la página:", page);

  if (!page || !page.properties) {
    console.log("❌ No hay propiedades en la página");
    return "Página sin título";
  }

  console.log("📋 Propiedades disponibles:", Object.keys(page.properties));

  // Buscar la propiedad de título (puede tener diferentes nombres)
  const titleProperty =
    page.properties.title ||
    page.properties.Name ||
    page.properties.Page ||
    page.properties["Título"] ||
    Object.values(page.properties).find(
      (prop: any) => prop && prop.type === "title"
    );

  console.log("🎯 Propiedad de título encontrada:", titleProperty);

  if (titleProperty && titleProperty.title && titleProperty.title.length > 0) {
    const title = titleProperty.title
      .map((text: any) => text.plain_text)
      .join("");
    console.log("✅ Título extraído:", title);
    return title;
  }

  // Si no encontramos título en propiedades, intentar buscar en los bloques
  console.log(
    "⚠️ No se encontró título en propiedades, buscando en bloques..."
  );
  return "Página sin título";
}

// Función para renderizar un bloque individual
async function renderBlock(block: any, notion: Client): Promise<string> {
  switch (block.type) {
    case "paragraph":
      return `<p>${renderRichText(block.paragraph.rich_text)}</p>`;

    case "heading_1":
      return `<h1>${renderRichText(block.heading_1.rich_text)}</h1>`;

    case "heading_2":
      return `<h2>${renderRichText(block.heading_2.rich_text)}</h2>`;

    case "heading_3":
      return `<h3>${renderRichText(block.heading_3.rich_text)}</h3>`;

    case "bulleted_list_item":
      return `<li>${renderRichText(block.bulleted_list_item.rich_text)}</li>`;

    case "numbered_list_item":
      return `<li>${renderRichText(block.numbered_list_item.rich_text)}</li>`;

    case "to_do":
      const checked = block.to_do.checked ? "checked" : "";
      return `<div class="todo-item"><input type="checkbox" ${checked} disabled> ${renderRichText(
        block.to_do.rich_text
      )}</div>`;

    case "toggle":
      return `<details><summary>${renderRichText(
        block.toggle.rich_text
      )}</summary><div class="toggle-content">Toggle content here</div></details>`;

    case "code":
      return `<pre><code class="language-${
        block.code.language
      }">${renderRichText(block.code.rich_text)}</code></pre>`;

    case "quote":
      return `<blockquote>${renderRichText(
        block.quote.rich_text
      )}</blockquote>`;

    case "callout":
      return `<div class="callout" data-icon="${
        block.callout.icon?.emoji || "💡"
      }">${renderRichText(block.callout.rich_text)}</div>`;

    case "divider":
      return "<hr>";

    case "image":
      if (block.image.type === "external") {
        return `<img src="${block.image.external.url}" alt="Notion image">`;
      } else if (block.image.type === "file") {
        return `<img src="${block.image.file.url}" alt="Notion image">`;
      }
      return "";

    case "video":
      if (block.video.type === "external") {
        return `<video controls><source src="${block.video.external.url}" type="video/mp4"></video>`;
      }
      return "";

    case "embed":
      return `<div class="embed-container"><iframe src="${block.embed.url}"></iframe></div>`;

    case "bookmark":
      return `<div class="bookmark"><a href="${block.bookmark.url}" target="_blank" rel="noopener noreferrer">${block.bookmark.url}</a></div>`;

    case "link_preview":
      return `<div class="link-preview"><a href="${block.link_preview.url}" target="_blank" rel="noopener noreferrer">${block.link_preview.url}</a></div>`;

    case "table":
      // Para tablas, necesitarías obtener las filas adicionales
      return `<div class="notion-table">Table content would be here</div>`;

    default:
      console.log(`Unsupported block type: ${block.type}`);
      return `<div class="unsupported-block">[Unsupported block type: ${block.type}]</div>`;
  }
}

// Función para renderizar texto enriquecido con formato
function renderRichText(richTextArray: any[]): string {
  if (!richTextArray || richTextArray.length === 0) {
    return "";
  }

  return richTextArray
    .map((text: any) => {
      let content = text.plain_text;

      // Aplicar formato
      if (text.annotations) {
        if (text.annotations.bold) {
          content = `<strong>${content}</strong>`;
        }
        if (text.annotations.italic) {
          content = `<em>${content}</em>`;
        }
        if (text.annotations.strikethrough) {
          content = `<del>${content}</del>`;
        }
        if (text.annotations.underline) {
          content = `<u>${content}</u>`;
        }
        if (text.annotations.code) {
          content = `<code>${content}</code>`;
        }
      }

      // Aplicar enlaces
      if (text.href) {
        content = `<a href="${text.href}" target="_blank" rel="noopener noreferrer">${content}</a>`;
      }

      return content;
    })
    .join("");
}
