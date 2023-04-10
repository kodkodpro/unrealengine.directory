import { HttpsProxyAgent } from "https-proxy-agent"
import { JSDOM } from "jsdom"
import fetch from "node-fetch"
import { NodeHtmlMarkdown } from "node-html-markdown"
import { parseMoney } from "@/utils/helpers/string"

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

    if (!response.ok) throw new Error(`Failed to fetch ${url}. Status: ${response.statusText}`)

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
