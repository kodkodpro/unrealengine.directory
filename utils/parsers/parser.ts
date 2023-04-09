import { JSDOM } from "jsdom"
import { NodeHtmlMarkdown } from "node-html-markdown"
import { parseMoney } from "@/utils/helpers/string"

export class Parser {
  html?: string
  jsdom?: JSDOM
  parsedUrl?: URL

  async parse(url: URL) {
    this.parsedUrl = url

    // Get page source using fetch
    const response = await fetch(url)
    this.html = await response.text()
    this.jsdom = new JSDOM(this.html)
  }

  getText(selector: string) {
    return this.jsdom?.window.document.querySelector(selector)?.textContent || ""
  }

  getHtml(selector: string) {
    return this.jsdom?.window.document.querySelector(selector)?.innerHTML || ""
  }

  getMarkdown(selector: string) {
    const html = this.getHtml(selector)
      .replace(/>\s+</g, "><") // Remove whitespaces between tags
      .replace(/>\s+/g, ">") // Remove whitespaces after tag opening
      .replace(/\s+</g, "<")  // Remove whitespaces before tag closing

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
}
