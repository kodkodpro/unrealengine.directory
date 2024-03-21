export type ParserSuccessResponse = {
  status: "success"
  data?: unknown
}

export type ParserErrorResponse = {
  status: "error"
  error?: Error
  message?: string
}

export type ParserSkippedResponse = {
  status: "skipped"
  message?: string
}

export type ParserResponse =
  | ParserSuccessResponse
  | ParserErrorResponse
  | ParserSkippedResponse
