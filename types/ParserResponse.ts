export type ParserSuccessResponse = {
  status: "success"
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
