import { JSDOM } from "jsdom"
import fetch from "node-fetch"
import { NodeHtmlMarkdown } from "node-html-markdown"
import { ParserResponse } from "@/lib/types/ParserResponse"
import { parseMoney } from "@/lib/utils/string"

export class Parser {
  html?: string
  jsdom?: JSDOM

  async getPage(url: URL | string) {
    const response = await fetch(url)
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

  static log(message: string, status: ParserResponse["status"] | undefined = undefined) {
    const date = new Date().toLocaleString()
    const method = status === "error" ? "error" : "info"
    const statusIcon = status ? status === "success" ? "✅" : status === "error" ? "❌" : "⚠️" : "🔷"

    // eslint-disable-next-line no-console
    console[method](`[Parser][${date}] ${statusIcon} ${message}`)
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
