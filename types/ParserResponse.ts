export type ParserSuccessResponse = {
  status: "success"
}

export type ParserErrorResponse = {
  status: "error"
  error?: Error
  errorMessage?: string
}

export type ParserSkippedResponse = {
  status: "skipped"
}

export type ParserResponse =
  | ParserSuccessResponse
  | ParserErrorResponse
  | ParserSkippedResponse
