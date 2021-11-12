export type Content = {
  "content_id": string,
  "creator_id": string,
  "creator_name": string,
  "book_title": string,
  "book_author": string,
  "review": number,
  "description": string,
  "upload_date": Date
}

export type ContentResponse = {
  "found": number,
  content: Content[]
}