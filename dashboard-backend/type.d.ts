export interface Response {
    send: (obj: any) => {}
}

export interface Request {
    body: any
    params: any
    query: any
}