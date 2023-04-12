import { HttpsProxyAgent } from "https-proxy-agent"
import { JSDOM } from "jsdom"
import fetch from "node-fetch"
import { NodeHtmlMarkdown } from "node-html-markdown"
import { ParserResponse } from "@/types/ParserResponse"
import { getBaseURL, parseMoney } from "@/utils/helpers/string"

export class Parser {
  html?: string
  jsdom?: JSDOM
  parsedUrl?: URL

  async parse(url: URL) {
    this.parsedUrl = url

    let agent: HttpsProxyAgent | undefined

    if (process.env.PROXY_HOST && process.env.PROXY_PORT && process.env.PROXY_AUTH) {
      agent = new HttpsProxyAgent({
        host: process.env.PROXY_HOST,
        port: parseInt(process.env.PROXY_PORT),
        auth: process.env.PROXY_AUTH,
      })
    }

    const response = await fetch(url, { agent })

    if (!response.ok) throw new Error(`Failed to fetch ${url}. Error: ${await response.text()}`)

    this.html = await response.text()
    this.jsdom = new JSDOM(this.html)
  }

  getText(selector: string) {
    return this.jsdom?.window.document.querySelector(selector)?.textContent?.trim() || ""
  }

  getHtml(selector: string) {
    return this.jsdom?.window.document.querySelector(selector)?.innerHTML || ""
  }

  getMarkdown(selector: string) {
    const html = this.getHtml(selector)
    return NodeHtmlMarkdown.translate(html)
  }

  getMoney(selector: string) {
    return parseMoney(this.getText(selector))
  }

  getElements(selector: string) {
    return Array.from(this.jsdom?.window.document.querySelectorAll(selector) || [])
  }

  elementExists(selector: string) {
    return this.getElements(selector).length > 0
  }

  static async triggerViaAPI(url: string, data: object): Promise<ParserResponse> {
    const response = await fetch(`${getBaseURL()}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": process.env.API_KEY!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      return await response.json() as ParserResponse
    } else {
      return { status: "error", message: `Failed to trigger ${url}. Error: ${await response.text()}` }
    }
  }

  static log(message: string, status: ParserResponse["status"] | undefined = undefined) {
    const date = new Date().toLocaleString()
    const statusIcon = status
      ? status === "success" ? "✅" : status === "error" ? "❌" : "⚠️"
      : "🔷"

    console.log(`[Parser][${date}] ${statusIcon} ${message}`)
  }

  static logResponse(response: ParserResponse, successMessage: string) {
    if (response.status === "success") {
      Parser.log(successMessage, response.status)
    } else if (response.status === "error") {
      Parser.log(response.message || response.error?.message || "Unknown Error", response.status)
    } else {
      Parser.log(response.message || "Skipped...", response.status)
    }
  }
}
